export const blackPieces = [
	'p',
	'r',
	'b',
	'n',
	'q',
	'k',
] as const;
export type BlackPiece = typeof blackPieces[number];

export const whitePieces = [
	'P',
	'R',
	'B',
	'N',
	'Q',
	'K',
] as const;
export type WhitePiece = typeof whitePieces[number];

export const pieces = [
	...blackPieces,
	...whitePieces,
] as const;
export type Piece = typeof pieces[number];

export const square = [
	...pieces,
	'~',
] as const;
export type Square = typeof square[number];

export const coords = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
] as const;

export type Coord = typeof coords[number];

export type Position = [Coord, Coord];

export interface IsValidMoveArgs {
	board: string,
	from: Position,
	to: Position,
}

type Row = RepeatedTuple<Piece | '~', 8>;
export type Board = RepeatedTuple<Row, 8>;

export enum ChessErrors {
	BAD_ROWS = 'board must have 8 rows',
	BAD_COLUMNS = 'board must have 8 columns',
	BAD_SQUARE = 'each square must be a chess piece or an empty space',
	EMPTY_SPACE = 'no piece exists in the starting spot',
	BAD_PAWN = 'pawn can only move forward by one (or two at the start), or take another',
	BAD_ROOK = 'the rook can only move horizontally or vertically',
	BAD_BISHOP = 'the bishop can only move diagonally',
	BAD_KNIGHT = 'the knight can only move in a L shape',
	BAD_QUEEN = 'the queen can only move horizontally, vertically, or diagonally',
	BAD_KING = 'the king can only move one space at a time',
	COLLISION = 'the move can not be completed because a piece is in the way',
	NO_MOVE = 'a move must change the position of a piece',
}

interface AgnosticChessResponse {
	isValid: boolean,
}

interface ErrorChessResponse extends AgnosticChessResponse {
	isValid: false,
	error: ChessErrors,
}

interface ValidChessResponse extends AgnosticChessResponse {
	isValid: true,
	isKill: boolean,
	path: Position[],
}

export type ChessResponse = (
	ErrorChessResponse
	| ValidChessResponse
);
