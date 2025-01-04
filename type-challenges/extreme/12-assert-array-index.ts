/* eslint-disable @typescript-eslint/prefer-for-of */
/*
  925 - Assert Array Index
  -------
  by null (@uid11) #extreme #array

  ### Question

  Sometimes we want to use the good old `for`-loop with an index to traverse the array, but in this case TypeScript does not check in any way that we are accessing the elements of the array at its real index (not exceeding the length of the array), and that we are not using an arbitrary number as an index, or index from another array (for nested loops, for traversing matrices or graphs):
  ```ts
  const matrix = [
      [3, 4],
      [5, 6],
      [7, 8],
  ];

  // This example contains no type errors when the noUncheckedIndexedAccess option is off.
  for (let i = 0; i < matrix.length; i += 1) {
      const columns: number[] = matrix[i];

      for (let j = 0; j < columns.length; j += 1) {
          const current: number = columns[i]; // oops! i instead of j

          console.log(
              current.toFixed(), // TypeError: Cannot read property 'toFixed' of undefined
          );
      }
  }
  ```

  You can enable the [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) option (in `tsconfig.json`), but then each time you access an array element, you will need to check that this element exists, which is somewhat verbose and inconvenient, especially since in the case of such a `for`-traversal, we are sure that the index does not exceed the length of the array:
  ```ts
  const numbers = [5, 7];

  for (let i = 0; i < numbers.length; i += 1) {
      const current = numbers[i];

      if (current !== undefined) {
          console.log(current.toFixed());
      }
  }
  ```

  Write an `assert`-function `assertArrayIndex(array, key)` that can be applied to any `array` (with an arbitrary unique string `key`, which is needed to distinguish arrays at the type level) to allow access to the elements of this array only by the index obtained from array by the special generic type `Index<typeof array>` (this functionality requires enabling the [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) option in `tsconfig.json`):
  ```ts
  const numbers = [5, 7];

  assertArrayIndex(numbers, 'numbers');

  for (let i = 0 as Index<typeof numbers>; i < numbers.length; i += 1) {
      console.log(numbers[i].toFixed());
  }
  ```

  When accessing by such an index, it must be guaranteed that an element in the array exists, and when accessing an array by any other indices, there is no such guarantee (the element may not exist):
  ```ts
  const matrix = [
      [3, 4],
      [5, 6],
      [7, 8],
  ];

  assertArrayIndex(matrix, 'rows');

  let sum = 0;

  for (let i = 0 as Index<typeof matrix>; i < matrix.length; i += 1) {
      const columns: number[] = matrix[i];

      // @ts-expect-error: number | undefined in not assignable to number
      const x: number[] = matrix[0];

      assertArrayIndex(columns, 'columns');

      for (let j = 0 as Index<typeof columns>; j < columns.length; j += 1) {
          sum += columns[j];

          // @ts-expect-error: number | undefined in not assignable to number
          const y: number = columns[i];

          // @ts-expect-error: number | undefined in not assignable to number
          const z: number = columns[0];

          // @ts-expect-error: number[] | undefined in not assignable to number[]
          const u: number[] = matrix[j];
      }
  }
  ```

  The `assertArrayIndex` function cannot be called on tuples (since the accessing the elements is already well typed in them):
  ```ts
  const tuple = [5, 7] as const;

  // @ts-expect-error
  assertArrayIndex(tuple, 'tuple');
  ```

  (Additional design considerations for the proposed API: [#925](https://github.com/type-challenges/type-challenges/issues/925#issuecomment-780889329).)

  > View on GitHub: https://tsch.js.org/925
*/

/* _____________ Your Code Here _____________ */

type HashMapHelper<
	T extends number,
	R extends unknown[] = [],
> = R["length"] extends T ? R : HashMapHelper<T, [...R, unknown]>;

type HashMap = {
	"0": HashMapHelper<0>;
	"1": HashMapHelper<1>;
	"2": HashMapHelper<2>;
	"3": HashMapHelper<3>;
	"4": HashMapHelper<4>;
	"5": HashMapHelper<5>;
	"6": HashMapHelper<6>;
	"7": HashMapHelper<7>;
	"8": HashMapHelper<8>;
	"9": HashMapHelper<9>;
	a: HashMapHelper<1>;
	b: HashMapHelper<2>;
	c: HashMapHelper<3>;
	d: HashMapHelper<4>;
	e: HashMapHelper<5>;
	f: HashMapHelper<6>;
	g: HashMapHelper<7>;
	h: HashMapHelper<8>;
	i: HashMapHelper<9>;
	j: HashMapHelper<10>;
	k: HashMapHelper<11>;
	l: HashMapHelper<12>;
	m: HashMapHelper<13>;
	n: HashMapHelper<14>;
	o: HashMapHelper<15>;
	p: HashMapHelper<16>;
	q: HashMapHelper<17>;
	r: HashMapHelper<18>;
	s: HashMapHelper<19>;
	t: HashMapHelper<20>;
	u: HashMapHelper<21>;
	v: HashMapHelper<22>;
	w: HashMapHelper<23>;
	x: HashMapHelper<24>;
	y: HashMapHelper<25>;
	z: HashMapHelper<26>;
};

type Hash<
	T extends string,
	RR extends unknown[] = [],
> = T extends `${infer L}${infer R}`
	? Hash<R, [...RR, ...HashMap[keyof HashMap & L]]>
	: RR["length"];

type IsKeyHelper<K extends string> = K extends `${infer L}${infer R}`
	? L extends keyof HashMap
		? IsKeyHelper<R>
		: false
	: true;

type IsKey<K extends string> = K extends "" ? false : IsKeyHelper<K>;

declare const KEY: unique symbol;

function assertArrayIndex<A extends readonly unknown[], K extends string>(
	array: number extends A["length"] ? A : never,
	key: IsKey<K> extends true ? K : never,
): asserts array is number extends A["length"]
	? A & { readonly [KEY]: Hash<K> } & Readonly<Record<Hash<K>, A[number]>>
	: never {
	return undefined;
}

// todo RETRY
type Index<Arr extends { readonly [KEY]: number }> = Arr[typeof KEY];

/* _____________ Test Cases _____________ */
const matrix = [
	[3, 4],
	[5, 6],
	[7, 8],
];

const array = [1, 2, 3, 4];
const first = array[1 as keyof typeof array & number];
//    ^?

assertArrayIndex(matrix, "rows");

let sum = 0;

for (let i = 0 as Index<typeof matrix>; i < matrix.length; i += 1) {
	const columns: number[] = matrix[i];

	// @ts-expect-error: number | undefined in not assignable to number
	const x: number[] = matrix[0];

	assertArrayIndex(columns, "columns");

	for (let j = 0 as Index<typeof columns>; j < columns.length; j += 1) {
		sum += columns[j];

		// @ts-expect-error: number | undefined in not assignable to number
		const y: number = columns[i];

		// @ts-expect-error: number | undefined in not assignable to number
		const z: number = columns[0];

		// @ts-expect-error: number[] | undefined in not assignable to number[]
		const u: number[] = matrix[j];
	}
}

const a: string[] = [];

assertArrayIndex(a, "a");

for (let p = 0 as Index<typeof a>; p < a.length; p += 1) {
	const value: string = a[p];

	// @ts-expect-error: string | undefined is not assignable to string
	const z: string = a[2];
}

a.push("qux");
// @ts-expect-error: number is not assignable to string
a.push(3);

for (const value of a) {
	const other: string = value;
}

const b: number[] = [];

assertArrayIndex(b, "b");

for (let p = 0 as Index<typeof a>; p < b.length; p += 1) {
	// @ts-expect-error: number | undefined is not assignable to string
	const value: string = b[p];
}

const c: string[] = [];

assertArrayIndex(c, "c");

for (let p = 0; p < c.length; p += 1) {
	// @ts-expect-error: string | undefined is not assignable to string
	let value: string = c[p];

	// @ts-expect-error: string | undefined is not assignable to string
	value = c[0 as Index<typeof a>];
}

const d: readonly number[] = [];

assertArrayIndex(d, "d");

for (let p = 0 as Index<typeof d>; p < d.length; p += 1) {
	const value: number = d[p];

	// @ts-expect-error: only permits reading
	d[2] = 3;
}

// @ts-expect-error: push does not exist on readonly
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
d.push(3);

const e: [number] = [0];

// @ts-expect-error: [number] is not assignable to never
assertArrayIndex(e, "e");

const f: readonly [boolean] = [false];

// @ts-expect-error: [boolean] is not assignable to never
assertArrayIndex(f, "f");

const tuple = [5, 7] as const;

// @ts-expect-error: readonly [5, 7] is not assignable to never
assertArrayIndex(tuple, "tuple");

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/925/answer
  > View solutions: https://tsch.js.org/925/solutions
  > More Challenges: https://tsch.js.org
*/
