# Python Track

Python is a high-level, dynamically typed, interpreted language known for readability. It is the best first language for most people and dominant in data science, AI, automation, and scripting.

## Setup

```bash
python3 --version          # need 3.10+
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install pytest ruff
```

## Run any example

```bash
python3 languages/python/01-basics/hello.py
```

## Track contents

| Level | Topics |
|---|---|
| [01-basics](01-basics) | variables, types, strings, input/output, operators |
| [02-control-flow](02-control-flow) | if/elif/else, loops, functions, exceptions |
| [03-data-structures](03-data-structures) | list, tuple, dict, set, comprehensions, files, modules |
| [04-oop-and-patterns](04-oop-and-patterns) | classes, inheritance, dunder methods, dataclasses, patterns |
| [05-advanced](05-advanced) | decorators, generators, context managers, typing, async, testing, performance |

Finish with [mini-project.md](mini-project.md).

## Style

Follow **PEP 8**: 4-space indent, `snake_case` for functions/variables, `PascalCase` for classes, `UPPER_CASE` for constants. Run `ruff check .` to lint.
