/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* cSpell: disable */
/*
  6 - Simple Vue
  -------
  by Anthony Fu (@antfu) #hard #this #application #vue

  ### Question

  Implement a simpiled version of a Vue-like typing support.

  By providing a function name `SimpleVue` (similar to `Vue.extend` or `defineComponent`), it should properly infer the `this` type inside computed and methods.

  In this challenge, we assume that SimpleVue take an Object with `data`, `computed` and `methods` fields as it's only argument,

  - `data` is a simple function that returns an object that exposes the context `this`, but you won't be accessible to other computed values or methods.

  - `computed` is an Object of functions that take the context as `this`, doing some calculation and returns the result. The computed results should be exposed to the context as the plain return values instead of functions.

  - `methods` is an Object of functions that take the context as `this` as well. Methods can access the fields exposed by `data`, `computed` as well as other `methods`. The different between `computed` is that `methods` exposed as functions as-is.

  The type of `SimpleVue`'s return value can be arbitrary.

  ```ts
  const instance = SimpleVue({
    data() {
      return {
        firstname: 'Type',
        lastname: 'Challenges',
        amount: 10,
      }
    },
    computed: {
      fullname() {
        return this.firstname + ' ' + this.lastname
      }
    },
    methods: {
      hi() {
        alert(this.fullname.toLowerCase())
      }
    }
  })
  ```

  > View on GitHub: https://tsch.js.org/6
*/

/* _____________ Your Code Here _____________ */

declare function SimpleVue<
	D extends Record<string, unknown>,
	C extends Record<string, unknown>,
	M extends Record<string, unknown>,
>(
	options: {
		data: (this: void) => D;
		computed: C;
		methods: M;
	} & ThisType<
		D &
			M & {
				[K in keyof C as C[K] extends (...args: any[]) => unknown
					? K
					: never]: C[K] extends (...args: any[]) => unknown
					? ReturnType<C[K]>
					: never;
			}
	>,
): unknown;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

const alert = (_: unknown) => {
	throw new Error("Function not implemented.");
};

SimpleVue({
	data() {
		// @ts-expect-error this not available here
		this.firstname;
		// @ts-expect-error this not available here
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		this.getRandom();
		// @ts-expect-error this not available here
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		this.data();

		return {
			firstname: "Type",
			lastname: "Challenges",
			amount: 10,
		};
	},
	computed: {
		fullname() {
			return `${this.firstname} ${this.lastname}`;
		},
		amountTwice() {
			return this.amount * 2;
		},
	},
	methods: {
		getRandom: () => Math.random(),
		hi() {
			alert(this.amount);
			alert(this.fullname.toLowerCase());
			alert(this.getRandom());
		},
		test() {
			const fullname = this.fullname;
			const _cases: [Expect<Equal<typeof fullname, string>>] = [] as never;
		},
	},
});

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6/answer
  > View solutions: https://tsch.js.org/6/solutions
  > More Challenges: https://tsch.js.org
*/
