# Return list of anti-divisors for the given number

[issue #273 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/i-dont-think-of-all-the-misery-but-of-the-beauty-4964/)

## Description

Given a positive integer `n`, return all of its anti-divisors.
Anti-divisors are numbers that do not divide a number by the largest possible margin (1 is not an anti-divisor of any number).
[More information here!](https://oeis.org/A066272/a066272a.html)

## Example

```ts
> findAntiDivisor(1)
> []

> findAntiDivisor(3)
> [2]

> findAntiDivisor(5)
> [2,3]

> findAntiDivisor(10)
> [3,4,7]

> findAntiDivisor(234)
> [4,7,12,36,52,67,156]
```
