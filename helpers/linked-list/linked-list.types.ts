export type LinkedListNode<Type> = {
	value: Type;
	next: LinkedListNode<Type>;
} | null;
export type LinkedList<Type> = {
	head: LinkedListNode<Type>;
}
