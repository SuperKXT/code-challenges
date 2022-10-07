export type LinkedListNode<Type> = null | {
	value: Type,
	next: LinkedListNode<Type>,
};
export interface LinkedList<Type> {
	head: LinkedListNode<Type>,
}
