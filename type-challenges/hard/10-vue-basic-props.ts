/* eslint-disable @typescript-eslint/no-unused-expressions */
/** cSpell: disable */
/*
  213 - Vue Basic Props
  -------
  by Anthony Fu (@antfu) #hard #vue #application

  ### Question

  **This challenge continues from [6 - Simple Vue](//tsch.js.org/6), you should finish that one first, and modify your code based on it to start this challenge**.

  In addition to the Simple Vue, we are now having a new `props` field in the options. This is a simplified version of Vue's `props` option. Here are some of the rules.

  `props` is an object containing each field as the key of the real props injected into `this`. The injected props will be accessible in all the context including `data`, `computed`, and `methods`.

  A prop will be defined either by a constructor or an object with a `type` field containing constructor(s).

  For example

  ```js
  props: {
    foo: Boolean
  }
  // or
  props: {
    foo: { type: Boolean }
  }
  ```

  should be inferred to `type Props = { foo: boolean }`.

  When passing multiple constructors, the type should be inferred to a union.

  ```ts
  props: {
    foo: { type: [Boolean, Number, String] }
  }
  // -->
  type Props = { foo: boolean | number | string }
  ```

  When an empty object is passed, the key should be inferred to `any`.

  For more specified cases, check out the Test Cases section.

  > `required`, `default`, and array props in Vue are not considered in this challenge.

  > View on GitHub: https://tsch.js.org/213
*/

/* _____________ Your Code Here _____________ */

type PropConstructor<T = any> =
	| (new (...args: any[]) => T & object)
	| (() => T);

type PropType<T> = PropConstructor<T> | PropConstructor<T>[];
type Prop<T = any> = PropType<T> | { type?: PropType<T> };

type PropsType = Record<string, Prop>;

type ExtractProps<T extends PropsType> = {
	[K in keyof T]: T[K] extends Prop<infer U>
		? unknown extends U
			? any
			: U
		: never;
};

declare function VueBasicProps<
	P extends PropsType,
	D extends Record<string, any>,
	C extends Record<string, any>,
	M extends Record<string, any>,
>(
	options: {
		props: P;
		data: (this: ExtractProps<P>) => D;
		computed: C;
		methods: M;
	} & ThisType<
		ExtractProps<P> &
			D &
			M & {
				[K in keyof C as C[K] extends (...args: any[]) => any
					? K
					: never]: ReturnType<C[K]>;
			}
	>,
): any;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Debug, Equal, Expect, IsAny } from "@type-challenges/utils";

const alert = (_: any) => {
	throw new Error("Function not implemented.");
};

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ClassA {}

// eslint-disable-next-line new-cap
VueBasicProps({
	props: {
		propA: {},
		propB: { type: String },
		propC: { type: Boolean },
		propD: { type: ClassA },
		propE: { type: [String, Number] },
		propF: RegExp,
	},
	data(this) {
		// eslint-disable-next-line @typescript-eslint/no-shadow
		type PropsType = Debug<typeof this>;
		type _cases = [
			Expect<IsAny<PropsType["propA"]>>,
			Expect<Equal<PropsType["propB"], string>>,
			Expect<Equal<PropsType["propC"], boolean>>,
			Expect<Equal<PropsType["propD"], ClassA>>,
			Expect<Equal<PropsType["propE"], string | number>>,
			Expect<Equal<PropsType["propF"], RegExp>>,
		];

		// @ts-expect-error not available here
		this.firstname;
		// @ts-expect-error not available here
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		this.getRandom();
		// @ts-expect-error not available here
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
	},
	methods: {
		getRandom() {
			return Math.random();
		},
		hi() {
			alert(this.fullname.toLowerCase());
			alert(this.getRandom());
		},
		test() {
			const fullname = this.fullname;
			const propE = this.propE;
			type _cases = [
				Expect<Equal<typeof fullname, string>>,
				Expect<Equal<typeof propE, string | number>>,
			];
		},
	},
});

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/213/answer
  > View solutions: https://tsch.js.org/213/solutions
  > More Challenges: https://tsch.js.org
*/
