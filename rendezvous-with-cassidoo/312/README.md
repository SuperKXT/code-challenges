# Validate a credit card number

[issue #312 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/it-isnt-the-mountains-ahead-to-climb-that-wear/)

**Implement the [Luhn](https://en.wikipedia.org/wiki/Luhn_algorithm) algorithm to validate a credit card number.**
Bonus points if you can identify what brand of credit card the user inputted!

Example:

```ts
> luhnCheck(123456789)
> false

> luhnCheck(5555555555554444)
> true // Mastercard
```
