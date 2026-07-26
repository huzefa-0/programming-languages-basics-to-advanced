# 03 — Data Structures, Files, and Modules

## The four core collections

| Type | Syntax | Ordered | Mutable | Duplicates | Lookup |
|---|---|---|---|---|---|
| `list` | `[1, 2, 3]` | yes | yes | yes | O(n) |
| `tuple` | `(1, 2, 3)` | yes | **no** | yes | O(n) |
| `dict` | `{"a": 1}` | insertion | yes | keys unique | **O(1)** |
| `set` | `{1, 2, 3}` | no | yes | **no** | **O(1)** |

**Choosing:** need order and change → `list`. Fixed record → `tuple`. Lookup by key → `dict`. Membership/dedupe → `set`.

## Lists

```python
xs = [3, 1, 2]
xs.append(4); xs.extend([5, 6]); xs.insert(0, 0)
xs.pop(); xs.remove(1)
xs.sort(reverse=True)            # in place
ys = sorted(xs, key=abs)         # new list
xs[1:3], xs[::-1], xs[::2]       # slicing
```

Copying: `xs[:]` or `list(xs)` is a **shallow** copy; use `copy.deepcopy` for nested structures.

## Dicts

```python
user = {"name": "Ada", "age": 36}
user["email"] = "a@b.c"
user.get("phone", "unknown")      # no KeyError
user.setdefault("tags", []).append("admin")
for key, value in user.items():
    ...
merged = {**defaults, **overrides}
```

Useful: `collections.Counter`, `defaultdict`, `dict.pop(key, None)`.

## Sets

```python
a, b = {1, 2, 3}, {3, 4}
a | b   # union         {1,2,3,4}
a & b   # intersection  {3}
a - b   # difference    {1,2}
a ^ b   # symmetric     {1,2,4}
```

## Comprehensions

```python
squares = [n * n for n in range(10)]
evens = [n for n in range(20) if n % 2 == 0]
by_len = {w: len(w) for w in words}
unique_initials = {w[0] for w in words}
flat = [c for word in words for c in word]     # nested
```

Rule: if a comprehension needs more than one `if` plus one `for`, write a loop instead.

## Files

```python
from pathlib import Path

Path("out.txt").write_text("hello\n", encoding="utf-8")
text = Path("out.txt").read_text(encoding="utf-8")

with open("data.csv", newline="", encoding="utf-8") as f:
    for line in f:            # streams line by line, memory friendly
        print(line.rstrip())
```

Always use `with` — it closes the file even on exception. Use the `csv` and `json` modules rather than hand-parsing.

## Modules and packages

```python
import math
from collections import Counter
from . import helpers          # relative import inside a package
```

- A module is a `.py` file; a package is a folder (optionally with `__init__.py`).
- `if __name__ == "__main__":` guards code that should only run when executed directly.
- Avoid `from module import *`.

Next: [exercises.md](exercises.md)
