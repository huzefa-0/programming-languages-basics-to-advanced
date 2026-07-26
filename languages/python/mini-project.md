# Python Mini Project — Expense Tracker CLI

Build a command-line expense tracker that exercises every level of the track.

## Requirements

### Core (levels 01–03)
- `add "Coffee" 4.50 food` — add an expense with description, amount, category, and today's date
- `list [--category food] [--month 2026-07]` — list expenses in an aligned table
- `summary` — total spend, spend per category, and average per day
- Persist to `expenses.json` using `pathlib` + `json`
- Validate all input; never crash on bad input

### Structure (level 04)
- `Expense` as a `@dataclass(frozen=True)`
- `ExpenseRepository` handling load/save (injected, not hard-coded)
- `ExpenseService` holding the business logic
- A `Storage` protocol so you can swap JSON for CSV or SQLite without touching the service

### Advanced (level 05)
- `argparse` subcommands for the CLI
- Type hints throughout; `mypy --strict` clean
- `@timed` decorator on the report command
- Generator-based reading so a 100k-row file doesn't blow memory
- `pytest` suite with a `tmp_path` fixture, parametrised cases, and ≥90% coverage
- `ruff` clean

## Suggested layout

```
expense-tracker/
  pyproject.toml
  src/tracker/
    __init__.py
    models.py       # Expense dataclass
    storage.py      # Storage protocol + JsonStorage, CsvStorage
    service.py      # ExpenseService
    reports.py      # summary/aggregation logic
    cli.py          # argparse entry point
  tests/
    test_models.py
    test_service.py
    test_cli.py
```

## Stretch goals

- SQLite backend using the `sqlite3` module
- Monthly budget with warnings at 80% and 100%
- Export a chart with `matplotlib`
- Currency conversion from a live API using `asyncio` + caching
- Package it so `pip install -e .` gives you a global `expenses` command

## Done checklist

- [ ] All commands work and are documented in a README
- [ ] No function longer than ~20 lines
- [ ] All errors produce helpful messages, no tracebacks for user mistakes
- [ ] Tests, lint, and type checks pass in CI
