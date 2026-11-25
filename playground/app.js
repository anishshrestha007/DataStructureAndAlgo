// DSA Playground: sidebar, search, routing, and the console bridge to the runner iframe.
(function () {
  "use strict";

  var FILES = window.PLAYGROUND_FILES || [];
  var BY_PATH = new Map(
    FILES.map(function (f) {
      return [f.path, f];
    })
  );

  var PROJECTS = [
    { name: "Library App", href: "projects/library-app/index.html", note: "HTML, CSS & JS" },
    { name: "Tic Tac Toe", href: "projects/tic-tac-toe/Index.html", note: "HTML, CSS & JS" },
    {
      name: "Weather App",
      cmd: "cd projects/weather-app && npm install && npm start",
      note: "Webpack app, needs a WeatherAPI key in .env",
    },
    {
      name: "CV Creator",
      cmd: "cd projects/cv-creator && npm install && npm start",
      note: "React app, runs with npm",
    },
  ];

  var KIND = {
    dom: { label: "Page", title: "Uses the page (DOM). A live preview appears above the console." },
    module: { label: "ES module", title: "Uses import/export" },
    node: { label: "Node only", title: "Uses require(), which only exists in Node" },
    worker: { label: "Worker", title: "Web worker script, loaded by another file" },
  };

  var CHEVRON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
  var MAX_ROWS = 2000;

  // ---------- helpers ----------

  function $(id) {
    return document.getElementById(id);
  }

  function h(tag, props, children) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        var v = props[k];
        if (v === undefined || v === null || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k === "html") node.innerHTML = v;
        else if (k.slice(0, 2) === "on") node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c !== null && c !== undefined) node.append(c);
    });
    return node;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var store = {
    get: function (key, fallback) {
      try {
        var v = localStorage.getItem("playground:" + key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem("playground:" + key, JSON.stringify(value));
      } catch (e) {
        /* private mode or blocked storage */
      }
    },
  };

  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove("show");
    }, 1800);
  }

  function copyText(text) {
    function fallback() {
      var ta = h("textarea", { style: "position:fixed;opacity:0" });
      ta.value = text;
      document.body.append(ta);
      ta.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {}
      ta.remove();
      return ok ? Promise.resolve() : Promise.reject();
    }
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(fallback);
    }
    return fallback();
  }

  function nodeCommand(file) {
    return /\s/.test(file.path) ? 'node "' + file.path + '"' : "node " + file.path;
  }

  function isTyping(e) {
    var t = e.target;
    return t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
  }

  // ---------- sidebar ----------

  var openGroups = new Set(store.get("openGroups", []));
  var links = []; // { a, li, file, haystack }
  var groupEls = []; // { details, key, items: [] }
  var sectionEls = []; // { el, groups: [] }

  function groupKey(f) {
    return f.section + "|" + f.group;
  }

  function buildNav() {
    var nav = $("nav");
    var sections = new Map();
    FILES.forEach(function (f) {
      if (!sections.has(f.section)) sections.set(f.section, new Map());
      var groups = sections.get(f.section);
      if (!groups.has(f.group)) groups.set(f.group, []);
      groups.get(f.group).push(f);
    });

    sections.forEach(function (groups, sectionName) {
      var sectionRecord = { el: null, groups: [] };
      var sectionEl = h("div", { class: "nav-section" }, [h("h2", { class: "nav-title", text: sectionName })]);

      groups.forEach(function (files, groupName) {
        var key = sectionName + "|" + groupName;
        var ul = h("ul");
        var record = { details: null, key: key, items: [] };

        files.forEach(function (f) {
          var tags = f.kinds
            .filter(function (k) {
              return k !== "dom";
            })
            .map(function (k) {
              return h("span", { class: "tag " + k, text: KIND[k].label, title: KIND[k].title });
            });
          var nameEl = h("span", { class: "file-name", text: f.name });
          var a = h("a", { class: "file-link", href: "#/" + encodeURI(f.path), title: f.path }, [nameEl].concat(tags));
          var li = h("li", null, [a]);
          ul.append(li);
          var item = {
            a: a,
            li: li,
            nameEl: nameEl,
            file: f,
            haystack: (f.name + " " + f.path + " " + f.group + " " + f.summary).toLowerCase(),
          };
          links.push(item);
          record.items.push(item);
        });

        var countEl = h("span", { class: "count", text: String(files.length) });
        var summary = h("summary", { html: CHEVRON }, [h("span", { text: groupName }), countEl]);
        record.count = countEl;
        var details = h("details", { class: "nav-group" }, [summary, ul]);
        details.open = openGroups.has(key);
        details.addEventListener("toggle", function () {
          if (searchQuery) return; // search opens groups temporarily, don't remember that
          if (details.open) openGroups.add(key);
          else openGroups.delete(key);
          store.set("openGroups", Array.from(openGroups));
        });
        record.details = details;
        groupEls.push(record);
        sectionRecord.groups.push(record);
        sectionEl.append(details);
      });

      sectionRecord.el = sectionEl;
      sectionEls.push(sectionRecord);
      nav.append(sectionEl);
    });

    // Projects
    var projectSection = h("div", { class: "nav-section nav-projects" }, [
      h("h2", { class: "nav-title", text: "Projects" }),
    ]);
    PROJECTS.forEach(function (p) {
      if (!p.href) return;
      projectSection.append(
        h("a", { href: p.href, target: "_blank", rel: "noopener" }, [
          h("span", { text: p.name }),
          h("small", { text: "↗" }),
        ])
      );
    });
    nav.append(projectSection);
    sectionEls.push({ el: projectSection, groups: null });
  }

  function openGroupOf(file) {
    var key = groupKey(file);
    groupEls.forEach(function (g) {
      if (g.key === key && !g.details.open) g.details.open = true;
    });
  }

  // ---------- search ----------

  var searchQuery = "";
  var highlightIndex = -1;

  function visibleLinks() {
    return links.filter(function (l) {
      return !l.li.hidden && l.a.offsetParent !== null;
    });
  }

  function setHighlight(i) {
    var vis = visibleLinks();
    links.forEach(function (l) {
      l.a.classList.remove("is-highlighted");
    });
    if (!vis.length) {
      highlightIndex = -1;
      return;
    }
    highlightIndex = (i + vis.length) % vis.length;
    var target = vis[highlightIndex].a;
    target.classList.add("is-highlighted");
    target.scrollIntoView({ block: "nearest" });
  }

  function markMatch(item, tokens) {
    var name = item.file.name;
    var lower = name.toLowerCase();
    var token = tokens.find(function (t) {
      return lower.indexOf(t) !== -1;
    });
    if (!token) {
      item.nameEl.textContent = name;
      return;
    }
    var i = lower.indexOf(token);
    item.nameEl.innerHTML =
      escapeHtml(name.slice(0, i)) +
      "<mark>" +
      escapeHtml(name.slice(i, i + token.length)) +
      "</mark>" +
      escapeHtml(name.slice(i + token.length));
  }

  function applySearch(q) {
    searchQuery = q.trim().toLowerCase();
    var tokens = searchQuery.split(/\s+/).filter(Boolean);
    var any = false;

    links.forEach(function (item) {
      var match = tokens.every(function (t) {
        return item.haystack.indexOf(t) !== -1;
      });
      item.li.hidden = !match;
      if (match) any = true;
      markMatch(item, tokens);
    });

    groupEls.forEach(function (g) {
      var shown = g.items.filter(function (i) {
        return !i.li.hidden;
      }).length;
      var has = shown > 0;
      g.count.textContent = tokens.length ? shown + "/" + g.items.length : String(g.items.length);
      g.details.hidden = !has;
      if (tokens.length) g.details.open = has;
      else g.details.open = openGroups.has(g.key);
    });

    sectionEls.forEach(function (s) {
      if (!s.groups) {
        s.el.hidden = tokens.length > 0; // hide projects while searching
        return;
      }
      s.el.hidden = !s.groups.some(function (g) {
        return !g.details.hidden;
      });
    });

    if (!tokens.length && current) openGroupOf(current);
    $("no-results").hidden = any;
    setHighlight(tokens.length ? 0 : -1);
    if (!tokens.length) highlightIndex = -1;
  }

  // ---------- viewer ----------

  var current = null;
  var runId = 0;
  var counts = { error: 0, warn: 0, total: 0 };
  var lastRow = null;
  var rowCount = 0;
  var doneMs = null;
  var sourceCache = new Map();
  var activeTab = "output";

  var frame = $("frame");
  var logEl = $("log");

  function setStatus(state, text) {
    var el = $("run-status");
    el.className = "run-status " + state;
    el.innerHTML = '<span class="dot"></span>';
    el.append(h("span", { text: text }));
    if (counts.error) {
      el.append(h("span", { class: "sep", text: "·" }));
      el.append(h("span", { class: "err", text: counts.error + (counts.error === 1 ? " error" : " errors") }));
    }
    if (counts.warn) {
      el.append(h("span", { class: "sep", text: "·" }));
      el.append(h("span", { class: "warn", text: counts.warn + (counts.warn === 1 ? " warning" : " warnings") }));
    }
  }

  function refreshStatus() {
    if (doneMs === null) return;
    var ms = doneMs < 1 ? doneMs.toFixed(2) : doneMs < 100 ? doneMs.toFixed(1) : Math.round(doneMs);
    setStatus(counts.error ? "has-errors" : "ok", "Ran in " + ms + " ms");
  }

  function clearLog(note) {
    logEl.textContent = "";
    lastRow = null;
    rowCount = 0;
    counts = { error: 0, warn: 0, total: 0 };
    if (note) addSystem(note);
  }

  function addSystem(text) {
    logEl.append(h("div", { class: "log-row system" }, [h("pre", { text: text })]));
    lastRow = null;
  }

  function showEmpty() {
    if (counts.total || logEl.querySelector(".log-empty")) return;
    var dom = current && current.kinds.indexOf("dom") !== -1;
    logEl.append(
      h("div", {
        class: "log-empty",
        text: dom ? "No console output yet. Try the page above." : "This file finished without logging anything.",
      })
    );
  }

  function addLog(level, text, where) {
    var empty = logEl.querySelector(".log-empty");
    if (empty) empty.remove();

    counts.total++;
    if (level === "error") counts.error++;
    if (level === "warn") counts.warn++;

    if (lastRow && lastRow.level === level && lastRow.text === text && lastRow.where === where) {
      lastRow.n++;
      lastRow.badge.textContent = String(lastRow.n);
      lastRow.badge.hidden = false;
    } else {
      if (rowCount >= MAX_ROWS) return;
      rowCount++;
      var badge = h("span", { class: "repeat", hidden: true });
      var row = h("div", { class: "log-row " + level }, [
        badge,
        h("pre", { text: text }),
        where ? h("span", { class: "where", text: where }) : null,
      ]);
      logEl.append(row);
      lastRow = { level: level, text: text, where: where, n: 1, badge: badge };
    }

    var nearBottom = logEl.scrollHeight - logEl.scrollTop - logEl.clientHeight < 60;
    if (nearBottom) logEl.scrollTop = logEl.scrollHeight;
    refreshStatus();
  }

  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!d || d.channel !== "playground" || d.runId !== runId) return;
    if (e.source !== frame.contentWindow) return;

    if (d.type === "console") addLog(d.level, d.text, d.where);
    else if (d.type === "clear") clearLog("Console was cleared");
    else if (d.type === "truncated") addSystem("Output truncated after " + d.limit + " messages.");
    else if (d.type === "done") {
      doneMs = d.ms;
      refreshStatus();
      showEmpty();
    }
  });

  function setNotice(html) {
    var n = $("notice");
    if (!html) {
      n.hidden = true;
      n.textContent = "";
      return;
    }
    n.innerHTML = html;
    n.hidden = false;
    var copy = n.querySelector("[data-copy]");
    if (copy) {
      copy.addEventListener("click", function () {
        copyText(copy.getAttribute("data-copy")).then(
          function () {
            toast("Copied to clipboard");
          },
          function () {
            toast("Couldn't copy. Select the text instead.");
          }
        );
      });
    }
  }

  function run() {
    if (!current) return;
    var f = current;
    runId++;
    clearLog();
    doneMs = null;

    var isWorker = f.kinds.indexOf("worker") !== -1;
    var isNode = f.kinds.indexOf("node") !== -1;
    var isModule = f.kinds.indexOf("module") !== -1;
    var hasPage = f.kinds.indexOf("dom") !== -1;
    var cmd = nodeCommand(f);

    $("preview").hidden = !hasPage || isWorker || isNode;
    $("rerun-btn").disabled = isWorker || isNode;

    if (isWorker) {
      var parent = "javascript/async/Webworker.js";
      setNotice(
        "<p>This is a web worker script. It doesn't run on its own; " +
          (BY_PATH.has(parent)
            ? '<a href="#/' + encodeURI(parent) + '">Webworker.js</a> starts it.'
            : "another file starts it with <code>new Worker()</code>.") +
          "</p>"
      );
      frame.src = "about:blank";
      setStatus("", "Not run");
      addSystem("Worker scripts are loaded by another file.");
      return;
    }
    if (isNode) {
      setNotice(
        "<p>This file uses <code>require()</code>, which only exists in Node. Run it in a terminal:</p>" +
          '<div class="cmd"><code>' +
          escapeHtml(cmd) +
          '</code><button class="btn" type="button" data-copy="' +
          escapeHtml(cmd) +
          '">Copy</button></div>'
      );
      frame.src = "about:blank";
      setStatus("", "Not run in the browser");
      addSystem("Run it with Node to see the output.");
      return;
    }
    if (isModule && location.protocol === "file:") {
      setNotice(
        "<p>This file uses ES modules, which browsers block on <code>file://</code> pages. " +
          "Serve the folder over http, for example <code>npx serve</code> or VS Code Live Server, then open it from there.</p>"
      );
    } else {
      setNotice("");
    }

    setStatus("running", "Running…");
    frame.src =
      "playground/runner.html?file=" +
      encodeURIComponent(f.path) +
      (isModule ? "&module=1" : "") +
      "&run=" +
      runId;
  }

  // ---------- source view ----------

  var KEYWORDS =
    "await|async|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|false|finally|for|from|function|get|if|import|in|instanceof|let|new|null|of|return|set|static|super|switch|this|throw|true|try|typeof|undefined|var|void|while|yield";
  var TOKEN = new RegExp(
    "(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*)" + // 1 comments
      "|(\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*'|`(?:\\\\[\\s\\S]|[^`\\\\])*`)" + // 2 strings
      "|\\b(\\d+(?:\\.\\d+)?)\\b" + // 3 numbers
      "|\\b(" +
      KEYWORDS +
      ")\\b", // 4 keywords
    "g"
  );

  function highlight(code) {
    var out = "";
    var last = 0;
    code.replace(TOKEN, function (m, com, str, num, kw, idx) {
      out += escapeHtml(code.slice(last, idx));
      var cls = com ? "tok-com" : str ? "tok-str" : num ? "tok-num" : "tok-kw";
      out += '<span class="' + cls + '">' + escapeHtml(m) + "</span>";
      last = idx + m.length;
      return m;
    });
    return out + escapeHtml(code.slice(last));
  }

  function renderSource(f) {
    var box = $("source");
    var cached = sourceCache.get(f.path);
    if (cached !== undefined) {
      paintSource(box, f, cached);
      return;
    }
    box.innerHTML = '<div class="source-error"><p>Loading…</p></div>';
    fetch(encodeURI(f.path))
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(
        function (text) {
          sourceCache.set(f.path, text);
          if (current === f) paintSource(box, f, text);
        },
        function () {
          if (current !== f) return;
          box.innerHTML = "";
          box.append(
            h("div", { class: "source-error" }, [
              h("p", {
                html:
                  location.protocol === "file:"
                    ? "Browsers don't let a page read files when it's opened straight from disk (<code>file://</code>). " +
                      "Serve the folder over http to see the source here, for example <code>npx serve</code> or VS Code Live Server."
                    : "Couldn't load this file.",
              }),
              h("a", { class: "btn", href: encodeURI(f.path), target: "_blank", rel: "noopener", text: "Open file ↗" }),
            ])
          );
        }
      );
  }

  function paintSource(box, f, text) {
    var text2 = text.replace(/\r\n/g, "\n").replace(/\n$/, "");
    var n = text2.split("\n").length;
    var nums = [];
    for (var i = 1; i <= n; i++) nums.push(i);
    box.innerHTML = "";
    var code = h("pre", { class: "code" });
    code.innerHTML = "<code>" + highlight(text2) + "</code>";
    box.append(h("pre", { class: "gutter", "aria-hidden": "true", text: nums.join("\n") }), code);
  }

  function selectTab(name, focus) {
    activeTab = name;
    ["output", "source"].forEach(function (t) {
      var tab = $("tab-" + t);
      var on = t === name;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      $("panel-" + t).hidden = !on;
      if (on && focus) tab.focus();
    });
    if (name === "source" && current) renderSource(current);
  }

  // ---------- routing ----------

  function pathFromHash() {
    var raw = location.hash.replace(/^#\/?/, "");
    try {
      return decodeURI(raw);
    } catch (e) {
      return raw;
    }
  }

  function showWelcome() {
    current = null;
    runId++;
    frame.src = "about:blank";
    document.title = "DSA Playground";
    $("viewer").hidden = true;
    $("welcome").hidden = false;
    links.forEach(function (l) {
      l.a.removeAttribute("aria-current");
    });
    var lastPath = store.get("lastFile", null);
    var last = lastPath && BY_PATH.get(lastPath);
    var resume = $("resume-link");
    if (last) {
      resume.hidden = false;
      resume.href = "#/" + encodeURI(last.path);
      resume.textContent = "Continue with " + last.name;
    } else {
      resume.hidden = true;
    }
  }

  function open(f) {
    current = f;
    store.set("lastFile", f.path);
    document.title = f.name + " · DSA Playground";
    $("welcome").hidden = true;
    $("viewer").hidden = false;

    links.forEach(function (l) {
      if (l.file === f) l.a.setAttribute("aria-current", "page");
      else l.a.removeAttribute("aria-current");
    });
    if (!searchQuery) openGroupOf(f);
    var active = links.find(function (l) {
      return l.file === f;
    });
    if (active && active.a.offsetParent !== null) active.a.scrollIntoView({ block: "nearest" });

    var crumbs = $("crumbs");
    crumbs.textContent = "";
    [f.section].concat(f.group === "General" ? [] : f.group.split(" / ")).forEach(function (c) {
      crumbs.append(h("li", { text: c }));
    });

    $("file-name").textContent = f.name;
    var badges = $("badges");
    badges.textContent = "";
    f.kinds.forEach(function (k) {
      badges.append(h("span", { class: "tag " + k, text: KIND[k].label, title: KIND[k].title }));
    });
    badges.append(h("span", { class: "tag", text: f.lines + " lines" }));

    var summary = $("file-summary");
    summary.textContent = f.summary;
    summary.hidden = !f.summary;

    $("open-link").href = encodeURI(f.path);

    var i = FILES.indexOf(f);
    $("prev-btn").disabled = i <= 0;
    $("next-btn").disabled = i >= FILES.length - 1;

    $("main").scrollTop = 0;
    selectTab(activeTab);
    run();
    closeNav();
  }

  function route() {
    var path = pathFromHash();
    if (!path) return showWelcome();
    var f = BY_PATH.get(path);
    if (!f) {
      showWelcome();
      toast("No file at " + path);
      return;
    }
    if (f !== current) open(f);
  }

  function go(f) {
    if (f) location.hash = "#/" + encodeURI(f.path);
  }

  function step(delta) {
    if (!current) return go(FILES[0]);
    go(FILES[FILES.indexOf(current) + delta]);
  }

  // ---------- welcome ----------

  function buildWelcome() {
    var stats = $("stats");
    var sections = [];
    FILES.forEach(function (f) {
      var s = sections.find(function (x) {
        return x.name === f.section;
      });
      if (!s) sections.push((s = { name: f.section, n: 0, first: f }));
      s.n++;
    });
    sections.forEach(function (s) {
      stats.append(
        h(
          "button",
          {
            class: "stat",
            type: "button",
            onclick: function () {
              groupEls.forEach(function (g) {
                if (g.key.indexOf(s.name + "|") === 0) g.details.open = true;
              });
              openNav();
              var first = links.find(function (l) {
                return l.file.section === s.name;
              });
              if (first) {
                first.a.scrollIntoView({ block: "start" });
                first.a.focus();
              }
            },
          },
          [h("strong", { text: String(s.n) }), h("span", { text: s.name })]
        )
      );
    });

    var projects = $("projects");
    PROJECTS.forEach(function (p) {
      var body = [h("strong", { text: p.name }), h("span", { text: p.note })];
      if (p.cmd) body.push(h("code", { text: p.cmd }));
      projects.append(
        p.href
          ? h("a", { class: "project", href: p.href, target: "_blank", rel: "noopener" }, body)
          : h("div", { class: "project" }, body)
      );
    });

    $("random-btn").addEventListener("click", function () {
      var pool = FILES.filter(function (f) {
        return f.section === "Data Structures & Algorithms";
      });
      if (!pool.length) pool = FILES;
      go(pool[Math.floor(Math.random() * pool.length)]);
    });
  }

  // ---------- mobile nav ----------

  var mobile = window.matchMedia("(max-width: 860px)");

  function openNav() {
    if (!mobile.matches) return;
    document.body.classList.add("nav-open");
    $("scrim").hidden = false;
    $("menu-btn").setAttribute("aria-expanded", "true");
    $("menu-btn").setAttribute("aria-label", "Hide file list");
  }
  function closeNav() {
    document.body.classList.remove("nav-open");
    $("scrim").hidden = true;
    $("menu-btn").setAttribute("aria-expanded", "false");
    $("menu-btn").setAttribute("aria-label", "Show file list");
  }

  // ---------- events ----------

  function bind() {
    var search = $("search");

    search.addEventListener("input", function () {
      applySearch(search.value);
    });
    search.addEventListener("focus", function () {
      openNav();
    });
    search.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight(highlightIndex + (e.key === "ArrowDown" ? 1 : -1));
      } else if (e.key === "Enter") {
        var vis = visibleLinks();
        var pick = vis[highlightIndex >= 0 ? highlightIndex : 0];
        if (pick) {
          e.preventDefault();
          go(pick.file);
        }
      } else if (e.key === "Escape") {
        if (search.value) {
          search.value = "";
          applySearch("");
        } else {
          search.blur();
          closeNav();
        }
      }
    });

    // Arrow keys move between file links in the sidebar.
    $("nav").addEventListener("keydown", function (e) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      var vis = visibleLinks();
      var i = vis.findIndex(function (l) {
        return l.a === document.activeElement;
      });
      if (i === -1) return;
      e.preventDefault();
      var next = vis[(i + (e.key === "ArrowDown" ? 1 : -1) + vis.length) % vis.length];
      next.a.focus();
    });

    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e)) return;
      if (e.key === "/") {
        e.preventDefault();
        search.focus();
        search.select();
      } else if ((e.key === "r" || e.key === "R") && current) {
        run();
      } else if (e.key === "[") {
        step(-1);
      } else if (e.key === "]") {
        step(1);
      } else if (e.key === "Escape") {
        closeNav();
      }
    });

    $("menu-btn").addEventListener("click", function () {
      if (document.body.classList.contains("nav-open")) closeNav();
      else openNav();
    });
    $("scrim").addEventListener("click", closeNav);
    mobile.addEventListener("change", function () {
      if (!mobile.matches) closeNav();
    });

    $("rerun-btn").addEventListener("click", run);
    $("clear-btn").addEventListener("click", function () {
      clearLog();
      refreshStatus();
    });
    $("copy-btn").addEventListener("click", function () {
      if (!current) return;
      var cmd = nodeCommand(current);
      copyText(cmd).then(
        function () {
          toast("Copied: " + cmd);
        },
        function () {
          toast("Couldn't copy to the clipboard");
        }
      );
    });
    $("prev-btn").addEventListener("click", function () {
      step(-1);
    });
    $("next-btn").addEventListener("click", function () {
      step(1);
    });

    $("tab-output").addEventListener("click", function () {
      selectTab("output");
    });
    $("tab-source").addEventListener("click", function () {
      selectTab("source");
    });
    document.querySelector(".tabs").addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        selectTab(activeTab === "output" ? "source" : "output", true);
      }
    });

    window.addEventListener("hashchange", route);
  }

  // ---------- start ----------

  if (!FILES.length) {
    $("nav").append(
      h("p", {
        class: "no-results",
        html: "No files found. Run <code>node playground/generate-manifest.js</code>.",
      })
    );
  }
  buildNav();
  buildWelcome();
  bind();
  route();
})();
