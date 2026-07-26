# Contributing

Contributions that improve clarity, fix errors, or add languages are welcome.

## Adding a new language track

Create `languages/<language>/` with this exact structure:

```
languages/<language>/
  README.md              # setup, how to run code, track overview
  01-basics/README.md + examples
  02-control-flow/README.md + examples
  03-data-structures/README.md + examples
  04-oop-and-patterns/README.md + examples
  05-advanced/README.md + examples
  exercises.md           # or exercises.md per level
  mini-project.md
```

## Content rules

1. **Every example must run** as-is with the standard toolchain — no pseudo-code.
2. Keep examples short and focused on one concept.
3. Comment the *why*, not the *what*.
4. Explain concepts before showing code, not after.
5. Prefer standard library over third-party dependencies.
6. Use the idiomatic style of the language (PEP 8, gofmt, rustfmt, etc.).

## Workflow

```bash
git checkout -b add/<language>-<level>
# make changes
git commit -m "Add <language> <level> notes and examples"
git push origin add/<language>-<level>
```

Then open a pull request describing what you added and how you verified the examples run.
