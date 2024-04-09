# diceSum

[issue #347 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/the-privilege-of-a-lifetime-is-to-become-who-you/)

**Imagine you have n dice, and each die has m faces on it (so the numbers are from `1` to `m`). Write a function where, given an integer target, it returns the number of possible ways to roll the dice to get the sum of target face up.**

You can safely assume `m` will never be larger than `20` (so you don't have to deal with mega huge numbers).

Example:

```ts
let n = 1;
let m = 6;

$ diceSum(n,m,3)
$ 1 // there is only one die, and one way to get 3

$ diceSum(2,m,7)
$ 6 // 6 ways to get a sum of 7: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1
```

---

[Solution Playground](https://tsplay.dev/Wvo7rw)
