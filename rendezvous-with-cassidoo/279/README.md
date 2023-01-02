# Replace Sequence Of Zeros With Length Of Sequence

[issue #279 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/dont-be-afraid-of-hard-work-nothing-worthwhile/)

## Description

Given a string of any length which contains only digits from 0 to 9,
replace each consecutive run of the digit 0 with its length.

Example:

```ts
> replaceZeros('1234500362000440')
> '1234523623441'

> replaceZeros('123450036200044')
> '123452362344'

> replaceZeros('000000000000')
> '12'

> replaceZeros('123456789')
> '123456789'
```
