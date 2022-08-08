import { LinkedList } from '@helpers/linked-list';

export const swapPairsArray = (array: number[]): number[] => (
	array
		.join('')
		.replace(/(.)(.)/g, '$2$1')
		.split('')
		.map(Number)
);

export const swapPairsLinkList = (
	list: LinkedList<number>
): LinkedList<number> => {
	const swapped = { ...list };
	let node = swapped.head;
	while (
		node
		&& node.value
		&& node.next?.value !== undefined
	) {
		const current = node.next.value;
		node.next.value = node.value;
		node.value = current;
		node = node.next.next;
	}
	return swapped;
};