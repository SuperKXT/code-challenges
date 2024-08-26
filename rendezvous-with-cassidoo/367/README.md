# equalLetterAndDigits

[issue #367 of rendezvous with cassidoo.](https://buttondown.com/cassidoo/archive/you-cant-turn-back-the-clock-but-you-can-wind-it/)

**Given a string `s` containing letters and digits, return the longest substring of
`s` where the number of distinct letters is equal to the number of distinct digits.**

If there are multiple substrings with the same length, return the one that appears first.

Example:

```ts
> equalLettersAndDigits("abc12345")
> "abc123"

> equalLettersAndDigits("a123b4c")
> "3b4c"

> equalLettersAndDigits("a123b4")
> "a1"

> equalLettersAndDigits("12")
> "" // not possible with this example

> equalLettersAndDigits("a12bc34")
> "a12bc3"
```

---

[Solution Playground](https://tsplay.dev/mZdkow)
