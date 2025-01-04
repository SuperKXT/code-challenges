export const treeHouse = (
	input: string,
): {
	visible: number;
	scenicScore: number;
} => {
	const forest = input.split("\n").filter(Boolean);
	const firstRow = forest.at(0) as string;
	const lastRow = forest.at(-1) as string;
	const middleRows = forest.slice(1, -1);

	let visible = middleRows.length * 2 + firstRow.length + lastRow.length;
	let scenicScore = 0;

	for (const row of middleRows) {
		const rowIndex = forest.indexOf(row);
		const trees = row.split("").map(Number);

		for (let colIndex = 1; colIndex < trees.length - 1; colIndex++) {
			const current = trees[colIndex] as number;
			const attached = [
				trees.slice(0, colIndex).reverse(),
				trees.slice(colIndex + 1),
				forest
					.slice(0, rowIndex)
					.map((curr) => Number(curr[colIndex]))
					.reverse(),
				forest.slice(rowIndex + 1).map((curr) => Number(curr[colIndex])),
			];
			const isVisible = attached.some((curr) =>
				curr.every((tree) => tree < current),
			);
			if (isVisible) visible++;

			const currentScenicScore = attached.reduce((sum, curr) => {
				let currentSum = 0;
				for (const tree of curr) {
					currentSum++;
					if (tree >= current) break;
				}
				return sum * currentSum;
			}, 1);
			if (currentScenicScore > scenicScore) scenicScore = currentScenicScore;
		}
	}

	return {
		scenicScore,
		visible,
	};
};
