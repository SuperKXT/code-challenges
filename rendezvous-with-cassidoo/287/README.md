# Get the number of parenthesis required to balance a string

[issue #287 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/to-think-that-everybodys-like-you-is-silly/)

## Description

**Given a string of parenthesis, return the number of parenthesis you need to add to the string in order for it to be balanced.**

Examples:

```ts
> balanceParens(`()`)
> 0

> balanceParens(`(()`)
> 1

> balanceParens(`))()))))()`)
> 6

> balanceParens(`)))))`)
> 5
```
