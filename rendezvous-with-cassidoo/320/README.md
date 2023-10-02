# addOperators

[issue #320 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/perseverance-is-failing-19-times-and-succeeding/)

**Given two integers `source` and `target`, add operators in the `source` number to make it equal `target`, if possible.**
You can return just one, or all possibilities for this!

Example:

```ts
> addOperators(123, 6)
> ["1*2*3", "1+2+3"]

> addOperators(3456237490, 9191)
> [] // none possible

```
