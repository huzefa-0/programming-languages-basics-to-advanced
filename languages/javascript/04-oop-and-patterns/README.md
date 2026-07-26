# 04 — Objects, Prototypes, Classes, Patterns

## Prototypes: the real model

Every object has a hidden link (`[[Prototype]]`) to another object. Property lookup walks that chain. `class` is syntax sugar over this.

```js
const animal = { speak() { return `${this.name} makes a noise`; } };
const dog = Object.create(animal);
dog.name = "Rex";
dog.speak();                      // found on the prototype
Object.getPrototypeOf(dog) === animal;   // true
```

## Classes

```js
class Animal {
  #id;                        // truly private field
  static count = 0;           // static (class-level) field

  constructor(name) {
    this.name = name;
    this.#id = ++Animal.count;
  }

  get id() { return this.#id; }          // getter
  speak() { return `${this.name} makes a noise`; }
  static create(name) { return new this(name); }   // static factory
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);              // must call before using `this`
    this.breed = breed;
  }
  speak() { return `${super.speak()} -- a bark`; }  // override + super call
}
```

## `this` — the five rules

1. Method call `obj.fn()` → `this` is `obj`.
2. Plain call `fn()` → `undefined` in strict mode/modules.
3. `new Fn()` → the new instance.
4. `fn.call/apply/bind(ctx)` → explicitly `ctx`.
5. Arrow function → lexical `this` from where it was defined (cannot be rebound).

Callback losing `this` is the #1 JS bug. Fix with a class field arrow: `handle = () => {...}`.

## Immutability

```js
Object.freeze(obj);                 // shallow
const next = { ...state, count: state.count + 1 };
const nextList = [...list, item];
```

Prefer producing new values over mutating shared state — this is what React, Redux, and functional pipelines rely on.

## Common patterns

| Pattern | JS form |
|---|---|
| Module | ES module or closure/IIFE |
| Factory | function returning an object literal |
| Singleton | exported module instance |
| Observer | `EventTarget` or a `Map` of listener sets |
| Strategy | pass a function |
| Decorator | higher-order function wrapping another |
| Builder | chainable methods returning `this` |
| Proxy | `new Proxy(target, handler)` |
| Mixin | `Object.assign(Class.prototype, mixin)` |

## Composition over class inheritance

JS favours **object composition** and functions. Reach for classes when you have identity + state + behaviour; reach for plain functions and objects otherwise.

Next: [exercises.md](exercises.md)
