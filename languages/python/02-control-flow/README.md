# 02 — Control Flow and Functions

## Conditionals

```python
score = 87
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"

# conditional expression (ternary)
status = "pass" if score >= 60 else "fail"
```

Truthiness: empty containers, `0`, `""`, `None` are falsy. Prefer `if items:` over `if len(items) > 0:`.

## Loops

```python
for i in range(5):          # 0..4
    print(i)

for i in range(2, 11, 2):   # start, stop, step
    print(i)

for index, item in enumerate(["a", "b"], start=1):
    print(index, item)

while balance > 0:
    balance -= 10
```

Control: `break` exits, `continue` skips, and `else` on a loop runs only if no `break` happened.

## Functions

```python
def greet(name: str, greeting: str = "Hello") -> str:
    """Return a greeting. Type hints are optional but recommended."""
    return f"{greeting}, {name}!"

greet("Ada")                       # positional
greet(name="Ada", greeting="Hi")   # keyword

def total(*numbers, **options):    # *args, **kwargs
    return sum(numbers)
```

**Mutable default trap:** never write `def f(items=[])`. Use `def f(items=None)` then `items = items or []`.

## Scope

Names resolve **L**ocal → **E**nclosing → **G**lobal → **B**uilt-in (LEGB). Avoid `global`; return values instead.

## Exceptions

```python
try:
    value = int(user_input)
except ValueError as exc:
    print(f"Not a number: {exc}")
except (TypeError, KeyError):
    print("Something else went wrong")
else:
    print("Ran only if no exception")
finally:
    print("Always runs -- cleanup")

if amount < 0:
    raise ValueError("amount must be non-negative")
```

Catch specific exceptions. A bare `except:` hides bugs.

## `match` (Python 3.10+)

```python
match command.split():
    case ["quit"]:
        return
    case ["move", direction]:
        move(direction)
    case _:
        print("unknown command")
```

Next: [exercises.md](exercises.md)
