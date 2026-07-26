# 04 — OOP and Design Patterns

## Classes and instances

```python
class Account:
    interest_rate = 0.02              # class attribute (shared)

    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self.owner = owner            # instance attributes
        self._balance = balance       # leading _ = internal by convention

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self._balance += amount

    @property
    def balance(self) -> float:       # computed, read-only attribute
        return self._balance

    def __repr__(self) -> str:
        return f"Account({self.owner!r}, {self._balance})"
```

## The four pillars

- **Encapsulation** — bundle data with behaviour; expose a small API (`_private` by convention, `__name` triggers name mangling).
- **Abstraction** — hide the how (use `abc.ABC` + `@abstractmethod` to define required behaviour).
- **Inheritance** — reuse and specialise; call `super().__init__(...)`.
- **Polymorphism** — different classes, same interface. Python favours **duck typing**: if it has the method, it works.

## Method types

```python
class Temp:
    def celsius(self): ...                 # instance method -> self

    @classmethod
    def from_fahrenheit(cls, f):           # alternative constructor -> cls
        return cls((f - 32) * 5 / 9)

    @staticmethod
    def is_valid(value):                   # plain function in a namespace
        return value > -273.15
```

## Dunder (magic) methods

`__init__`, `__repr__` (debug), `__str__` (user), `__eq__`, `__lt__`, `__len__`, `__iter__`, `__getitem__`, `__contains__`, `__call__`, `__enter__`/`__exit__`, `__add__`.

Implementing `__eq__` + `__hash__` makes objects usable in sets and dict keys.

## Dataclasses (prefer for plain data)

```python
from dataclasses import dataclass, field

@dataclass(frozen=True, order=True)
class Point:
    x: float
    y: float
    tags: list[str] = field(default_factory=list)   # never a mutable default
```

You get `__init__`, `__repr__`, `__eq__` for free. `frozen=True` makes it immutable and hashable.

## Composition over inheritance

Deep inheritance trees are fragile. Prefer holding a collaborator object (`self.storage = Storage()`) over inheriting from it. Inherit only for genuine *is-a* relationships.

## Useful patterns in Python

| Pattern | Pythonic form |
|---|---|
| Strategy | pass a function or callable |
| Factory | `@classmethod` alternative constructors |
| Singleton | a module (modules are already singletons) |
| Observer | list of callbacks |
| Decorator | `@decorator` functions |
| Iterator | `__iter__` / generators |
| Adapter | duck-typed wrapper class |
| Template method | ABC with abstract hook methods |

## SOLID in one line each

- **S**ingle responsibility — one reason to change per class.
- **O**pen/closed — extend without editing existing code.
- **L**iskov — subclasses must be usable as the parent.
- **I**nterface segregation — many small protocols beat one fat one.
- **D**ependency inversion — depend on abstractions, inject dependencies.

Next: [exercises.md](exercises.md)
