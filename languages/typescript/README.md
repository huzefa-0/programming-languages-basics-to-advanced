# TypeScript Track

TypeScript is JavaScript with a static type system. Types exist only at compile time — they are erased in the emitted JS. Its job is to catch mistakes before you run the code and to document intent.

## Setup

```bash
npm init -y
npm i -D typescript tsx @types/node
npx tsc --init --strict
npx tsx languages/typescript/01-basics/basics.ts    # run directly
npx tsc --noEmit                                    # type-check only
```

**Always enable `strict: true`.** Non-strict TypeScript gives you a false sense of safety.

## Track contents

| Level | Topics |
|---|---|
| [01-basics](01-basics) | annotations, inference, primitives, arrays, tuples, enums, `unknown` vs `any` |
| [02-control-flow](02-control-flow) | narrowing, type guards, discriminated unions, function types |
| [03-data-structures](03-data-structures) | interfaces vs types, generics, `Record`/`Partial`/`Pick`, readonly |
| [04-oop-and-patterns](04-oop-and-patterns) | classes, access modifiers, abstract, generic constraints, DI |
| [05-advanced](05-advanced) | conditional & mapped types, template literal types, `infer`, declaration merging, config |

Finish with [mini-project.md](mini-project.md).

## Prerequisite

Complete the [JavaScript track](../javascript) first — TypeScript adds types to JS, it does not replace learning JS.
