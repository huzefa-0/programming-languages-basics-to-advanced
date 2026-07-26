"""Level 05 - decorators, generators, context managers, typing, async."""

import asyncio
import functools
import time
from contextlib import contextmanager
from itertools import islice
from typing import Callable, Generic, Iterator, TypeVar

T = TypeVar("T")


# ---------- decorators ----------
def timed(fn: Callable[..., T]) -> Callable[..., T]:
    """Report how long a call took, preserving the wrapped function's identity."""

    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return fn(*args, **kwargs)
        finally:
            print(f"  [timed] {fn.__name__}: {time.perf_counter() - start:.5f}s")

    return wrapper


def retry(times: int = 3):
    """Decorator factory: a decorator that takes arguments."""

    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            last = None
            for attempt in range(1, times + 1):
                try:
                    return fn(*args, **kwargs)
                except Exception as exc:  # noqa: BLE001 - demo only
                    last = exc
                    print(f"  [retry] attempt {attempt} failed: {exc}")
            raise last

        return wrapper

    return decorator


@functools.lru_cache(maxsize=None)
def fib(n: int) -> int:
    """Memoised recursion: O(n) instead of O(2^n)."""
    return n if n < 2 else fib(n - 1) + fib(n - 2)


# ---------- generators ----------
def integers() -> Iterator[int]:
    """Infinite lazy sequence -- safe because nothing is materialised."""
    n = 0
    while True:
        yield n
        n += 1


def primes() -> Iterator[int]:
    found: list[int] = []
    for n in islice(integers(), 2, None):
        if all(n % p for p in found if p * p <= n):
            found.append(n)
            yield n


# ---------- context manager ----------
@contextmanager
def stopwatch(label: str):
    start = time.perf_counter()
    try:
        yield
    finally:
        print(f"  [stopwatch] {label}: {time.perf_counter() - start:.5f}s")


# ---------- generics ----------
class Stack(Generic[T]):
    """Type-safe container using a TypeVar and __slots__ for compactness."""

    __slots__ = ("_items",)

    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        if not self._items:
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def __len__(self) -> int:
        return len(self._items)


# ---------- async ----------
async def fetch(name: str, delay: float) -> str:
    await asyncio.sleep(delay)          # simulated I/O wait
    return f"{name} done in {delay}s"


async def gather_all() -> list[str]:
    """Runs concurrently: total time ~= slowest task, not the sum."""
    return await asyncio.gather(
        fetch("alpha", 0.30),
        fetch("beta", 0.20),
        fetch("gamma", 0.10),
    )


@retry(times=3)
def flaky(state={"calls": 0}):  # noqa: B006 - intentional demo of shared state
    state["calls"] += 1
    if state["calls"] < 3:
        raise RuntimeError("temporary failure")
    return "succeeded on attempt 3"


@timed
def sum_squares(limit: int) -> int:
    return sum(n * n for n in range(limit))   # generator: no big list built


if __name__ == "__main__":
    print("fib(80) =", fib(80))
    print("first 10 primes:", list(islice(primes(), 10)))

    print(sum_squares(200_000))
    print(flaky())

    with stopwatch("async gather"):
        for line in asyncio.run(gather_all()):
            print("  ", line)

    stack: Stack[str] = Stack()
    stack.push("a")
    stack.push("b")
    print("stack pop:", stack.pop(), "| size:", len(stack))
