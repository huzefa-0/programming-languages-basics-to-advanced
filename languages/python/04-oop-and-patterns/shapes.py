"""Level 04 - OOP: ABCs, dunder methods, dataclasses, and patterns."""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from math import pi
from typing import Callable, Protocol


class Shape(ABC):
    """Abstract base: defines the contract every shape must satisfy."""

    @abstractmethod
    def area(self) -> float: ...

    @abstractmethod
    def perimeter(self) -> float: ...

    def describe(self) -> str:
        """Template method -- shared behaviour built on abstract hooks."""
        return f"{type(self).__name__}: area={self.area():.2f} perimeter={self.perimeter():.2f}"


@dataclass(frozen=True)
class Circle(Shape):
    radius: float

    def area(self) -> float:
        return pi * self.radius**2

    def perimeter(self) -> float:
        return 2 * pi * self.radius


@dataclass(frozen=True)
class Rectangle(Shape):
    width: float
    height: float

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

    @classmethod
    def square(cls, side: float) -> "Rectangle":
        """Factory / alternative constructor."""
        return cls(side, side)


@dataclass
class Drawing:
    """Composition: a Drawing HAS shapes, it is not a Shape."""

    name: str
    shapes: list[Shape] = field(default_factory=list)
    _observers: list[Callable[[Shape], None]] = field(default_factory=list, repr=False)

    def add(self, shape: Shape) -> "Drawing":
        self.shapes.append(shape)
        for notify in self._observers:      # observer pattern
            notify(shape)
        return self                          # fluent interface

    def on_add(self, callback: Callable[[Shape], None]) -> None:
        self._observers.append(callback)

    # dunder methods make the object behave like a native container
    def __len__(self) -> int:
        return len(self.shapes)

    def __iter__(self):
        return iter(self.shapes)

    def __getitem__(self, index: int) -> Shape:
        return self.shapes[index]

    @property
    def total_area(self) -> float:
        return sum(s.area() for s in self.shapes)


class SupportsArea(Protocol):
    """Structural typing: anything with .area() satisfies this."""

    def area(self) -> float: ...


def largest(items: list[SupportsArea]) -> SupportsArea:
    return max(items, key=lambda item: item.area())


if __name__ == "__main__":
    drawing = Drawing("demo")
    drawing.on_add(lambda s: print(f"  [event] added {type(s).__name__}"))

    drawing.add(Circle(2)).add(Rectangle(3, 4)).add(Rectangle.square(5))

    for shape in drawing:                    # works thanks to __iter__
        print(shape.describe())

    print(f"{len(drawing)} shapes, total area {drawing.total_area:.2f}")
    print("largest:", largest(list(drawing)))

    # frozen dataclasses give value equality and hashability for free
    print("equal circles?", Circle(2) == Circle(2))
    print("usable in a set?", len({Circle(2), Circle(2), Circle(3)}))

    # sorting by a computed key -- strategy passed as a function
    for shape in sorted(drawing, key=Shape.area, reverse=True):
        print("sorted:", shape)
