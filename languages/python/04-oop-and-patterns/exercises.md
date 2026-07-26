# Exercises — Python 04 OOP

1. **BankAccount** — `deposit`, `withdraw`, `balance` property, custom `InsufficientFunds` exception, `__repr__`.
2. **Vector2D** — implement `__add__`, `__sub__`, `__mul__` (scalar), `__eq__`, `__abs__`, `__repr__`.
3. **Library system** — `Book`, `Member`, `Library` classes with borrow/return, using composition.
4. **Shape hierarchy** — extend the example with `Triangle` and `RegularPolygon`; sort all shapes by area.
5. **Dataclass conversion** — rewrite a hand-written class as a `@dataclass` and compare the code volume.
6. **Stack and Queue** — implement both with `__len__`, `__bool__`, `__iter__`, and raise on empty pop.
7. **Strategy pattern** — a `Sorter` that accepts different comparison functions; sort employees by name, age, salary.
8. **Observer pattern** — an `EventBus` with `subscribe(event, handler)` and `publish(event, payload)`.
9. **Protocol duck typing** — write `render(items)` that accepts anything with a `.to_html()` method.
10. **Custom context manager** — a `Timer` class using `__enter__`/`__exit__` that prints elapsed time.
11. **Stretch: refactor for SOLID** — take exercise 3 and split persistence out of `Library` into an injected `Storage` dependency.

## Self-check

- When do you choose composition over inheritance?
- Difference between `__str__` and `__repr__`?
- Why does `@dataclass(frozen=True)` make an object hashable?
