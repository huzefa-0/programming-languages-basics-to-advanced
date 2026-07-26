// Level 04 - prototypes, classes, `this`, patterns.

// --- prototypes without classes ---
const animalProto = {
  speak() { return `${this.name} makes a noise`; },
};
const rex = Object.create(animalProto);
rex.name = "Rex";
console.log(rex.speak(), "| proto is animalProto:", Object.getPrototypeOf(rex) === animalProto);

// --- classes, private fields, statics, getters ---
class Animal {
  #id;
  static count = 0;

  constructor(name) {
    this.name = name;
    this.#id = ++Animal.count;
  }

  get id() { return this.#id; }
  speak() { return `${this.name} makes a noise`; }
  toString() { return `${this.constructor.name}#${this.#id}(${this.name})`; }
  static create(name) { return new this(name); }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() { return `${super.speak()} -- specifically a bark`; }
}

const dog = Dog.create("Bella");
console.log(String(dog), "|", dog.speak(), "| instances:", Animal.count);
console.log("dog instanceof Animal:", dog instanceof Animal);

// --- polymorphism via a shared interface ---
class Cat extends Animal {
  speak() { return `${this.name} meows`; }
}
for (const a of [new Dog("Rex", "lab"), new Cat("Mia"), new Animal("Thing")]) {
  console.log(" ", a.speak());
}

// --- the `this` trap and its fixes ---
class Button {
  constructor(label) {
    this.label = label;
  }
  brokenClick() { return `clicked ${this?.label}`; }   // loses `this` as callback
  fixedClick = () => `clicked ${this.label}`;          // arrow class field: safe
}
const button = new Button("Save");
const broken = button.brokenClick;
const bound = button.brokenClick.bind(button);
console.log("detached:", broken(), "| bound:", bound(), "| arrow field:", (button.fixedClick)());

// --- factory pattern (no classes needed) ---
const createLogger = (prefix) => ({
  info: (msg) => console.log(`[${prefix}] ${msg}`),
  error: (msg) => console.error(`[${prefix}] ERROR ${msg}`),
});
createLogger("app").info("factory pattern works");

// --- builder / fluent interface ---
class QueryBuilder {
  #parts = { table: "", where: [], limit: null };
  from(table) { this.#parts.table = table; return this; }
  where(clause) { this.#parts.where.push(clause); return this; }
  limit(n) { this.#parts.limit = n; return this; }
  build() {
    const { table, where, limit } = this.#parts;
    return [`SELECT * FROM ${table}`, where.length ? `WHERE ${where.join(" AND ")}` : "", limit ? `LIMIT ${limit}` : ""]
      .filter(Boolean).join(" ");
  }
}
console.log(new QueryBuilder().from("users").where("age > 18").where("active").limit(10).build());

// --- observer pattern ---
class EventBus {
  #listeners = new Map();
  on(event, handler) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, new Set());
    this.#listeners.get(event).add(handler);
    return () => this.#listeners.get(event).delete(handler);   // unsubscribe
  }
  emit(event, payload) {
    for (const handler of this.#listeners.get(event) ?? []) handler(payload);
  }
}
const bus = new EventBus();
const off = bus.on("save", (p) => console.log("observer got:", p));
bus.emit("save", { id: 1 });
off();
bus.emit("save", { id: 2 });   // no output: unsubscribed

// --- immutable update ---
const state = Object.freeze({ count: 0, tags: ["a"] });
const nextState = { ...state, count: state.count + 1, tags: [...state.tags, "b"] };
console.log("immutable update:", state, "->", nextState);
