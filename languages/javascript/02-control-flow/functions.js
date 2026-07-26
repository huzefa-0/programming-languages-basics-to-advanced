// Level 02 - control flow, functions, closures, errors.

// --- higher-order functions ---
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const double = (n) => n * 2;
const increment = (n) => n + 1;
console.log("pipe:", pipe(double, increment)(5));      // 11
console.log("compose:", compose(double, increment)(5)); // 12

// --- closures: private state ---
function makeCounter(start = 0) {
  let count = start;
  return {
    inc: () => ++count,
    dec: () => --count,
    get value() { return count; },
  };
}
const counter = makeCounter(10);
counter.inc(); counter.inc(); counter.dec();
console.log("counter:", counter.value);

// --- closures: memoisation ---
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key);
  };
}
const slowFib = (n) => (n < 2 ? n : slowFib(n - 1) + slowFib(n - 2));
const fib = memoize((n) => (n < 2 ? n : fib(n - 1) + fib(n - 2)));
console.log("fib(35) memoised:", fib(35));

// --- currying / partial application ---
const multiply = (a) => (b) => a * b;
console.log("triple 7:", multiply(3)(7));

// --- arrow vs function: `this` ---
const timerBroken = {
  label: "broken",
  report: function () {
    // arrow inherits `this` from report -> works
    setTimeout(() => console.log("this.label =", this.label), 0);
  },
};
timerBroken.report();

// --- custom errors ---
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateAge(input) {
  const age = Number(input);
  if (Number.isNaN(age)) throw new ValidationError("age", "age must be numeric");
  if (age < 0 || age > 130) throw new ValidationError("age", "age out of range");
  return age;
}

for (const input of ["30", "abc", "999"]) {
  try {
    console.log(`valid age: ${validateAge(input)}`);
  } catch (err) {
    if (err instanceof ValidationError) console.log(`  ${err.name} [${err.field}]: ${err.message}`);
    else throw err;
  } finally {
    // runs every iteration -- good place for cleanup
  }
}

// --- loops and control keywords ---
const results = [];
for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) continue;      // skip evens
  if (i > 15) break;              // stop early
  results.push(i);
}
console.log("odds up to 15:", results.join(" "));
