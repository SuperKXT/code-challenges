# largestIsland

[issue #345 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/the-privilege-of-a-lifetime-is-to-become-who-you/)

**Given a 2D array of 0s and 1s, where 0 represents water and 1 represents land, return the size of the largest "island" in the water.**
Diagonal connections don't count!

Example:

```ts
let map =[
	[0, 1, 1, 1, 0, 0, 0, 1, 1],
	[0, 1, 1, 1, 0, 1, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 1, 1, 0, 1, 1, 1, 0],
];
> largestIsland(map);
> 7;
```

---

[Solution Playground](https://tsplay.dev/wjogvN)
