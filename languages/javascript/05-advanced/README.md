# 05 — Advanced JavaScript

## The event loop

JS runs on one thread. Async work is queued and executed when the call stack empties.

**Order per tick:** synchronous code → all **microtasks** (promise callbacks, `queueMicrotask`) → one **macrotask** (`setTimeout`, I/O) → repeat.

```js
console.log("1");
setTimeout(() => console.log("4"), 0);      // macrotask
Promise.resolve().then(() => console.log("3"));  // microtask
console.log("2");
// 1 2 3 4
```

Blocking the thread (a long loop) freezes everything, including UI. Offload CPU work to Web Workers / `worker_threads`.

## Promises

```js
const p = new Promise((resolve, reject) => { /* ... */ });

p.then(onOk).catch(onErr).finally(cleanup);

await Promise.all([a, b]);          // all succeed, or reject on first failure
await Promise.allSettled([a, b]);   // never rejects; inspect status per item
await Promise.race([a, timeout]);   // first to settle (great for timeouts)
await Promise.any([a, b]);          // first to fulfil
```

## `async` / `await`

```js
async function load(id) {
  try {
    const res = await fetch(`/api/items/${id}`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("load failed:", err.message);
    throw err;
  }
}
```

**Sequential vs parallel:** awaiting inside a loop serialises requests. Build the promises first, then `await Promise.all(...)`.

Every `async` function returns a promise. Unhandled rejections crash modern Node.

## Iterators, generators, async iterators

```js
function* idGen() { let i = 0; while (true) yield ++i; }

async function* pages(url) {
  let next = url;
  while (next) {
    const data = await (await fetch(next)).json();
    yield* data.items;
    next = data.next;
  }
}
for await (const item of pages("/api/items")) { /* streamed */ }
```

Any object with `[Symbol.iterator]` works with `for...of` and spread.

## Metaprogramming

`Proxy` + `Reflect` intercept property access (validation, reactivity, ORMs). `Symbol` creates non-colliding keys. `WeakMap`/`WeakRef` hold garbage-collectable references — ideal for private data and caches.

## Performance

1. Measure with `performance.now()`, `console.time`, or the profiler — never guess.
2. Avoid work in hot loops; hoist invariants out.
3. Keep object shapes stable so the JIT can optimise.
4. Batch DOM reads then writes (avoid layout thrashing); use `requestAnimationFrame`.
5. Debounce/throttle high-frequency handlers.
6. Prefer `Map`/`Set` over `array.includes` in loops (O(1) vs O(n)).
7. Lazy-load and code-split; ship less JavaScript.

## Memory leaks to watch

Forgotten timers and event listeners, growing caches without eviction, closures capturing large objects, and detached DOM nodes.

## Testing and tooling

```js
import { test, expect } from "vitest";

test("adds", () => expect(add(2, 3)).toBe(5));
test("rejects", async () => await expect(load(-1)).rejects.toThrow());
```

Node also ships `node:test` and `node:assert` with zero dependencies. Use ESLint + Prettier, and TypeScript or JSDoc for types.

Next: [exercises.md](exercises.md)
