# Exercises — JavaScript 02 Control Flow

1. **FizzBuzz** — 1–100, one line per value, using a single loop.
2. **`range(start, stop, step)`** — return an array; support negative steps.
3. **`once(fn)`** — closure that lets `fn` run only the first time; later calls return the cached result.
4. **`debounce(fn, ms)`** and **`throttle(fn, ms)`** — implement both with closures and `setTimeout`.
5. **Counter factory** — prove that two counters from the same factory have independent state.
6. **`curry(fn)`** — generic currying for any arity: `curry(add3)(1)(2)(3) === 6`.
7. **Retry with backoff** — `retry(fn, times)` that catches errors and waits longer between attempts.
8. **Custom error hierarchy** — `AppError` → `NotFoundError`, `ValidationError`; handle them differently in one `catch`.
9. **Recursive flatten** — flatten an arbitrarily nested array without `Array.prototype.flat`.
10. **`this` quiz** — write a class method that breaks when passed as a callback, then fix it three ways (arrow property, `bind`, wrapper).
11. **Stretch** — implement your own `myMap`, `myFilter`, and `myReduce` on `Array.prototype`.
