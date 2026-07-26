# 02 — Control Flow, Functions, Closures

## Conditionals

```js
if (score >= 90) grade = "A";
else if (score >= 80) grade = "B";
else grade = "C";

const status = score >= 60 ? "pass" : "fail";

switch (command) {
  case "start":
  case "go":
    run(); break;      // never forget break
  default:
    console.log("unknown");
}
```

## Loops

```js
for (let i = 0; i < 5; i++) {}
for (const item of array) {}        // values -- use for arrays
for (const key in object) {}        // keys -- use for plain objects only
while (cond) {}
do {} while (cond);
array.forEach((item, index) => {}); // cannot break out of this
```

## Functions

```js
function declared(a, b = 1) { return a + b; }        // hoisted
const expression = function (a) { return a; };
const arrow = (a, b) => a + b;                        // implicit return
const rest = (...nums) => nums.reduce((s, n) => s + n, 0);
```

**Arrow vs `function`:** arrows have no own `this`, `arguments`, or `prototype`, and cannot be constructors. Use arrows for callbacks; use `function`/methods when you need dynamic `this`.

## Closures

A closure is a function that remembers the scope where it was created.

```js
function makeCounter() {
  let count = 0;                    // private state
  return { inc: () => ++count, get: () => count };
}
```

Closures power module privacy, memoisation, partial application, and event handlers.

## Hoisting and TDZ

`function` declarations and `var` are hoisted; `let`/`const` are hoisted but stay in the **temporal dead zone** until initialised — reading them early throws `ReferenceError`. That's a feature: it catches bugs.

## Errors

```js
try {
  JSON.parse(bad);
} catch (err) {
  if (err instanceof SyntaxError) console.error(err.message);
  else throw err;               // re-throw what you can't handle
} finally {
  cleanup();
}

class ValidationError extends Error {
  constructor(field) {
    super(`Invalid field: ${field}`);
    this.name = "ValidationError";
    this.field = field;
  }
}
```

Always throw `Error` objects (they carry a stack trace), never strings.

Next: [exercises.md](exercises.md)
