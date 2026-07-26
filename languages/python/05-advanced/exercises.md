# Exercises — Python 05 Advanced

1. **`@memoize`** — write your own cache decorator; compare with `functools.lru_cache` on `fib(35)`.
2. **`@log_calls`** — decorator printing arguments and return value; make it work on methods too.
3. **Rate limiter** — decorator factory `@rate_limit(calls=2, per_seconds=1)`.
4. **Log pipeline** — chain generators: read file → filter ERROR lines → parse → count by hour. Never build a full list.
5. **`take(n, iterable)` and `chunk(iterable, size)`** — implement both as generators, then compare with `itertools`.
6. **Context manager** — `atomic_write(path)` that writes to a temp file and renames on success only.
7. **Typed generic** — a `Result[T, E]` class with `ok`/`err` constructors and `unwrap()`.
8. **Threads vs processes** — time a CPU-bound task (counting primes) with `ThreadPoolExecutor` vs `ProcessPoolExecutor`; explain the result.
9. **Async scraper** — fetch 20 URLs concurrently with `asyncio` + `aiohttp`, with a semaphore limiting concurrency to 5.
10. **Test suite** — write `pytest` tests for your level-04 `BankAccount`, including parametrised cases, a fixture, and an exception test. Aim for full branch coverage.
11. **Profile and optimise** — profile a slow word-count script with `cProfile`, make it 5× faster, and document what changed.
12. **Stretch: publishable package** — add `pyproject.toml`, a CLI entry point, `ruff` + `mypy` config, and a GitHub Actions workflow running tests on 3.10–3.13.

## Self-check

- Why doesn't threading speed up CPU-bound Python code?
- When is a generator strictly better than a list?
- What does `functools.wraps` fix?
- Give one case where `asyncio` is the wrong choice.
