export const singlePieces = ['.', '2', 'C'] as const;

export const doublePieces = ['3', '4', '5', '6', '8', '9', 'A', 'B'] as const;

export type Cell =
	| (typeof singlePieces)[number]
	| (typeof doublePieces)[number];

export type Board = [
	RepeatedTuple<Cell, 3>,
	RepeatedTuple<Cell, 4>,
	RepeatedTuple<Cell, 5>,
	RepeatedTuple<Cell, 4>,
	RepeatedTuple<Cell, 3>
];

export type ProspectiveBoard = [
	RepeatedTuple<Cell | '', 3>,
	RepeatedTuple<Cell | '', 4>,
	RepeatedTuple<Cell | '', 5>,
	RepeatedTuple<Cell | '', 4>,
	RepeatedTuple<Cell | '', 3>
];

const ROW_PIECES = [3, 4, 5, 4, 3] as const;

const PIECE_REGEX = /[0-9ABC.]/;

export const BOARD_REGEX = new RegExp(
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
