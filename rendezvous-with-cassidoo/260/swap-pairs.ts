import { LinkedList } from '~/helpers/linked-list';

export const swapArrayPairsWithRegex = (
	array: number[]
): number[] => (
	array
		.join('')
		.replace(/(.)(.)/g, '$2$1')
		.split('')
		.map(Number)
);

export const swapArrayPairsWithRecursion = (
	array: number[]
): number[] => {
	const [first, second, ...rest] = array;
	const swapped: number[] = [];
	first && swapped.push(first);
	second && swapped.unshift(second);
	rest.length > 0 && swapped.push(...swapArrayPairsWithRecursion(rest));
	return swapped;
};

export const swapArrayPairsWithLoop = (
	array: number[]
): number[] => {
	const swapped: number[] = [];
	for (let i = 0; i < array.length; i += 2) {
		swapped.push(array[i + 1] ?? array[i] as number);
		array[i + 1] && swapped.push(array[i] as number);
	}
	return swapped;
};

export const swapLinkedListPairs = (
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