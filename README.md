# Data Structures & Algorithms

Personal JavaScript practice: algorithm problems, core JS concepts, course exercises and small web projects.

## Layout

```
.
├── index.html                  # Playground: browse, search and run any file in the browser
├── playground/                 # Playground internals (runner page, manifest, dev server)
├── dsa/                        # Algorithm & data-structure problems, grouped by pattern
│   ├── arrays-and-hashing/     # TwoSum, GroupAnagrams, TopKFrequentElements, ...
│   ├── two-pointers/           # ThreeSum, ValidPalindrome, StringCompression
│   ├── sliding-window/         # LengthOfLongestSubstring, MaxVowels, FindMaxAverage, ...
│   ├── binary-search/          # BinarySearch, FindingBoundary, PeakFinder, ...
│   ├── stack/                  # ValidParenthesis
│   ├── linked-list/            # Linked list & circular linked list operations
│   ├── trees/                  # DepthFirstTraversal, IsTreeEqual
│   ├── graphs/                 # NumberOfProvince, DFSTwoDArray
│   ├── heap/                   # kClosest points
│   ├── recursion-and-backtracking/
│   ├── dynamic-programming/    # FibonnaciMemo, StairMaster
│   ├── sorting/                # Merge sort variants
│   ├── design/                 # LRUCache, SubRectangleQueries
│   └── math-and-simulation/    # IsPowerOfThree, FindTheWinner
├── javascript/                 # Core JS concepts
│   ├── functions/              # Closures, currying, call/apply/bind, memoization
│   ├── async/                  # Callbacks, promises, async/await, web workers
│   ├── dom-and-events/         # Event bubbling/capturing, debounce, throttle
│   ├── arrays-and-objects/     # map/filter/flat polyfills, destructuring, object flattening
│   └── oop/                    # Prototypes, classes, mixins, factory functions
├── courses/
│   └── codecademy/             # Codecademy exercises (sorting, linked list as ES modules, DP)
├── projects/                   # Standalone apps
│   ├── cv-creator/             # React + MUI CV builder (npm start)
│   ├── weather-app/            # Webpack app (npm start, needs .env, see below)
│   ├── library-app/            # Plain HTML/CSS/JS
│   └── tic-tac-toe/            # Plain HTML/CSS/JS
├── notes/                      # Study notes (.docx): JavaScript, React, Web APIs
└── scratch/                    # Throwaway experiments
```

## Running code

### Playground (browser)

```
node playground/serve.js
```

Then open <http://localhost:5173>. You can also open `index.html` straight from disk, but ES modules, web workers
and the **Source** tab only work over http.

- Pick a file in the sidebar (or press <kbd>/</kbd> to search). It runs right away, and its console output shows in the page.
- Files that use the DOM get a live **Page** preview, with the buttons and elements the demo expects.
- Every file runs in its own iframe, so globals from one file never clash with another.
- Shortcuts: <kbd>/</kbd> search, <kbd>↑</kbd>/<kbd>↓</kbd> + <kbd>Enter</kbd> pick a result, <kbd>R</kbd> run again,
  <kbd>[</kbd>/<kbd>]</kbd> previous/next file.

After adding, moving or renaming files, refresh the sidebar list:

```
node playground/generate-manifest.js
```

### Node

Most files are self-contained: the problem is in comments at the top and results are printed with `console.log`.

```
node dsa/arrays-and-hashing/TwoSum.js
```

Files that use `require()` (`courses/codecademy/algorithms/`) only run in Node.

### npm projects

`cd projects/<name>`, then `npm install`, then `npm start`.

**Weather App** needs a free key from [weatherapi.com](https://www.weatherapi.com/). Copy
`projects/weather-app/.env.example` to `.env` in the same folder and put your key there. `.env` is gitignored, so
the key stays out of the repo. Webpack injects it at build time, so it will still be visible in the built
JavaScript in the browser; that's unavoidable for a browser-only app. For the same reason `dist/` isn't committed.

## Conventions

- Folders are lowercase kebab-case; file names are kept as originally written.
- New problems go in the `dsa/` folder for their pattern; new concept demos go in `javascript/`.
