export type LinkedListNode<Type = unknown> = {
	value: Type;
	next: LinkedListNode<Type>;
} | null;

export type LinkedList<Type> = {
	head: LinkedListNode<Type>;
};

type InsertToNode<Node extends NonNullable<LinkedListNode>, Val> = Prettify<{
	value: Node['value'];
	next: Node['next'] extends NonNullable<LinkedListNode>
		? InsertToNode<Node['next'], Val>
		: { value: Val; next: null };
}>;

type InsertNode<List extends LinkedList<any>, Val> = Prettify<{
	head: List['head'] extends NonNullable<LinkedListNode>
		? InsertToNode<List['head'], Val>
		: { value: Val; next: null };
}>;

type ArrayToLinkedList<
	Type extends readonly any[],
	Result extends LinkedList<any> = { head: null }
> = number extends Type['length']
	? LinkedList<Type[number]>
	: Type extends readonly [infer First, ...infer Rest]
	? ArrayToLinkedList<Rest, InsertNode<Result, First>>
	: Result;

export const arrayToLinkedList = <const Arr extends readonly any[]>(
	array: Arr
): ArrayToLinkedList<Arr> => {
	const list: LinkedList<unknown> = {
		head: null,
	};
	let lastNode: LinkedListNode = null;

	for (const item of array) {
		const node: LinkedListNode = {
			next: null,
			value: item,
		};

		if (!list.head) {
			list.head = node;
			lastNode = list.head;
		} else if (lastNode) {
			lastNode.next = node;
			lastNode = node;
		}
	}

	return list as ArrayToLinkedList<Arr>;
};

export const insertToLinkedList = <List extends LinkedList<unknown>, const Val>(
	list: List,
	value: Val
): InsertNode<List, Val> => {
	const newNode = { value, next: null };
	if (!list.head) {
		list.head = newNode;
	} else {
		const insertNode = (node: NonNullable<LinkedListNode>) => {
			if (node.next) insertNode(node.next);
			else node.next = newNode;
		};
		insertNode(list.head);
	}
	return list as InsertNode<List, Val>;
};
