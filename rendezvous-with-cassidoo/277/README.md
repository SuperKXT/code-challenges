# Return sum of a sub-grid

[issue #277 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/life-has-no-blessing-like-a-prudent-friend/)

## Description

Given a 2D array n of integers, and an array m of four (4) coordinates that
represent corners of a rectangle in n, return the sum of all of the numbers in
the rectangle.

Example:

```ts
const n = [
	[6,  9, -7,  3]
	[8, -1, -6, -4],
	[2, -7,  7, -7],
	[-1,  4,  7,  9],
];

const m = [-1, 8, -7, 2];

> subGridSum(n, m);
> 2
> subGridSum(n, [6, 3, 2, -7]);
> 3
```
