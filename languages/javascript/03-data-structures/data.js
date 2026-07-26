// Level 03 - arrays, objects, Map/Set, destructuring, JSON.

const people = [
  { name: "Ada", role: "eng", salary: 120, city: "London" },
  { name: "Linus", role: "eng", salary: 130, city: "Helsinki" },
  { name: "Grace", role: "lead", salary: 150, city: "New York" },
  { name: "Alan", role: "research", salary: 110, city: "London" },
];

// --- map / filter / reduce ---
console.log("names:", people.map((p) => p.name).join(", "));
console.log("engineers:", people.filter((p) => p.role === "eng").length);
console.log("payroll:", people.reduce((total, p) => total + p.salary, 0));

// --- grouping with reduce ---
const byCity = people.reduce((acc, p) => {
  (acc[p.city] ??= []).push(p.name);
  return acc;
}, {});
console.log("byCity:", byCity);

// --- sorting immutably (always copy first) ---
const bySalary = [...people].sort((a, b) => b.salary - a.salary);
console.log("highest paid:", bySalary[0].name);
console.log("number sort gotcha:", [10, 9, 100].sort(), "vs", [10, 9, 100].sort((a, b) => a - b));

// --- searching ---
console.log(people.find((p) => p.city === "London")?.name);
console.log("any lead?", people.some((p) => p.role === "lead"));
console.log("all paid > 100?", people.every((p) => p.salary > 100));
console.log("last person:", people.at(-1).name);

// --- destructuring ---
const [{ name: firstName }, ...others] = people;
console.log({ firstName, otherCount: others.length });

function summarise({ name, salary, currency = "USD" }) {
  return `${name}: ${salary}k ${currency}`;
}
console.log(summarise(people[2]));

let a = 1, b = 2;
[a, b] = [b, a];
console.log("swapped:", { a, b });

// --- spread: clone and override ---
const promoted = { ...people[0], role: "lead", salary: 140 };
console.log("promoted:", promoted, "original untouched:", people[0].role);

// --- Map: non-string keys, insertion order ---
const salaryByPerson = new Map(people.map((p) => [p, p.salary]));
console.log("map size:", salaryByPerson.size, "| Ada:", salaryByPerson.get(people[0]));

// --- Set: dedupe and membership ---
const cities = new Set(people.map((p) => p.city));
console.log("unique cities:", [...cities]);
console.log("has Helsinki?", cities.has("Helsinki"));

// --- flat / flatMap ---
const nested = [1, [2, [3, [4]]]];
console.log("flat(Infinity):", nested.flat(Infinity));
console.log("flatMap letters:", ["ab", "cd"].flatMap((s) => [...s]));

// --- JSON round trip and deep clone ---
const json = JSON.stringify({ people: people.slice(0, 2) }, null, 2);
console.log(json.split("\n").slice(0, 5).join("\n") + "\n...");
const clone = structuredClone({ nested: { deep: [1, 2, 3] } });
clone.nested.deep.push(4);
console.log("deep clone is independent:", clone.nested.deep);
