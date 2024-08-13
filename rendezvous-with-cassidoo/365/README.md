# findUnused

[issue #365 of rendezvous with cassidoo.](https://buttondown.com/cassidoo/archive/work-smart-get-things-done/)

**Given an array of logs and variable assignments, return a list of all unused variables.**

Example:

```ts
> findUnused(["a = 1", "b = a", "c = 2", "log(b)"]);
> ["c"]

> findUnused(["a = 1", "b = a", "c = 2", "log(c)"]);
> ["a", "b"]
```

---

[Solution Playground](https://tsplay.dev/NdX6dN)
