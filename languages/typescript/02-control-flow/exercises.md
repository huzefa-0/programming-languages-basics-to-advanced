# Exercises — TypeScript 02 Narrowing

1. **`Result<T, E>` toolkit** — add `map`, `mapErr`, `unwrapOr`, and `isOk` helpers with correct narrowing.
2. **Payment union** — model `card`, `bank`, `cash` payments as a discriminated union; write an exhaustive `fee()` function.
3. **Guard library** — `isString`, `isNumber`, `isRecord`, `isArrayOf(guard)` composable guards.
4. **API validator** — validate an `unknown` JSON payload into a typed `User` and return a `Result`.
5. **Assertion function** — `assertNever(value)` and use it in three exhaustive switches.
6. **State machine** — model a traffic light with a union and a `next(state)` transition function the compiler verifies.
7. **Overloads** — type a `first()` function that returns `T` for a non-empty tuple and `T | undefined` for an array.
8. **Narrowing quiz** — explain why `if (obj.a && obj.a.b)` narrows but `if (getA() && getA().b)` does not.
9. **Error hierarchy** — typed `AppError` subclasses handled with `instanceof` narrowing in one `catch`.
10. **Stretch** — remove every `any` and every non-null `!` from a messy file, replacing them with guards; document each fix.
