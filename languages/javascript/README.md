# JavaScript Track

JavaScript is the language of the web: it runs in every browser and, via Node.js, on servers. Dynamically typed, single-threaded with an event loop, and multi-paradigm (functional + object-oriented).

## Setup

```bash
node --version    # need 20+
node languages/javascript/01-basics/basics.js
```

No build step needed for these examples. Files use ES module syntax where relevant (`.mjs` semantics via `type: module` or plain scripts).

## Track contents

| Level | Topics |
|---|---|
| [01-basics](01-basics) | `let`/`const`, types, coercion, template literals, operators |
| [02-control-flow](02-control-flow) | conditionals, loops, functions, arrow functions, closures, errors |
| [03-data-structures](03-data-structures) | arrays, objects, `Map`/`Set`, destructuring, JSON, modules |
| [04-oop-and-patterns](04-oop-and-patterns) | prototypes, `class`, `this`, patterns, immutability |
| [05-advanced](05-advanced) | event loop, promises, `async/await`, generators, proxies, perf, testing |

Finish with [mini-project.md](mini-project.md).

## Golden rules

- `const` by default, `let` when reassigning, **never** `var`.
- Always `===`, never `==`.
- Prefer immutable array methods (`map`, `filter`, `reduce`) over mutation.
- `"use strict"` (automatic in modules) and always handle promise rejections.
