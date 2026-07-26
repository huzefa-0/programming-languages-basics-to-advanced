# 02 — Narrowing, Guards, Discriminated Unions

## Narrowing

The compiler tracks control flow to shrink types automatically.

```ts
function describe(value: string | number | null) {
  if (value === null) return "nothing";        // narrowed out
  if (typeof value === "number") return value.toFixed(2);  // number here
  return value.toUpperCase();                  // string here
}
```

Narrowing tools: `typeof`, `instanceof`, `in`, truthiness, equality, `Array.isArray`, and discriminant checks.

## User-defined type guards

```ts
function isString(v: unknown): v is string {
  return typeof v === "string";
}

function assertDefined<T>(v: T | null | undefined, msg = "missing"): asserts v is T {
  if (v == null) throw new Error(msg);
}
```

`v is T` narrows in a condition; `asserts v is T` narrows for the rest of the block.

## Discriminated unions — the most valuable TS pattern

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function handle(r: Result<number>) {
  if (r.ok) return r.value;    // value exists only here
  console.error(r.error);      // error exists only here
  return 0;
}
```

A shared literal field (`ok`, `kind`, `type`) lets the compiler pick the right member — impossible states become unrepresentable.

## Exhaustiveness with `never`

```ts
function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.r ** 2;
    case "rect": return s.w * s.h;
    default: {
      const _exhaustive: never = s;   // compile error if a shape is added
      return _exhaustive;
    }
  }
}
```

## Function types

```ts
type Handler = (event: string, payload?: unknown) => void;
type Comparator<T> = (a: T, b: T) => number;

// overloads
function parse(input: string): number;
function parse(input: string[]): number[];
function parse(input: string | string[]): number | number[] {
  return Array.isArray(input) ? input.map(Number) : Number(input);
}
```

**Contravariance:** a handler accepting a wider parameter type is assignable where a narrower one is expected.

## Errors are `unknown` in `catch`

```ts
try { risky(); }
catch (err) {
  if (err instanceof Error) console.error(err.message);
  else console.error("unknown throw:", err);
}
```

Next: [exercises.md](exercises.md)
