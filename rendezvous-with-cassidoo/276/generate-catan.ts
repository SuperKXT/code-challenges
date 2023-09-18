import {
	BOARD_REGEX,
	CATAN_ERRORS,
	DOUBLE_PIECES,
	SINGLE_PIECES,
} from './generate-catan.types.js';

import type { Board, Cell, ProspectiveBoard } from './generate-catan.types.js';

const isBadNeighbor = (
	cell: Cell,
	row: number,
	col: number,
	board: ProspectiveBoard,
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
	].filter(Boolean);
	const badCell = cell === '6' ? '8' : '6';
	return neighbors.some((current) => current === badCell);
};

export const assertValidCatanBoard = (input: string) => {
	if (!BOARD_REGEX.test(input)) throw new Error(CATAN_ERRORS.badFormatting);

	const board = input
		.split('\n')
		.map((row) => row.split(/\s+/u).filter(Boolean)) as Board;

	const counts: Partial<Record<Cell, number>> = {};

	board.forEach((row, rowIndex) => {
		row.forEach((cell, index) => {
			counts[cell] = Number(counts[cell] ?? 0) + 1;
			if (
				(SINGLE_PIECES.includes(cell as string) && (counts[cell] ?? 0) > 1) ||
				(DOUBLE_PIECES.includes(cell as string) && (counts[cell] ?? 0) > 2)
			)
				throw new Error(CATAN_ERRORS.badPieceCount);

			if (isBadNeighbor(cell, rowIndex, index, board))
				throw new Error(CATAN_ERRORS.badPositioning);
		});
	});
};

const generateNextCellIndex = (
	row: number,
	col: number,
	availablePieces: Cell[],
	board: ProspectiveBoard,
	pieces: Cell[] = structuredClone(availablePieces),
): number => {
	if (pieces.length === 1) return 0;

	const index = Math.random() * pieces.length;
	const cell = pieces.splice(index, 1)[0] as Cell;
	if (isBadNeighbor(cell, row, col, board))
		return generateNextCellIndex(row, col, availablePieces, board, pieces);

	return availablePieces.indexOf(cell);
};

export const generateCatanBoard = (): string => {
	const availablePieces = [
		...SINGLE_PIECES,
		...DOUBLE_PIECES,
		...DOUBLE_PIECES,
	];

	const board: ProspectiveBoard = [
		['', '', ''],
		['', '', '', ''],
		['', '', '', '', ''],
		['', '', '', ''],
		['', '', ''],
	];

	board.forEach((boardRow, row) => {
		boardRow.forEach((_cell, col) => {
			const index = generateNextCellIndex(row, col, availablePieces, board);
			boardRow[col] = availablePieces.splice(index, 1)[0] as Cell;
		});
	});

	try {
		const boardString = board
			.map((row) => `${' '.repeat(5 - row.length)}${row.join(' ')}`)
			.join('\n');
		assertValidCatanBoard(boardString);
		return boardString;
	} catch {
		return generateCatanBoard();
	}
};
