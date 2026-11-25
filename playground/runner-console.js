// Runs inside the runner iframe, before the practice file loads.
// Mirrors console.* (and uncaught errors) to the playground page via postMessage,
// formatting values roughly the way Node / DevTools would.
(function () {
  "use strict";

  var params = new URLSearchParams(location.search);
  var runId = Number(params.get("run")) || 0;
  var MAX_MESSAGES = 2000;
  var sent = 0;
  var truncated = false;
  var groupDepth = 0;
  var timers = {};
  var counters = {};
  var startedAt = 0;
  var execMs = null;
  var native = {};

  function post(msg) {
    msg.channel = "playground";
    msg.runId = runId;
    try {
      parent.postMessage(msg, "*");
    } catch (e) {
      /* parent gone */
    }
  }

  function emit(level, text, where) {
    if (sent >= MAX_MESSAGES) {
      if (!truncated) {
        truncated = true;
        post({ type: "truncated", limit: MAX_MESSAGES });
      }
      return;
    }
    sent++;
    if (groupDepth) {
      var pad = new Array(groupDepth + 1).join("  ");
      text = pad + String(text).replace(/\n/g, "\n" + pad);
    }
    post({ type: "console", level: level, text: text, where: where || "" });
  }

  // ---------- value formatting ----------

  function quote(s) {
    return '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n") + '"';
  }

  function keyName(k) {
    return /^[A-Za-z_$][\w$]*$/.test(k) ? k : quote(k);
  }

  function ctorName(v) {
    try {
      var proto = Object.getPrototypeOf(v);
      if (proto === null) return null;
      return proto.constructor && proto.constructor.name;
    } catch (e) {
      return "";
    }
  }

  function describeNode(n) {
    if (n.nodeType === 3) return "#text " + quote(n.textContent.slice(0, 40));
    if (n.nodeType !== 1) return "[" + n.nodeName + "]";
    var s = "<" + n.tagName.toLowerCase();
    if (n.id) s += ' id="' + n.id + '"';
    if (n.className && typeof n.className === "string") s += ' class="' + n.className + '"';
    return s + ">";
  }

  function relativize(text) {
    var base = document.baseURI;
    return String(text).split(base).join("");
  }

  function fmtError(e) {
    var head = (e.name || "Error") + ": " + e.message;
    var stack = e.stack ? relativize(e.stack) : "";
    if (!stack) return head;
    // Chrome includes the message in the stack, Firefox doesn't.
    return stack.indexOf(e.message) !== -1 ? stack : head + "\n" + stack;
  }

  function fmt(v, depth, seen, top) {
    var t = typeof v;
    if (v === null) return "null";
    if (t === "undefined") return "undefined";
    if (t === "string") return top ? v : quote(v);
    if (t === "number") return Object.is(v, -0) ? "-0" : String(v);
    if (t === "bigint") return v + "n";
    if (t === "boolean") return String(v);
    if (t === "symbol") return v.toString();
    if (t === "function") {
      var src = "";
      try {
        src = Function.prototype.toString.call(v);
      } catch (e) {}
      var label = v.name || "(anonymous)";
      return /^class\b/.test(src) ? "[class " + label + "]" : "[Function: " + label + "]";
    }
    if (v instanceof Error) return top ? fmtError(v) : "[" + (v.name || "Error") + ": " + v.message + "]";
    if (v instanceof Date) return isNaN(v) ? "Invalid Date" : v.toISOString();
    if (v instanceof RegExp) return String(v);
    if (typeof Node !== "undefined" && v instanceof Node) return describeNode(v);
    if (seen.has(v)) return "[Circular]";
    if (depth > 4) return Array.isArray(v) ? "[Array]" : "[Object]";

    seen.add(v);
    var parts = [];
    var prefix = "";
    var open = "{";
    var close = "}";
    try {
      if (Array.isArray(v) || ArrayBuffer.isView(v)) {
        var len = v.length;
        var n = Math.min(len, 100);
        for (var i = 0; i < n; i++) {
          parts.push(i in v ? fmt(v[i], depth + 1, seen, false) : "<empty>");
        }
        if (len > n) parts.push("... " + (len - n) + " more items");
        if (!Array.isArray(v)) prefix = ctorName(v) + "(" + len + ") ";
        open = "[";
        close = "]";
      } else if (v instanceof Map) {
        prefix = "Map(" + v.size + ") ";
        v.forEach(function (val, key) {
          parts.push(fmt(key, depth + 1, seen, false) + " => " + fmt(val, depth + 1, seen, false));
        });
      } else if (v instanceof Set) {
        prefix = "Set(" + v.size + ") ";
        v.forEach(function (val) {
          parts.push(fmt(val, depth + 1, seen, false));
        });
      } else if (v instanceof Promise) {
        return "Promise { <pending> }";
      } else {
        var name = ctorName(v);
        if (name === null) prefix = "[Object: null prototype] ";
        else if (name && name !== "Object") prefix = name + " ";
        Object.keys(v).forEach(function (k) {
          var val;
          try {
            val = fmt(v[k], depth + 1, seen, false);
          } catch (e) {
            val = "[Getter threw]";
          }
          parts.push(keyName(k) + ": " + val);
        });
      }
    } finally {
      seen.delete(v);
    }

    if (!parts.length) return prefix + open + close;
    var single = prefix + open + " " + parts.join(", ") + " " + close;
    if (single.length <= 72 && single.indexOf("\n") === -1) return single;
    return (
      prefix +
      open +
      "\n" +
      parts
        .map(function (p) {
          return "  " + p.replace(/\n/g, "\n  ");
        })
        .join(",\n") +
      "\n" +
      close
    );
  }

  function inspect(v) {
    return fmt(v, 0, new Set(), true);
  }

  function formatArgs(argsLike) {
    var args = Array.prototype.slice.call(argsLike);
    var out = [];
    if (typeof args[0] === "string" && /%[sdifoOjc%]/.test(args[0])) {
      var first = args.shift();
      out.push(
        first.replace(/%([sdifoOjc%])/g, function (m, c) {
          if (c === "%") return "%";
          if (!args.length) return m;
          var a = args.shift();
          switch (c) {
            case "s":
              return typeof a === "string" ? a : fmt(a, 1, new Set(), false);
            case "d":
            case "i":
              return String(parseInt(a, 10));
            case "f":
              return String(parseFloat(a));
            case "c":
              return "";
            default:
              return fmt(a, 0, new Set(), false);
          }
        })
      );
    }
    return out
      .concat(
        args.map(function (a) {
          return inspect(a);
        })
      )
      .join(" ");
  }

  function table(data) {
    if (data === null || typeof data !== "object") return inspect(data);
    var rowKeys = Object.keys(data);
    var cols = [];
    var hasValues = false;
    rowKeys.forEach(function (rk) {
      var row = data[rk];
      if (row !== null && typeof row === "object") {
        Object.keys(row).forEach(function (c) {
          if (cols.indexOf(c) === -1) cols.push(c);
        });
      } else {
        hasValues = true;
      }
    });
    var header = ["(index)"].concat(cols, hasValues ? ["Values"] : []);
    var rows = rowKeys.map(function (rk) {
      var row = data[rk];
      var isObj = row !== null && typeof row === "object";
      return [rk]
        .concat(
          cols.map(function (c) {
            return isObj && c in row ? fmt(row[c], 2, new Set(), false) : "";
          })
        )
        .concat(hasValues ? [isObj ? "" : fmt(row, 2, new Set(), false)] : []);
    });
    var widths = header.map(function (h, i) {
      return Math.max.apply(
        null,
        [h.length].concat(
          rows.map(function (r) {
            return r[i].length;
          })
        )
      );
    });
    function line(cells) {
      return (
        "│ " +
        cells
          .map(function (c, i) {
            return c + new Array(widths[i] - c.length + 1).join(" ");
          })
          .join(" │ ") +
        " │"
      );
    }
    function rule(l, m, r) {
      return (
        l +
        widths
          .map(function (w) {
            return new Array(w + 3).join("─");
          })
          .join(m) +
        r
      );
    }
    return [rule("┌", "┬", "┐"), line(header), rule("├", "┼", "┤")]
      .concat(rows.map(line), [rule("└", "┴", "┘")])
      .join("\n");
  }

  // ---------- console patch ----------

  ["log", "info", "warn", "error", "debug", "dir"].forEach(function (method) {
    native[method] = console[method];
    console[method] = function () {
      var level = method === "dir" ? "log" : method;
      emit(level, method === "dir" ? inspect(arguments[0]) : formatArgs(arguments));
      if (native[method]) native[method].apply(console, arguments);
    };
  });

  native.table = console.table;
  console.table = function (data) {
    emit("log", table(data));
    if (native.table) native.table.apply(console, arguments);
  };

  console.assert = function (cond) {
    if (!cond) {
      var rest = Array.prototype.slice.call(arguments, 1);
      emit("error", "Assertion failed" + (rest.length ? ": " + formatArgs(rest) : ""));
    }
  };

  console.clear = function () {
    post({ type: "clear" });
  };

  console.time = function (label) {
    timers[label === undefined ? "default" : label] = performance.now();
  };
  function elapsed(label, end) {
    label = label === undefined ? "default" : label;
    if (!(label in timers)) {
      emit("warn", "Timer '" + label + "' does not exist");
      return;
    }
    var ms = performance.now() - timers[label];
    if (end) delete timers[label];
    emit("log", label + ": " + ms.toFixed(3) + " ms");
  }
  console.timeEnd = function (label) {
    elapsed(label, true);
  };
  console.timeLog = function (label) {
    elapsed(label, false);
  };

  console.count = function (label) {
    label = label === undefined ? "default" : label;
    counters[label] = (counters[label] || 0) + 1;
    emit("log", label + ": " + counters[label]);
  };
  console.countReset = function (label) {
    counters[label === undefined ? "default" : label] = 0;
  };

  console.group = console.groupCollapsed = function () {
    if (arguments.length) emit("log", formatArgs(arguments));
    groupDepth++;
  };
  console.groupEnd = function () {
    if (groupDepth) groupDepth--;
  };

  // ---------- uncaught errors ----------

  window.addEventListener("error", function (e) {
    if (e.target !== window) return; // resource errors are handled by loadFailed
    var where = e.filename ? relativize(e.filename) + ":" + e.lineno : "";
    var text = e.error instanceof Error ? fmtError(e.error) : e.message;
    emit("error", "Uncaught " + text, where);
  });

  window.addEventListener("unhandledrejection", function (e) {
    var r = e.reason;
    emit("error", "Uncaught (in promise) " + (r instanceof Error ? fmtError(r) : inspect(r)));
  });

  window.addEventListener("load", function () {
    var ms = execMs !== null ? execMs : startedAt ? performance.now() - startedAt : 0;
    post({ type: "done", ms: ms });
  });

  window.__playground = {
    post: post,
    emit: emit,
    markStart: function () {
      startedAt = performance.now();
    },
    markEnd: function () {
      execMs = performance.now() - startedAt;
    },
  };
})();
