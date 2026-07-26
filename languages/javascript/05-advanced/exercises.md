# Exercises — JavaScript 05 Advanced

1. **Predict the output** — write a script mixing sync logs, `setTimeout(0)`, `Promise.then`, `queueMicrotask`, and `await`; predict the order before running.
2. **`promisify(fn)`** — convert a callback-style function into a promise-returning one.
3. **`retryAsync(fn, { times, delay, backoff })`** — with exponential backoff and a final re-throw.
4. **`mapLimit(items, limit, asyncFn)`** — run async work with bounded concurrency; preserve input order.
5. **Timeout + abort** — wrap `fetch` with both `Promise.race` and `AbortSignal.timeout`; compare behaviour.
6. **Cache with TTL** — async memoiser that dedupes in-flight calls and expires entries.
7. **Async iterator** — paginate an API with `async function*` and consume it with `for await`.
8. **Reactive object** — use `Proxy` to log every read/write and trigger a re-render callback.
9. **Leak hunt** — write code that leaks via an uncleaned `setInterval` and listener, then fix it and prove the fix.
10. **Benchmark** — compare `array.includes` vs `Set.has` on 100k lookups; report the numbers.
11. **Test suite** — test your level-04 `EventEmitter` with `node:test` or `vitest`: sync, async, error, and once cases.
12. **Stretch** — implement `Promise` from scratch (`then`, chaining, `catch`, `finally`, `resolve`, `all`) and pass your own test suite.
