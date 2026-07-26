"""Level 01 - the basics, in one runnable file."""

# --- printing and f-strings ---
name = "World"
print(f"Hello, {name}!")

# --- variables and types ---
age = 25
height = 1.75
is_student = True
nickname = None

for value in (name, age, height, is_student, nickname):
    print(f"{value!r:>10} -> {type(value).__name__}")

# --- numeric operators ---
a, b = 17, 5
print(f"{a} + {b} = {a + b}")
print(f"{a} / {b} = {a / b}")     # 3.4  float division
print(f"{a} // {b} = {a // b}")   # 3    floor division
print(f"{a} % {b} = {a % b}")     # 2    remainder
print(f"{a} ** {b} = {a ** b}")   # power

# --- string methods and slicing ---
text = "  Python is Fun  "
print(repr(text.strip()))
print(text.strip().lower().replace("fun", "powerful"))
print("reversed:", text.strip()[::-1])
print("words:", text.strip().split())

# --- type conversion ---
num_text = "42"
print(int(num_text) + 8)
print(str(3.5) + " as text")
print(bool(""), bool("x"), bool(0), bool(3))  # falsy vs truthy

# --- constants by convention (UPPER_CASE, not enforced) ---
PI = 3.14159
radius = 3
print(f"Area of circle r={radius}: {PI * radius ** 2:.2f}")
