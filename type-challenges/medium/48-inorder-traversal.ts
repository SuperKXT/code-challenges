/*
  3376 - InorderTraversal
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement the type version of binary tree inorder traversal.

  For example:

  ```typescript
  const tree1 = {
    val: 1,
    left: null,
    right: {
      val: 2,
      left: {
        val: 3,
        left: null,
        right: null,
      },
      right: null,
    },
  } as const

  type A = InorderTraversal<typeof tree1> // [1, 3, 2]
  ```

  > View on GitHub: https://tsch.js.org/3376
*/

/* _____________ Your Code Here _____________ */

type TreeNode = {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
};

type InOrderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
	? [...InOrderTraversal<T["left"]>, T["val"], ...InOrderTraversal<T["right"]>]
	: [];

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

const tree1 = {
	val: 1,
	left: null,
	right: {
		val: 2,
		left: {
			val: 3,
			left: null,
			right: null,
		},
		right: null,
	},
} as const;

const tree2 = {
	val: 1,
	left: null,
	right: null,
} as const;

const tree3 = {
	val: 1,
	left: {
		val: 2,
		left: null,
		right: null,
	},
	right: null,
} as const;

const tree4 = {
	val: 1,
	left: null,
	right: {
		val: 2,
		left: null,
		right: null,
	},
} as const;

type _cases = [
	Expect<Equal<InOrderTraversal<null>, []>>,
	Expect<Equal<InOrderTraversal<typeof tree1>, [1, 3, 2]>>,
	Expect<Equal<InOrderTraversal<typeof tree2>, [1]>>,
	Expect<Equal<InOrderTraversal<typeof tree3>, [2, 1]>>,
	Expect<Equal<InOrderTraversal<typeof tree4>, [1, 2]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3376/answer
  > View solutions: https://tsch.js.org/3376/solutions
  > More Challenges: https://tsch.js.org
*/
