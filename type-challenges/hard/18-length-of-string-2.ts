/*
  651 - Length of String 2
  -------
  by null (@uid11) #hard #template-literal

  ### Question

  Implement a type `LengthOfString<S>` that calculates the length of the template string (as in [298 - Length of String](https://tsch.js.org/298)):

  ```ts
  type T0 = LengthOfString<"foo"> // 3
  ```

  The type must support strings several hundred characters long (the usual recursive calculation of the string length is limited by the depth of recursive function calls in TS, that is, it supports strings up to about 45 characters long).

  > View on GitHub: https://tsch.js.org/651
*/

/* _____________ Your Code Here _____________ */

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Next = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

type Node = { curr: Digit; next?: Node };

type NodeToNumber<
	T extends Node,
	Curr extends string = ''
> = T['next'] extends Node
	? NodeToNumber<T['next'], `${T['curr']}${Curr}`>
	: `${T['curr']}${Curr}` extends `${infer N extends number}`
	? N
	: 0;

type Increment<T extends Node> = T['curr'] extends 9
	? {
			curr: 0;
			next: T['next'] extends Node ? Increment<T['next']> : { curr: 1 };
	  }
	: T['next'] extends Node
	? { curr: Next[T['curr']]; next: T['next'] }
	: { curr: Next[T['curr']] };

type _LengthOfString<
	S extends string,
	C extends Node = { curr: 0 },
	L extends Node = C
> = S extends `${any}${infer R}`
	? _LengthOfString<R, Increment<L>>
	: NodeToNumber<L>;

// TODO RETRY
type LengthOfString<
	S extends string,
	R extends number[] = []
> = S extends `${any}${any}${any}${any}${any}${any}${any}${any}${any}${infer Rest}`
	? LengthOfString<Rest, [...R, 1, 1, 1, 1, 1, 1, 1, 1, 1]>
	: S extends `${any}${infer Rest}`
	? LengthOfString<Rest, [...R, 1]>
	: R['length'];

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, IsTrue } from '@type-challenges/utils';

type _cases = [
	IsTrue<Equal<LengthOfString<''>, 0>>,
	IsTrue<Equal<LengthOfString<'1'>, 1>>,
	IsTrue<Equal<LengthOfString<'12'>, 2>>,
	IsTrue<Equal<LengthOfString<'123'>, 3>>,
	IsTrue<Equal<LengthOfString<'1234'>, 4>>,
	IsTrue<Equal<LengthOfString<'12345'>, 5>>,
	IsTrue<Equal<LengthOfString<'123456'>, 6>>,
	IsTrue<Equal<LengthOfString<'1234567'>, 7>>,
	IsTrue<Equal<LengthOfString<'12345678'>, 8>>,
	IsTrue<Equal<LengthOfString<'123456789'>, 9>>,
	IsTrue<Equal<LengthOfString<'1234567890'>, 10>>,
	IsTrue<Equal<LengthOfString<'12345678901'>, 11>>,
	IsTrue<Equal<LengthOfString<'123456789012'>, 12>>,
	IsTrue<Equal<LengthOfString<'1234567890123'>, 13>>,
	IsTrue<Equal<LengthOfString<'12345678901234'>, 14>>,
	IsTrue<Equal<LengthOfString<'123456789012345'>, 15>>,
	IsTrue<Equal<LengthOfString<'1234567890123456'>, 16>>,
	IsTrue<Equal<LengthOfString<'12345678901234567'>, 17>>,
	IsTrue<Equal<LengthOfString<'123456789012345678'>, 18>>,
	IsTrue<Equal<LengthOfString<'1234567890123456789'>, 19>>,
	IsTrue<Equal<LengthOfString<'12345678901234567890'>, 20>>,
	IsTrue<Equal<LengthOfString<'123456789012345678901'>, 21>>,
	IsTrue<Equal<LengthOfString<'1234567890123456789012'>, 22>>,
	IsTrue<Equal<LengthOfString<'12345678901234567890123'>, 23>>,
	IsTrue<
		Equal<
			LengthOfString<'aaaaaaaaaaaaggggggggggggggggggggkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'>,
			272
		>
	>,
	IsTrue<
		Equal<
			LengthOfString<'000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'>,
			999
		>
	>,
	IsTrue<
		Equal<
			LengthOfString<'000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'>,
			2997
		>
	>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/651/answer
  > View solutions: https://tsch.js.org/651/solutions
  > More Challenges: https://tsch.js.org
*/
