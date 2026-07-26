# Exercises — TypeScript 01 Basics

1. **Type a function** — annotate `formatPrice(amount, currency)` and make `currency` a union of `"USD" | "EUR" | "INR"`.
2. **Fix the `any`s** — take a small untyped JS file and type it fully with `strict` on, no `any`.
3. **Tuple return** — `divide(a, b): [quotient: number, remainder: number]`.
4. **Optional + default** — `createUser({ name, role = "member", email? })` with a precise object type.
5. **`unknown` boundary** — write `safeParse(text: string): unknown` plus a guard `isConfig` and use it.
6. **`as const` derivation** — derive a union type from a config array and build a `Record` keyed by it.
7. **Readonly** — make a settings object deeply readonly and observe the errors when mutating.
8. **Exhaustive switch** — write a `never`-checked switch over 4 statuses, then add a 5th and watch it fail to compile.
9. **`noUncheckedIndexedAccess`** — enable it and fix every resulting error in your own code.
10. **Stretch** — explain in a short note why `as` assertions are not validation, with an example that crashes at runtime despite compiling.
