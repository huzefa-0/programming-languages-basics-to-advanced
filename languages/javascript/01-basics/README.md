# 01 — JavaScript Basics

## Declarations

```js
const PI = 3.14159;   // block-scoped, cannot be reassigned
let count = 0;        // block-scoped, reassignable
var old = "avoid";    // function-scoped and hoisted -- do not use
```

`const` on an object still allows mutating its contents — it freezes the *binding*, not the value.

## Types

Seven primitives: `string`, `number`, `boolean`, `undefined`, `null`, `symbol`, `bigint`. Everything else is an `object` (including arrays and functions).

```js
typeof 42          // "number"
typeof "hi"        // "string"
typeof null        // "object"  <- famous historical bug
Array.isArray([])  // true      <- correct way to test arrays
```

`undefined` = never assigned. `null` = intentionally empty.

## Numbers

All numbers are 64-bit floats — there is no separate int type.

```js
0.1 + 0.2            // 0.30000000000000004
(0.1 + 0.2).toFixed(2)  // "0.30"
10 / 3               // 3.333...
Math.trunc(10 / 3)   // 3
7 % 3                // 1
2 ** 10              // 1024
Number.isNaN(NaN)    // true
```

## Strings and template literals

```js
const name = "Ada";
`Hello, ${name}! Length: ${name.length}`   // always prefer backticks
name.toUpperCase(); name.includes("d"); name.slice(0, 2);
"a,b,c".split(",");  ["a","b"].join("-");
```

## Coercion and equality

```js
"5" + 1    // "51"   + prefers string concatenation
"5" - 1    // 4      other operators prefer numbers
"" == 0    // true   loose equality coerces
"" === 0   // false  strict equality -- ALWAYS use this
```

Falsy values: `false, 0, -0, 0n, "", null, undefined, NaN`. Everything else is truthy (including `[]` and `{}`).

## Handy modern operators

```js
user?.address?.city          // optional chaining -- no TypeError
name ?? "anonymous";         // nullish coalescing (only null/undefined)
count ||= 10;                // logical assignment
```

Next: [exercises.md](exercises.md)
