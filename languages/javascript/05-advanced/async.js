// Level 05 - event loop, promises, async/await, generators, proxies.

// --- event loop ordering ---
console.log("1 sync");
setTimeout(() => console.log("4 macrotask (setTimeout)"), 0);
queueMicrotask(() => console.log("3 microtask (queueMicrotask)"));
Promise.resolve().then(() => console.log("3 microtask (promise)"));
console.log("2 sync");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function job(name, ms, shouldFail = false) {
  await sleep(ms);
  if (shouldFail) throw new Error(`${name} failed`);
  return `${name} finished in ${ms}ms`;
}

// --- sequential vs parallel ---
async function sequential() {
  const t0 = performance.now();
  const a = await job("A", 100);
  const b = await job("B", 100);
  return `sequential took ${Math.round(performance.now() - t0)}ms -> ${[a, b].length} results`;
}

async function parallel() {
  const t0 = performance.now();
  const results = await Promise.all([job("A", 100), job("B", 100)]);
  return `parallel took ${Math.round(performance.now() - t0)}ms -> ${results.length} results`;
}

// --- combinators ---
async function combinators() {
  const settled = await Promise.allSettled([job("ok", 20), job("bad", 10, true)]);
  console.log("  allSettled:", settled.map((r) => r.status).join(", "));

  const winner = await Promise.race([job("fast", 10), job("slow", 200)]);
  console.log("  race winner:", winner);

  try {
    await Promise.all([job("ok", 20), job("bad", 10, true)]);
  } catch (err) {
    console.log("  Promise.all rejects fast:", err.message);
  }
}

// --- timeout wrapper with Promise.race ---
function withTimeout(promise, ms) {
  const timeout = sleep(ms).then(() => { throw new Error(`timed out after ${ms}ms`); });
  return Promise.race([promise, timeout]);
}

// --- concurrency limit (semaphore-style pool) ---
async function pool(tasks, limit = 2) {
  const results = [];
  const running = new Set();
  for (const task of tasks) {
    const p = task().then((r) => { running.delete(p); return r; });
    running.add(p);
    results.push(p);
    if (running.size >= limit) await Promise.race(running);
  }
  return Promise.all(results);
}

// --- generators ---
function* take(iterable, n) {
  let i = 0;
  for (const item of iterable) {
    if (i++ >= n) return;
    yield item;
  }
}
function* naturals() { let n = 1; while (true) yield n++; }

// --- async generator: streaming pages ---
async function* fakePages(pages = 3) {
  for (let page = 1; page <= pages; page++) {
    await sleep(10);
    yield { page, items: [page * 10, page * 10 + 1] };
  }
}

// --- Proxy validation ---
const strict = (target, allowed) =>
  new Proxy(target, {
    get(obj, prop) {
      if (!(prop in obj)) throw new TypeError(`unknown property: ${String(prop)}`);
      return Reflect.get(obj, prop);
    },
    set(obj, prop, value) {
      if (!allowed.includes(prop)) throw new TypeError(`cannot set ${String(prop)}`);
      return Reflect.set(obj, prop, value);
    },
  });

// --- WeakMap for private data ---
const secrets = new WeakMap();
class Session {
  constructor(token) { secrets.set(this, { token }); }
  get masked() { return "*".repeat(secrets.get(this).token.length); }
}

async function main() {
  console.log(await sequential());
  console.log(await parallel());
  await combinators();

  try {
    await withTimeout(job("slow", 500), 50);
  } catch (err) {
    console.log("timeout works:", err.message);
  }

  const tasks = [1, 2, 3, 4, 5].map((n) => () => job(`t${n}`, 30));
  console.log("pool results:", (await pool(tasks, 2)).length);

  console.log("generator take:", [...take(naturals(), 5)]);

  for await (const { page, items } of fakePages()) {
    console.log(`  streamed page ${page}:`, items);
  }

  const config = strict({ host: "localhost", port: 8080 }, ["port"]);
  console.log("proxy get:", config.host);
  try { config.host = "evil"; } catch (err) { console.log("proxy blocked:", err.message); }
  try { config.missing; } catch (err) { console.log("proxy blocked:", err.message); }

  console.log("weakmap privacy:", new Session("abc123").masked);
}

main().catch((err) => { console.error(err); process.exitCode = 1; });
