# 03 — Arrays, Objects, Maps, Modules

## Array essentials

```js
const xs = [5, 3, 9];

// mutating (change in place)
xs.push(1); xs.pop(); xs.unshift(0); xs.shift(); xs.splice(1, 1); xs.sort();

// non-mutating (return new) -- prefer these
xs.map((n) => n * 2);
xs.filter((n) => n > 3);
xs.reduce((sum, n) => sum + n, 0);
xs.slice(1, 3);
xs.concat([7]);
[...xs].sort((a, b) => a - b);      // copy before sorting!
xs.toSorted?.((a, b) => a - b);     // ES2023 immutable sort
```

Search: `find`, `findIndex`, `includes`, `some`, `every`, `flat`, `flatMap`, `at(-1)`.

**`sort` gotcha:** default sort is lexicographic — `[10, 9].sort()` gives `[10, 9]`. Always pass a comparator for numbers.

## Objects

```js
const user = { name: "Ada", age: 36 };
Object.keys(user); Object.values(user); Object.entries(user);
const copy = { ...user, age: 37 };         // shallow clone + override
const deep = structuredClone(nested);      // real deep clone
Object.freeze(user);                        // shallow immutability
```

## Destructuring

```js
const { name, age: years = 0, ...rest } = user;
const [first, second = 0, ...others] = [1, 2, 3, 4];
function draw({ x = 0, y = 0, color = "red" } = {}) {}   // named options
[a, b] = [b, a];                                          // swap
```

## `Map` and `Set`

```js
const m = new Map([["a", 1]]);
m.set(objKey, "any key type"); m.get("a"); m.has("a"); m.size;

const s = new Set([1, 1, 2]);   // {1, 2}
[...new Set(array)]              // dedupe idiom
```

Use `Map` when keys aren't strings, order matters, or you add/remove often. Use plain objects for fixed-shape records and JSON.

## JSON

```js
JSON.stringify(obj, null, 2);
JSON.parse(text);
```

`JSON.stringify` drops `undefined`, functions, and symbols, and throws on circular references and `BigInt`.

## Modules

```js
// math.js
export const add = (a, b) => a + b;
export default class Calculator {}

// main.js
import Calculator, { add } from "./math.js";
const { readFile } = await import("node:fs/promises");   // dynamic import
```

ES modules are static, strict-mode, and support top-level `await`. CommonJS (`require`/`module.exports`) is the older Node system — recognise it, prefer ESM.

Next: [exercises.md](exercises.md)
