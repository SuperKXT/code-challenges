type Visited = Map<`${number}${number}`, true>;
type Item = 0 | 1;

const exploreIsland = (
	arr: Item[][],
	row: number,
	col: number,
	visited: Visited,
): number => {
	const curr = arr[row]?.[col];
	if (!curr || visited.has(`${row}${col}`)) return 0;
	visited.set(`${row}${col}`, true);
	let length = 1;
	length += exploreIsland(arr, row, col + 1, visited);
	length += exploreIsland(arr, row, col - 1, visited);
	length += exploreIsland(arr, row + 1, col, visited);
	length += exploreIsland(arr, row - 1, col, visited);
	return length;
};
export const largestIsland = (arr: Item[][]): number => {
	const visited: Visited = new Map();
	let largest: number = 0;
	for (let row = 0; row < arr.length; row++) {
		for (let col = 0; col < (arr[row] as number[]).length; col++) {
			const currLength = exploreIsland(arr, row, col, visited);
			largest = Math.max(largest, currLength);
		}
	}
	return largest;
};
