const singlePieces = [
	'.',
	'2',
	'12',
] as const;
const doublePieces = [
	'3',
	'5',
	'6',
	'7',
	'8',
	'9',
	'A',
	'B',
	'C',
] as const;

type Cell = (
	| typeof singlePieces[number]
	| typeof doublePieces[number]
);

type Board = [
	[Cell, Cell, Cell],
	[Cell, Cell, Cell, Cell],
	[Cell, Cell, Cell, Cell, Cell],
	[Cell, Cell, Cell, Cell],
	[Cell, Cell, Cell],
];

const ROW_PIECES = [3, 4, 5, 4, 3] as const;

const PIECE_REGEX = /[0-9ABC.]/;

const BOARD_REGEX = new RegExp(
	Array.from({ length: 5 }, (_, index) => {
		const pieces = ROW_PIECES[index] as number;
		return ` {${5 - pieces}}(${PIECE_REGEX.source} ?){${pieces}}`;
	}).join('\n')
);

export enum CatanErrors {
	BAD_FORMATTING = 'The board is not properly formatted',
	BAD_PIECE_COUNT = 'Board must have two each of 3, 4, 5, 6, 8, 9, 10, 11, and one each of 2, 12, and .',
	BAD_POSITIONING = '6 and 8 cells can not touch each other',
}

export const assertValidCatanBoard = (
	input: string
) => {

	if (!BOARD_REGEX.test(input)) {
		throw new Error(CatanErrors.BAD_FORMATTING);
	}
	const board = input.split('\n').map(
		row => row.split(/\s+/).filter(Boolean)
	) as Board;

	const counts: Partial<Record<Cell, number>> = {};

	for (const row of board) {
		const rowIndex = board.indexOf(row);
		for (const cell of row) {

			const index = row.indexOf(cell);

			counts[cell] = (counts[cell] ?? 0) + 1;
			if (
				(
					singlePieces.includes(cell as any)
					&& (counts[cell] ?? 0) > 1
				)
				|| (
					doublePieces.includes(cell as any)
					&& (counts[cell] ?? 0) > 2
				)
			) throw new Error(CatanErrors.BAD_PIECE_COUNT);

			if (cell !== '6' && cell !== '8') continue;

			const lastRowIndex = rowIndex <= 2 ? index - 1 : index;
			const nextRowIndex = rowIndex < 2 ? index : index - 1;
			const neighbors = [
				row[index - 1],
				row[index + 1],
				board[rowIndex - 1]?.[lastRowIndex],
				board[rowIndex - 1]?.[lastRowIndex + 1],
				board[rowIndex + 1]?.[nextRowIndex],
				board[rowIndex + 1]?.[nextRowIndex + 1],
			].filter(Boolean) as Cell[];
			const badCell = cell === '6' ? '8' : '6';
			const badNeighbor = neighbors.some(current =>
				current === badCell
			);

			if (badNeighbor) {
				throw new Error(CatanErrors.BAD_POSITIONING);
			}

		}
	}

};

export const generateCatanBoard = (): string => {

	return '';
};
