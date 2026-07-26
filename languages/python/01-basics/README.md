# 01 — Python Basics

## Variables and dynamic typing

Python infers types; you never declare them. Names are just labels pointing at objects.

```python
name = "Ada"      # str
age = 36           # int
height = 1.7       # float
is_active = True   # bool
nothing = None     # NoneType
```

`type(x)` tells you the type. Variables can be rebound to any type — but *don't*; keep one type per name.

## Core built-in types

| Type | Example | Mutable? |
|---|---|---|
| `int` | `42`, `-7`, `10_000` | immutable |
| `float` | `3.14`, `1e-3` | immutable |
| `str` | `"hi"`, `'hi'` | immutable |
| `bool` | `True`, `False` | immutable |
| `list` | `[1, 2, 3]` | mutable |
| `dict` | `{"a": 1}` | mutable |

## Operators

```python
7 / 2    # 3.5   true division
7 // 2   # 3     floor division
7 % 2    # 1     remainder
2 ** 10  # 1024  power
```

Comparison: `== != < <= > >=`. Logic: `and or not`. Identity: `is` (same object, use only with `None`).

## Strings

```python
s = "Python"
len(s)            # 6
s.upper()         # 'PYTHON'
s[0], s[-1]       # 'P', 'n'
s[1:4]            # 'yth'  (slicing: start inclusive, stop exclusive)
f"{s} has {len(s)} chars"   # f-string -- always prefer these
```

Strings are immutable: every "modification" returns a new string.

## Input and output

```python
name = input("Your name: ")     # always returns str
age = int(input("Your age: "))  # convert explicitly
print(f"Hi {name}, next year you are {age + 1}")
```

## Comments and docstrings

```python
# single line comment

def area(r):
    """Return the area of a circle with radius r."""
    return 3.14159 * r ** 2
```

## Common beginner mistakes

- Using `=` (assignment) where `==` (comparison) is meant.
- Forgetting `input()` returns a string → `"5" + 1` raises `TypeError`.
- Inconsistent indentation — Python uses indentation as syntax.
- Comparing floats with `==` (use `math.isclose`).

Next: [exercises.md](exercises.md)
