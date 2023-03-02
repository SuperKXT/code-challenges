export type LinkedListNode<Type> = {
	value: Type;
	next: LinkedListNode<Type>;
} | null;
export interface LinkedList<Type> {
	head: LinkedListNode<Type>;
}
