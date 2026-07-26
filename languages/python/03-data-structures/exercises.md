# Exercises — Python 03 Data Structures

1. **Unique preserving order** — dedupe a list without changing order. *Hint: `dict.fromkeys`.*
2. **Word frequency** — read a text file, print the 10 most common words, ignoring case and punctuation.
3. **Invert a dict** — swap keys and values; handle duplicate values by grouping into lists.
4. **Two-sum** — given a list and a target, return the two indices summing to the target in O(n) using a dict.
5. **Matrix transpose** — transpose a list of lists with a comprehension and with `zip(*matrix)`.
6. **CSV to JSON** — read a CSV of people, write a JSON array of objects using the `csv` and `json` modules.
7. **Set operations report** — given two lists of student names, print who is in both, only in A, and only in B.
8. **Nested access** — write `deep_get(data, "a.b.c", default=None)` for nested dicts.
9. **Group by key** — group a list of dicts by a chosen field using `defaultdict` and then `itertools.groupby`.
10. **Line stats CLI** — script that takes a filename argument and prints line, word, and character counts.
11. **Stretch: build a package** — create `textkit/` with `__init__.py`, `counting.py`, `cleaning.py` and import it from a script.

## Self-check

- Why is `dict`/`set` lookup faster than `list` lookup?
- What is the difference between shallow and deep copy?
- Why must you use `with` when opening files?
