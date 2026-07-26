# 01 — TypeScript Basics

## Annotate only what inference can't figure out

```ts
let count = 0;              // inferred number -- don't write `: number`
const name: string = "Ada"; // redundant
function add(a: number, b: number): number { return a + b; }  // params DO need types
```

Rule: annotate function parameters, public return types, and empty containers. Let inference do the rest.

## Core types

```ts
let s: string; let n: number; let b: boolean;
let big: bigint; let sym: symbol;
let nums: number[];              // or Array<number>
let pair: [string, number];      // tuple: fixed length and order
let maybe: string | null;        // union
let anything: unknown;           // safe top type -- must narrow before use
let unsafe: any;                 // disables checking -- avoid
function fail(): never { throw new Error("never returns"); }
function log(msg: string): void {}
```

**`unknown` vs `any`:** both accept anything, but `unknown` forces you to check before use. Prefer `unknown` at every boundary (JSON, API responses, `catch`).

## Literal and union types

```ts
type Status = "draft" | "published" | "archived";
let status: Status = "draft";     // "nope" is a compile error

const SIZES = ["sm", "md", "lg"] as const;
type Size = typeof SIZES[number];  // "sm" | "md" | "lg"
```

Unions of string literals beat enums in most modern code — no runtime cost, better inference.

## Objects and optional properties

```ts
type User = {
  id: number;
  name: string;
  email?: string;             // optional -> string | undefined
  readonly createdAt: Date;   // cannot be reassigned
};
```

## Type assertions

```ts
const el = document.getElementById("x") as HTMLInputElement;  // "trust me"
const config = { mode: "dark" } as const;                      // deep readonly literals
```

Assertions **silence** the compiler; they don't validate. Prefer a type guard or schema validation.

## Strict-mode flags that matter

`strictNullChecks` (null/undefined must be handled), `noImplicitAny`, `strictFunctionTypes`, `noUncheckedIndexedAccess` (array access yields `T | undefined` — turn it on).

Next: [exercises.md](exercises.md)
