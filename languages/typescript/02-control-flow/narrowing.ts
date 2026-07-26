// Level 02 - narrowing, guards, discriminated unions.

// --- basic narrowing ---
function describe(value: string | number | boolean | null): string {
  if (value === null) return "null";
  if (typeof value === "number") return `number ${value.toFixed(2)}`;
  if (typeof value === "boolean") return `boolean ${value ? "yes" : "no"}`;
  return `string of length ${value.length}`;
}
console.log([42, "hello", true, null].map(describe));

// --- user-defined type guard ---
type Cat = { name: string; meow(): string };
type Dog = { name: string; bark(): string };

function isDog(pet: Cat | Dog): pet is Dog {
  return "bark" in pet;
}

const pets: Array<Cat | Dog> = [
  { name: "Mia", meow: () => "meow" },
  { name: "Rex", bark: () => "woof" },
];
for (const pet of pets) {
  console.log(pet.name, "says", isDog(pet) ? pet.bark() : pet.meow());
}

// --- assertion function ---
function assertDefined<T>(value: T | null | undefined, label = "value"): asserts value is T {
  if (value === null || value === undefined) throw new Error(`${label} is missing`);
}

function firstChar(input?: string): string {
  assertDefined(input, "input");
  return input[0] ?? "";      // input is string from here on
}
console.log("firstChar:", firstChar("typescript"));

// --- discriminated union: Result type ---
type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

const ok = <T>(value: T): Result<T> => ({ ok: true, value });
const err = (error: string): Result<never> => ({ ok: false, error });

function parseAge(input: string): Result<number> {
  const n = Number(input);
  if (Number.isNaN(n)) return err(`"${input}" is not a number`);
  if (n < 0 || n > 130) return err(`${n} is out of range`);
  return ok(n);
}

for (const input of ["30", "abc", "200"]) {
  const result = parseAge(input);
  console.log(result.ok ? `age ${result.value}` : `rejected: ${result.error}`);
}

// --- discriminated union: shapes with exhaustive switch ---
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "rect": return shape.width * shape.height;
    case "triangle": return (shape.base * shape.height) / 2;
    default: {
      const exhaustive: never = shape;
      return exhaustive;
    }
  }
}

const shapes: Shape[] = [
  { kind: "circle", radius: 2 },
  { kind: "rect", width: 3, height: 4 },
  { kind: "triangle", base: 6, height: 2 },
];
console.log(shapes.map((s) => `${s.kind}=${area(s).toFixed(2)}`).join(" "));

// --- state machine as a union: impossible states are unrepresentable ---
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading"; startedAt: number }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function render<T>(state: RequestState<T>): string {
  switch (state.status) {
    case "idle": return "Nothing yet";
    case "loading": return "Loading...";
    case "success": return `Loaded: ${JSON.stringify(state.data)}`;
    case "error": return `Failed: ${state.message}`;
  }
}
console.log(render({ status: "success", data: { id: 1 } }));
console.log(render({ status: "error", message: "HTTP 500" }));

// --- overloads ---
function toNumbers(input: string): number;
function toNumbers(input: string[]): number[];
function toNumbers(input: string | string[]): number | number[] {
  return Array.isArray(input) ? input.map(Number) : Number(input);
}
console.log(toNumbers("7"), toNumbers(["1", "2"]));

// --- catch is unknown ---
try {
  throw new TypeError("boom");
} catch (error) {
  console.log(error instanceof Error ? `caught ${error.name}: ${error.message}` : "non-error throw");
}
