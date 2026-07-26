# Exercises — JavaScript 04 OOP & Patterns

1. **`Temperature` class** — private `#celsius`, getters for C/F, static `fromF()`, `toString()`.
2. **Shape hierarchy** — abstract-ish `Shape` (throw from base `area()`), plus `Circle`, `Rect`, `Triangle`; sort by area.
3. **Prototype archaeology** — recreate exercise 2 using only `Object.create` and constructor functions, no `class`.
4. **Fix `this` three ways** — pass a method as a `setTimeout` callback and repair it with an arrow field, `bind`, and a wrapper.
5. **`EventEmitter`** — `on`, `once`, `off`, `emit`, with listener error isolation.
6. **Query builder** — extend the example with `select()`, `orderBy()`, and parameter binding.
7. **Mixins** — write `Serializable` and `Comparable` mixins and apply them to one class.
8. **Proxy validation** — wrap an object in a `Proxy` that rejects unknown properties and enforces types.
9. **Immutable store** — a tiny Redux-like `createStore(reducer, initial)` with `dispatch`, `getState`, `subscribe`.
10. **Composition refactor** — take a 3-level inheritance chain and rewrite it with composed behaviour functions. Note what got simpler.
11. **Stretch** — implement `myNew(Constructor, ...args)` that replicates the `new` operator, and `myBind`.
