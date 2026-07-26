"""Level 02 - control flow, functions, and error handling."""

from typing import Iterable


def classify(n: int) -> str:
    """Classify a number using if/elif/else."""
    if n < 0:
        return "negative"
    if n == 0:
        return "zero"
    if n % 2 == 0:
        return "positive even"
    return "positive odd"


def fizzbuzz(limit: int) -> list[str]:
    """Classic loop + conditional exercise."""
    out = []
    for i in range(1, limit + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(str(i))
    return out


def is_prime(n: int) -> bool:
    """Demonstrates early return and for/else."""
    if n < 2:
        return False
    for divisor in range(2, int(n**0.5) + 1):
        if n % divisor == 0:
            return False
    else:
        return True


def average(values: Iterable[float]) -> float:
    """Raises a clear error instead of letting ZeroDivisionError leak."""
    values = list(values)
    if not values:
        raise ValueError("average() needs at least one value")
    return sum(values) / len(values)


def safe_divide(a: float, b: float) -> float | None:
    """try/except/else/finally in one place."""
    try:
        result = a / b
    except ZeroDivisionError:
        print("  cannot divide by zero")
        return None
    else:
        return result
    finally:
        print(f"  attempted {a} / {b}")


def describe(command: str) -> str:
    """Structural pattern matching (Python 3.10+)."""
    match command.split():
        case ["quit" | "exit"]:
            return "stopping"
        case ["move", direction]:
            return f"moving {direction}"
        case ["add", a, b] if a.isdigit() and b.isdigit():
            return f"sum is {int(a) + int(b)}"
        case _:
            return "unknown command"


def tally(*numbers: int, label: str = "total") -> str:
    """*args plus keyword-only style argument."""
    return f"{label}: {sum(numbers)}"


if __name__ == "__main__":
    for n in (-3, 0, 4, 7):
        print(n, "->", classify(n))

    print(" ".join(fizzbuzz(15)))
    print("primes under 30:", [n for n in range(30) if is_prime(n)])
    print("average:", average([2, 4, 9]))

    safe_divide(10, 2)
    safe_divide(10, 0)

    for cmd in ("move north", "add 2 3", "quit", "dance"):
        print(f"{cmd!r} -> {describe(cmd)}")

    print(tally(1, 2, 3, label="scores"))

    try:
        average([])
    except ValueError as exc:
        print("caught:", exc)
