# Write Tests For Curried Add Function
[issue #263 of rendezvous with cassidoo](https://buttondown.email/cassidoo/archive/the-greatest-education-in-the-world-is-watching/).

## Description
Write a set of tests for a function that adds numbers from many invocations, until it sees an empty invocation. Consider edge cases, side effects, incorrect usage of the function, and expected values!

## Example
```ts
const curriedAdd = (first?: number) => {
	if (first === undefined) return 0;
	return (second?: number) => {
		if (second !== undefined) {
			return curriedAdd(first + second);
		}
		return first;
	};
};


/*
    curriedAdd()           // undefined
    curriedAdd(2)()        // 2
    curriedAdd(2)(7)()     // 9
    curriedAdd(3)(4)(0)()  // 7
*/
```