# Format Markdown Table String

[issue #262 of rendezvous with cassidoo](https://buttondown.email/cassidoo/archive/find-something-youre-passionate-about-and-keep/).

## Description
Write a function fromTo that produces a generator, that will produce values in a range.

## Example:
```ts
	const gen = fromTo(5,7)
	> gen() 	//	5
	> gen() 	//	6
	> gen() 	//	7
	> gen()		//	undefined
	undefined
```