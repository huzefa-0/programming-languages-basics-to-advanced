# Exercises — JavaScript 03 Data Structures

1. **`groupBy(array, keyFn)`** — generic grouping; compare to `Object.groupBy`.
2. **`unique(array)`** — dedupe preserving order, for primitives and for objects by an id field.
3. **Word frequency** — count words in a paragraph with a `Map`, print the top 5 sorted.
4. **`chunk(array, size)`** and **`zip(a, b)`** — implement both without libraries.
5. **Deep equal** — write `deepEqual(a, b)` handling nested objects, arrays, and `null`.
6. **Sort table** — sort an array of records by multiple keys (role asc, salary desc).
7. **`pick`/`omit`** — `pick(obj, ["a", "b"])` and `omit(obj, ["c"])` using `Object.entries`.
8. **Set algebra** — implement `union`, `intersection`, `difference` for two `Set`s.
9. **Safe JSON** — `tryParse(text, fallback)` that never throws; handle circular refs in stringify with a replacer.
10. **Modules** — split exercises 1–9 into `utils/array.js`, `utils/object.js`, `utils/index.js` with named exports and import them into a demo script.
11. **Stretch** — build an in-memory LRU cache class using `Map` (insertion order gives you the eviction order for free).
