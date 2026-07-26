"""Level 03 - collections, comprehensions, files, and JSON."""

import json
from collections import Counter, defaultdict
from pathlib import Path
from tempfile import TemporaryDirectory

WORDS = "the quick brown fox jumps over the lazy dog the fox".split()

# --- lists ---
numbers = [5, 3, 9, 1, 7]
print("sorted:", sorted(numbers))
print("reverse slice:", numbers[::-1])
print("top 2:", sorted(numbers, reverse=True)[:2])

# --- tuples: fixed records, unpackable ---
point = (3, 4)
x, y = point
print(f"distance from origin: {(x**2 + y**2) ** 0.5}")

# --- dict: counting the manual way vs Counter ---
manual: dict[str, int] = {}
for word in WORDS:
    manual[word] = manual.get(word, 0) + 1
print("manual count:", manual)
print("Counter top 2:", Counter(WORDS).most_common(2))

# --- defaultdict: grouping ---
by_first_letter = defaultdict(list)
for word in set(WORDS):
    by_first_letter[word[0]].append(word)
print("grouped:", dict(sorted(by_first_letter.items())))

# --- sets: dedupe and set algebra ---
vowels = set("aeiou")
letters = set("".join(WORDS))
print("vowels used:", sorted(letters & vowels))
print("consonants used:", len(letters - vowels))

# --- comprehensions ---
print("lengths:", {w: len(w) for w in sorted(set(WORDS))})
print("long words:", [w for w in set(WORDS) if len(w) > 3])
print("flattened chars:", len([c for w in WORDS for c in w]))

# --- files + json, in a throwaway directory ---
with TemporaryDirectory() as tmp:
    path = Path(tmp) / "words.json"
    path.write_text(json.dumps(Counter(WORDS), indent=2), encoding="utf-8")

    loaded = json.loads(path.read_text(encoding="utf-8"))
    print("round-tripped 'the' count:", loaded["the"])

    report = Path(tmp) / "report.txt"
    with report.open("w", encoding="utf-8") as f:
        for word, count in sorted(loaded.items()):
            f.write(f"{word:<8}{count}\n")

    print("--- report ---")
    print(report.read_text(encoding="utf-8").strip())
