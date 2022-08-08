export type LinkListNode<Type> = null | {
	value: Type,
	next: LinkListNode<Type>,
};
export interface LinkList<Type> {
	head: LinkListNode<Type>,
}