# Exercises — Python 02 Control Flow

1. **Grade calculator** — write `grade(score)` returning A/B/C/D/F, raising `ValueError` for scores outside 0–100.
2. **Number guessing game** — random 1–100, loop until correct, print "higher"/"lower", count attempts.
3. **Factorial two ways** — iterative loop and recursive function. Compare with `math.factorial`.
4. **Fibonacci generator** — print the first `n` Fibonacci numbers using a `while` loop.
5. **Collatz length** — for a given `n`, count steps to reach 1 (`n/2` if even, `3n+1` if odd).
6. **Robust input** — write `read_int(prompt)` that keeps asking until the user types a valid integer.
7. **Vowel counter** — count vowels in a string using a loop and `continue` for non-letters.
8. **Multiplication table** — nested loops printing a formatted 9×9 table.
9. **Custom exception** — define `InsufficientFundsError(Exception)` and use it in a `withdraw(balance, amount)` function.
10. **Simple calculator with `match`** — read `"3 + 4"` style input and evaluate using pattern matching, handling division by zero.
11. **Stretch: retry decorator-free** — write `attempt(fn, times=3)` that calls `fn()` and retries on exception, re-raising after the last attempt.

## Self-check

- When would you use `while` instead of `for`?
- Why is a bare `except:` dangerous?
- What is wrong with `def add(item, bag=[])`?
