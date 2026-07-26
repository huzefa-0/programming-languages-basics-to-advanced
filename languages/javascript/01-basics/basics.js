// Level 01 - JavaScript basics. Run: node basics.js

// --- declarations ---
const PI = 3.14159;
let counter = 0;
counter += 1;
console.log({ PI, counter });

// const object contents are still mutable
const config = { debug: false };
config.debug = true; // allowed: the binding is constant, not the value
console.log("config:", config);

// --- types ---
const samples = [42, "text", true, undefined, null, 10n, Symbol("id"), [], {}, () => {}];
for (const value of samples) {
  console.log(String(typeof value).padEnd(10), Array.isArray(value) ? "(array)" : "");
}

// --- numbers and float precision ---
console.log(0.1 + 0.2);                        // 0.30000000000000004
console.log((0.1 + 0.2).toFixed(2));           // "0.30"
console.log(Math.trunc(10 / 3), 10 % 3, 2 ** 10);
console.log(Number("12.5"), parseInt("12px", 10), Number.isNaN(Number("abc")));

// --- strings ---
const name = "  Ada Lovelace  ";
console.log(`[${name.trim()}] has ${name.trim().length} chars`);
console.log(name.trim().toUpperCase().split(" ").map((w) => w[0]).join("."));
console.log("repeat:", "-".repeat(20));

// --- coercion traps ---
console.log("5" + 1, "5" - 1);   // "51"  4
console.log("" == 0, "" === 0);  // true  false
console.log(Boolean([]), Boolean({}), Boolean(""), Boolean(0)); // true true false false

// --- modern operators ---
const user = { profile: { city: "Cairo" } };
console.log(user?.profile?.city, user?.account?.id ?? "no account");

let nickname = null;
nickname ??= "guest";
console.log("nickname:", nickname);
