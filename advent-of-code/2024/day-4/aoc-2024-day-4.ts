export const aoc2024Day4 = (input: string) => {
	const inputArr = input.split("\n");
	const rows = new Map<number, string>();
	const cols = new Map<number, string>();
	const diags = new Map<number, string>();
	const reverseDiags = new Map<number, string>();
	const grid: string[][] = [];

	for (let rowIdx = 0; rowIdx < inputArr.length; rowIdx++) {
		const rowArr = inputArr[rowIdx];
		if (!rowArr?.trim()) continue;

		const gridRow = grid[rowIdx] ?? [];
		if (!grid[rowIdx]) grid.push(gridRow);

		for (let colIdx = 0; colIdx < rowArr.length; colIdx++) {
			const cellVal = rowArr[colIdx];
			if (!cellVal) continue;
			gridRow.push(cellVal);

			rows.set(rowIdx, `${rows.get(rowIdx) ?? ""}${cellVal}`);
			cols.set(colIdx, `${cols.get(colIdx) ?? ""}${cellVal}`);
			const diagIdx = rowIdx - colIdx;
			diags.set(diagIdx, `${diags.get(diagIdx) ?? ""}${cellVal}`);
			const reverseDiagIdx = rowIdx + colIdx;
			reverseDiags.set(
				reverseDiagIdx,
				`${cellVal}${reverseDiags.get(reverseDiagIdx) ?? ""}`,
			);
		}
	}

	const maps = [rows, cols, diags, reverseDiags];
	let xmasCount = 0;
	for (const map of maps) {
		for (const str of map.values()) {
			const matches = [
				...(str.match(/XMAS/gu) ?? []),
				...(str.split("").reverse().join("").match(/XMAS/gu) ?? []),
			];
			xmasCount += matches.length;
		}
	}

	let x_masCount = 0;
	for (let rowIdx = 1; rowIdx < grid.length - 1; rowIdx++) {
		const row = grid[rowIdx];
		if (!row) continue;
		for (let colIdx = 1; colIdx < row.length - 1; colIdx++) {
			const curr = grid[rowIdx]?.[colIdx];
			if (curr !== "A") continue;
			const topLeft = grid[rowIdx - 1]?.[colIdx - 1];
			const topRight = grid[rowIdx - 1]?.[colIdx + 1];
			const bottomLeft = grid[rowIdx + 1]?.[colIdx - 1];
			const bottomRight = grid[rowIdx + 1]?.[colIdx + 1];
			const isDiag1Mas = topLeft === "M" && bottomRight === "S";
			const isDiag1Sam = topLeft === "S" && bottomRight === "M";
			const isDiag2Mas = bottomLeft === "M" && topRight === "S";
			const isDiag2Sam = bottomLeft === "S" && topRight === "M";
			if ((isDiag1Mas || isDiag1Sam) && (isDiag2Mas || isDiag2Sam)) {
				x_masCount++;
			}
		}
	}
	return { xmasCount, x_masCount };
};
