const getProduct = (input: string) => {
	const matched = input.match(/\d+/gu);
	const a = Number(matched?.[0]);
	const b = Number(matched?.[1]);
	if (a && b) return a * b;
	return 0;
};
export const aoc2024Day4 = (input: string) => {
	const inputArr = input.split('\n');
	const rows = new Map<number, string | null>();
	const cols = new Map<number, string | null>();
	const diags = new Map<number, string | null>();
	const reverseDiags = new Map<number, string | null>();

	for (let rowIdx = 0; rowIdx < inputArr.length; rowIdx++) {
		const rowArr = inputArr[rowIdx];
		if (!rowArr?.trim()) continue;
		for (let colIdx = 0; colIdx < rowArr.length; colIdx++) {
			const cellVal = rowArr[colIdx];
			if (!cellVal) continue;
			rows.set(rowIdx, `${rows.get(rowIdx) ?? ''}${cellVal}`);
			cols.set(colIdx, `${cols.get(colIdx) ?? ''}${cellVal}`);
			const diagIdx = rowIdx - colIdx;
			diags.set(diagIdx, `${diags.get(diagIdx) ?? ''}${cellVal}`);

			const reverseDiagIdx = rowIdx + colIdx;
			reverseDiags.set(
				reverseDiagIdx,
				`${cellVal}${reverseDiags.get(reverseDiagIdx) ?? ''}`,
			);
		}
	}

	const maps = [rows, cols, diags, reverseDiags];
	const matched: string[] = [];
	let xmasCount = 0;
	for (const map of maps) {
		for (const [key, str] of map.entries()) {
			if (!str) continue;
			const matches = [
				...(str.match(/XMAS/gu) ?? []),
				...(str.split('').reverse().join('').match(/XMAS/gu) ?? []),
			];
			let keepStr = Array.from({ length: str.length }, () => '.').join('');
			for (const match of matches) {
				xmasCount++;
				matched.push(match);
				const idx = str.indexOf(match);
				keepStr =
					keepStr.slice(0, idx) + match + keepStr.slice(idx + match.length);
			}
			map.set(key, keepStr);
		}
	}
	return { xmasCount };
};
