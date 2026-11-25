# Data Structures & Algorithms

Personal JavaScript practice: algorithm problems, core JS concepts, course exercises and small web projects.

## Layout

```
.
├── index.html                  # Playground: uncomment a <script> tag to run a file in the browser
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
│   ├── weather-app/            # Webpack app (npm start)
│   ├── webpack-demo/           # Webpack starter (npm start)
│   ├── library-app/            # Plain HTML/CSS/JS
│   ├── tic-tac-toe/            # Plain HTML/CSS/JS
│   └── tic-tac-toe-basic/      # Earlier single-file version
├── notes/                      # Study notes (.docx): JavaScript, React, Web APIs
└── scratch/                    # Throwaway experiments
```

## Running code

- **Most files** are self-contained: the problem is in comments at the top, and results are printed with `console.log`.
  - Run with Node: `node dsa/arrays-and-hashing/TwoSum.js`
  - Or in the browser: uncomment the file's `<script>` tag in `index.html`, open the page and check the console. Use this for files that use the DOM (e.g. `javascript/dom-and-events/`, `javascript/async/Webworker.js`).
- **ES module files** (`courses/codecademy/linked-list/`) need `type="module"` in the browser and must be served over HTTP (e.g. VS Code Live Server), not opened as `file://`.
- **npm projects**: `cd projects/<name>`, then `npm install`, then `npm start`.

## Conventions

- Folders are lowercase kebab-case; file names are kept as originally written.
- New problems go in the `dsa/` folder for their pattern; new concept demos go in `javascript/`.
