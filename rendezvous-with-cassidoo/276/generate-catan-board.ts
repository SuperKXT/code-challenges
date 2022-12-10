const singlePieces = ['.', '2', 'C'] as const;

const doublePieces = ['3', '4', '5', '6', '8', '9', 'A', 'B'] as const;

type Cell = (
	| typeof singlePieces[number]
	| typeof doublePieces[number]
);

type Board = [
	RepeatedTuple<Cell, 3>,
	RepeatedTuple<Cell, 4>,
	RepeatedTuple<Cell, 5>,
	RepeatedTuple<Cell, 4>,
	RepeatedTuple<Cell, 3>,
];

type ProspectiveBoard = [
	RepeatedTuple<Cell | '', 3>,
	RepeatedTuple<Cell | '', 4>,
	RepeatedTuple<Cell | '', 5>,
	RepeatedTuple<Cell | '', 4>,
	RepeatedTuple<Cell | '', 3>,
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

const isBadNeighbor = (
	cell: Cell,
	row: number,
	col: number,
	board: ProspectiveBoard
): boolean => {
	if (cell !== '6' && cell !== '8') return false;
	const topLeftCol = row <= 2 ? col - 1 : col;
	const bottomLeftCol = row < 2 ? col : col - 1;
	const neighbors = [
		board[row]?.[col - 1],
		board[row]?.[col + 1],
		board[row - 1]?.[topLeftCol],
		board[row - 1]?.[topLeftCol + 1],
		board[row + 1]?.[bottomLeftCol],
		board[row + 1]?.[bottomLeftCol + 1],
	].filter(Boolean) as Cell[];
	const badCell = cell === '6' ? '8' : '6';
	return neighbors.some(current =>
		current === badCell
	);
};

const generateNextCellIndex = (
	row: number,
	col: number,
	availablePieces: Cell[],
	board: ProspectiveBoard,
	pieces: Cell[] = structuredClone(availablePieces)
): number => {
	if (pieces.length === 1) return 0;
	const index = Math.random() * pieces.length;
	const cell = pieces.splice(index, 1)[0] as Cell;
	if (isBadNeighbor(cell, row, col, board)) {
		return generateNextCellIndex(
			row,
			col,
			availablePieces,
			board,
			pieces
		);
	}
	return availablePieces.indexOf(cell);
};

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

			if (isBadNeighbor(cell, rowIndex, index, board)) {
				throw new Error(CatanErrors.BAD_POSITIONING);
			}

		}
	}

};

export const generateCatanBoard = (): string => {

	const availablePieces = [
		...singlePieces,
		...doublePieces,
		...doublePieces,
	];

	const board: ProspectiveBoard = [
		['', '', ''],
		['', '', '', ''],
		['', '', '', '', ''],
		['', '', '', ''],
		['', '', ''],
	];

	board.forEach((boardRow, row) =>
		boardRow.forEach((_cell, col) => {
			const index = generateNextCellIndex(
				row,
				col,
				availablePieces,
				board
			);
			boardRow[col] = availablePieces.splice(index, 1)[0] as Cell;
		})
	);

	const boardString = board.map((row) =>
		`${' '.repeat(5 - row.length)}${row.join(' ')}`
	).join('\n');

	try {
		assertValidCatanBoard(boardString);
		return boardString;
	}
	catch {
		return generateCatanBoard();
	}

};
