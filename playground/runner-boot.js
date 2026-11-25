// Loads one practice file into the runner iframe: ?file=<path from repo root>&module=1&run=<id>
// It uses document.write so the file is parser-inserted. That way scripts that wait for
// DOMContentLoaded still run, just as they did when loaded from a <script> tag.
(function () {
  "use strict";

  var P = window.__playground;
  var params = new URLSearchParams(location.search);
  var file = params.get("file") || "";
  var isModule = params.get("module") === "1";

  // Pages some demos need. Keyed by file path.
  var BUBBLE = {
    hint: "Click the <b>child</b> box and watch the order of the console output.",
    html:
      '<div id="grandparent" class="box">grandparent' +
      '<div id="parent" class="box">parent' +
      '<div id="child" class="box">child</div></div></div>',
  };
  var FIXTURES = {
    "javascript/dom-and-events/EventBubbling.js": BUBBLE,
    "javascript/dom-and-events/EventCapturing.js": BUBBLE,
    "javascript/async/AsyncAwait.js": {
      hint:
        "Click <b>Fill canvas</b>, then try <b>Alert</b> right away. The page freezes until the loop finishes, even though the function is async.",
      html:
        '<p class="row"><button class="fill">Fill canvas</button><button class="alert">Alert</button></p>',
    },
    "javascript/async/Webworker.js": {
      hint:
        "Click the button to post <code>sum([1, 2, 3])</code> to the worker. Workers need the page served over http, not opened as <code>file://</code>.",
      html: '<p class="row"><button id="clickWorker">Send to worker</button></p>',
    },
    "javascript/dom-and-events/DebounceTest.js": {
      hint: "Type in the box and pause. An alert shows the value 1&nbsp;second after you stop typing.",
      html:
        '<label class="field">Search <input type="text" onkeydown="handleTextChange(event)" placeholder="Start typing…" autofocus></label>',
    },
    "javascript/dom-and-events/Debouncing.js": {
      hint:
        "Resize the browser window, then stop. 10&nbsp;seconds after the last resize, the console logs one call.",
      html: "",
    },
    "javascript/dom-and-events/Throttling.js": {
      hint: "Resize the browser window. The size updates at most once per second.",
      html:
        '<dl class="stats"><div><dt>Window height</dt><dd id="height">–</dd></div>' +
        '<div><dt>Window width</dt><dd id="width">–</dd></div></dl>',
    },
    "javascript/dom-and-events/FindDuplicateInArray.js": { html: '<div id="output"></div>' },
    "javascript/dom-and-events/FolderFilesStructure.js": {
      hint: "Click a folder name to collapse or expand it.",
      html: '<div id="folder" class="tree"></div>',
    },
  };

  var valid =
    /^[\w\-. /]+\.js$/.test(file) && file.charAt(0) !== "/" && file.split("/").indexOf("..") === -1;
  if (!valid) {
    P.emit("error", "Refusing to load invalid path: " + file);
    return;
  }

  P.loadFailed = function () {
    var msg =
      isModule && location.protocol === "file:"
        ? "Couldn't load " +
          file +
          ". Browsers block ES modules (import/export) on file:// pages. Serve the folder over http instead, for example `npx serve` or VS Code Live Server."
        : "Couldn't load " + file + ".";
    P.emit("error", msg);
  };

  var fx = FIXTURES[file];
  if (fx) {
    document.write(
      '<div class="fixture">' +
        (fx.hint ? '<p class="hint">' + fx.hint + "</p>" : "") +
        fx.html +
        "</div>"
    );
  }

  var src = encodeURI(file);
  document.write("<script>__playground.markStart()<\/script>");
  document.write(
    "<script" +
      (isModule ? ' type="module"' : "") +
      ' src="' +
      src +
      '" onerror="__playground.loadFailed()"><\/script>'
  );
  if (!isModule) document.write("<script>__playground.markEnd()<\/script>");
})();
