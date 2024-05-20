# fixInvertedPunc

[issue #353 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/a-thousand-moments-that-i-had-just-taken-for/)

**Write a function that takes in a list (of length >= 3) of numbers,
and returns the maximum product that can be obtained by multiplying
any three integers from the list.**

Example:

```ts
// cSpell: disable
> fixInvertedPunc("Feliz cumpleaños!")
> "¡Feliz cumpleaños!"

> fixInvertedPunc("Ella ya se graduó de la universidad? No!")
> "¿Ella ya se graduó de la universidad? ¡No!"
// cSpell: enable
```

---

[Solution Playground](https://tsplay.dev/w6880m)
