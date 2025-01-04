import type { Equal, Expect } from "@type-challenges/utils";

type In = {
	prop1: string | number;
	prop2: {
		prop3: boolean | { prop4: 1 | 2 };
	};
};

type Out =
	| {
			prop1: string;
			prop2: {
				prop3: true;
			};
	  }
	| {
			prop1: string;
			prop2: {
				prop3: false;
			};
	  }
	| {
			prop1: string;
			prop2: {
				prop3: { prop4: 1 };
			};
	  }
	| {
			prop1: string;
			prop2: {
				prop3: { prop4: 2 };
			};
	  }
	| {
			prop1: number;
			prop2: {
				prop3: true;
			};
	  }
	| {
			prop1: number;
			prop2: {
				prop3: false;
			};
	  }
	| {
			prop1: number;
			prop2: {
				prop3: { prop4: 1 };
			};
	  }
	| {
			prop1: number;
			prop2: {
				prop3: { prop4: 2 };
			};
	  };

type prettify<T> = { [k in keyof T]: T[k] } & {};

type _distributeVal<T, Key extends keyof T, Val = T[Key]> = Val extends Val
	? nestedDistribute<Omit<T, Key>> &
			Record<Key, Val extends object ? nestedDistribute<Val> : Val>
	: {};

type _distributeOnce<T, Keys extends keyof T = keyof T> = prettify<
	[Keys] extends [never] ? {} : Keys extends Keys ? _distributeVal<T, Keys> : {}
>;

type nestedDistribute<T> = _distributeOnce<_distributeOnce<T>>;

type _Out = nestedDistribute<In>;
//   ^?

type _cases = [Expect<Equal<_Out, Out>>];
