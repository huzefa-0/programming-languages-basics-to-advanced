// Level 01 - TypeScript basics. Run: npx tsx basics.ts

// --- inference vs annotation ---
let count = 0;                     // inferred: number
const greeting = "hello";          // inferred: "hello" (literal type)
let scores: number[] = [];         // empty container needs an annotation

function add(a: number, b: number): number {
  return a + b;
}
scores.push(add(2, 3));
console.log({ count, greeting, scores });

// --- tuples ---
const point: [number, number] = [3, 4];
const entry: [key: string, value: number] = ["age", 36];   // labelled tuple
console.log(point, entry);

// --- unions and literal types ---
type Status = "draft" | "published" | "archived";
const publish = (s: Status): Status => (s === "draft" ? "published" : s);
console.log(publish("draft"));

const SIZES = ["sm", "md", "lg"] as const;
type Size = (typeof SIZES)[number];
const widths: Record<Size, number> = { sm: 4, md: 8, lg: 16 };
console.log(widths.md);

// --- objects, optional and readonly ---
type User = {
  id: number;
  name: string;
  email?: string;
  readonly createdAt: Date;
};

const user: User = { id: 1, name: "Ada", createdAt: new Date("2026-01-01") };
// user.createdAt = new Date();   // compile error: readonly
console.log(user.email ?? "no email on file");

// --- unknown forces you to check; any does not ---
function parseJson(text: string): unknown {
  return JSON.parse(text);
}

function isUser(value: unknown): value is Pick<User, "id" | "name"> {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof (value as { id: unknown }).id === "number" &&
    "name" in value &&
    typeof (value as { name: unknown }).name === "string"
  );
}

const parsed = parseJson('{"id":2,"name":"Grace"}');
console.log(isUser(parsed) ? `valid user: ${parsed.name}` : "invalid payload");
console.log(isUser(parseJson('{"id":"oops"}')) ? "valid" : "invalid payload rejected");

// --- never for exhaustiveness ---
function label(status: Status): string {
  switch (status) {
    case "draft": return "Draft";
    case "published": return "Live";
    case "archived": return "Archived";
    default: {
      const exhaustive: never = status;   // errors if a case is ever added
      return exhaustive;
    }
  }
}
console.log(SIZES.join("/"), "|", label("archived"));

// --- void and optional params ---
function logLine(message: string, prefix = "info"): void {
  console.log(`[${prefix}] ${message}`);
}
logLine("basics complete");
