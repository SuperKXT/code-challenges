const columnMatcher = /(?<=\|)([^\|\n])*(?=\|)/g;

const formatMarkdownTable = (
	string: string
): string => {

	const rowStrings = string.match(/^.+$/gm);
	const noOfColumns = rowStrings?.[0]?.match(columnMatcher)?.length ?? 0;
	const rowCells = rowStrings?.map(row =>
		row.match(columnMatcher) ?? []
	);

	if (
		!rowStrings
		|| !noOfColumns
		|| !rowCells
	) return '';

	const columnWidths = [...Array(noOfColumns)].map((_, index) =>
		Math.max(
			...rowCells.map(row => row[index]?.trim().length ?? 0)
		)
	);

	return rowCells.map((cells, row) =>
		'| '
		+ [...Array(noOfColumns)].map((_, column) =>
			(cells[column]?.trim() ?? '').padEnd(
				columnWidths[column] ?? 0,
				row === 1 ? '-' : ' '
			)
		).join(' | ')
		+ ' |'
	).join('\n');

};

export {
	formatMarkdownTable,
};