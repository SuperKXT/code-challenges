export const invalidError = new Error(
	'the given string must be non-empty and can only contain `/` or `\\`'
);

const piece = [
	'kb',
	'k',
	'R',
	'K',
	'b',
	'p',
	'Q',
] as const;

type Piece = typeof piece[number];

type Row = string;
type Board = string;

type Coord = (
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
);

type Move = [Coord, Coord];

export interface IsValidMoveArgs {
	board: Board,
	piece: Piece,
	move: Move,
}

export const isValidMove = ({
	board,
	piece,
	move,
}: IsValidMoveArgs): boolean => {

	return false;
};
