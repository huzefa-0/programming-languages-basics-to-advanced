# 05 — Advanced Python

## Decorators

A decorator is a function that takes a function and returns a replacement.

```python
import functools, time

def timed(fn):
    @functools.wraps(fn)                # preserves __name__ and docstring
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return fn(*args, **kwargs)
        finally:
            print(f"{fn.__name__} took {time.perf_counter() - start:.4f}s")
    return wrapper
```

Stdlib decorators worth knowing: `functools.lru_cache`, `cached_property`, `singledispatch`, `contextlib.contextmanager`.

## Generators and iterators

```python
def read_large(path):
    with open(path) as f:
        for line in f:          # lazy: one line in memory at a time
            yield line.rstrip()

squares = (n * n for n in range(10**6))   # generator expression, no list built
```

Generators are the main tool for **memory-efficient pipelines**. `itertools` (`chain`, `islice`, `groupby`, `product`, `accumulate`) composes them.

## Context managers

```python
from contextlib import contextmanager

@contextmanager
def temp_cwd(path):
    old = os.getcwd()
    os.chdir(path)
    try:
        yield path
    finally:
        os.chdir(old)     # guaranteed cleanup
```

## Type hints (static typing)

```python
from typing import Optional, Iterable, TypeVar, Generic

T = TypeVar("T")

class Box(Generic[T]):
    def __init__(self, item: T) -> None:
        self.item = item

def first(items: Iterable[T]) -> Optional[T]:
    for item in items:
        return item
    return None
```

Hints are not enforced at runtime — run `mypy` or `pyright` to check them.

## Concurrency: pick the right model

| Workload | Tool | Why |
|---|---|---|
| I/O bound, many waits | `asyncio` | thousands of tasks, one thread |
| I/O bound, blocking libs | `ThreadPoolExecutor` | threads release the GIL while waiting |
| CPU bound | `ProcessPoolExecutor` / `multiprocessing` | bypasses the GIL with real processes |

The **GIL** allows only one thread to execute Python bytecode at a time — so threads never speed up pure-Python CPU work.

```python
import asyncio

async def fetch(n):
    await asyncio.sleep(0.1)
    return n * 2

async def main():
    return await asyncio.gather(*(fetch(i) for i in range(5)))

asyncio.run(main())
```

## Testing

```python
# test_math.py -- run with: pytest
import pytest
from mymod import divide

@pytest.mark.parametrize("a,b,expected", [(6, 3, 2), (5, 2, 2.5)])
def test_divide(a, b, expected):
    assert divide(a, b) == expected

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(1, 0)
```

Use fixtures for setup, `monkeypatch`/`unittest.mock` for isolation, and aim to test behaviour, not implementation.

## Performance

1. **Measure first** — `timeit`, `cProfile`, `tracemalloc`. Never guess.
2. Prefer built-ins and comprehensions over manual loops (they run in C).
3. Use `set`/`dict` for membership tests.
4. Use generators to avoid materialising big lists.
5. Use `__slots__` to shrink instances of small, numerous classes.
6. Vectorise with NumPy, or drop to C/Rust extensions, only after profiling.

## Packaging and tooling

- `pyproject.toml` is the modern standard; build with `python -m build`.
- Isolate dependencies with `venv` (or `uv`/`poetry`).
- Lint and format with `ruff`; type check with `mypy`; test with `pytest`.
- Pin dependencies for reproducible installs.

Next: [exercises.md](exercises.md)
