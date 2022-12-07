import {
	BlackPiece,
	blackPieces,
	Board,
	ChessErrors,
	ChessResponse,
	IsValidMoveArgs,
	Move,
	Piece,
	square,
	WhitePiece,
	whitePieces,
} from './check-chess-move.types';

const assertBoard: AssertFunction<Board> = (board) => {
	if (!Array.isArray('board') || board.length !== 8) {
		throw new Error(ChessErrors.BAD_ROWS);
	}
	for (const row of board) {
		if (!Array.isArray(row) || row.length !== 8) {
			throw new Error(ChessErrors.BAD_COLUMNS);
		}
		if (row.some(cell => square.includes(cell))) {
			throw new Error(ChessErrors.BAD_SQUARE);
		}
	}
};

const getIsEnemy = <
	P extends Piece
>(
	piece: P,
	toCheck: any
): toCheck is (P extends WhitePiece ? BlackPiece : WhitePiece) => {
	const opposite = (
		whitePieces.includes(piece as any)
			? blackPieces
			: whitePieces
	) as any;
	return opposite.includes(toCheck as any);
};

export const isValidMove = ({
	board,
	from: [row, col],
	to: [toRow, toCol],
}: IsValidMoveArgs): ChessResponse => {

	const squares = board.split('\n').map(row => row.split(''));

	assertBoard(squares);

	const piece = squares[row][col];
	const toPiece = squares[toRow][toCol];
	const toSquare = squares[toRow][toCol];

	if (piece === '~') {
		throw new Error(ChessErrors.EMPTY_SPACE);
	}

	if (
		toPiece !== '~'
		&& !getIsEnemy(piece, toPiece)
	) {
		throw new Error(ChessErrors.COLLISION);
	}

	const path: Move[] = [];

	if (col === toCol && row === toRow) {
		throw new Error(ChessErrors.NO_MOVE);
	}

	if (piece === 'p' || piece === 'P') {
		const nextRow = piece === 'p' ? row + 1 : row - 1;
		const start = piece === 'p' ? 1 : 6;
		const doubleNext = piece === 'p' ? start + 2 : start - 2;
		const nextCol = col + 1;
		const prevCol = col - 1;
		const isMove = (
			(
				toRow === nextRow
				&& toCol === col
			)
			|| (
				row == start
				&& toRow === doubleNext
				&& toCol === col
			)
		);
		const isKill = (
			toRow === nextRow
			&& (toCol === nextCol || toCol === prevCol)
			&& whitePieces.includes(toSquare as any)
		);
		if (!isMove && !isKill) {
			throw new Error(ChessErrors.BAD_PAWN);
		}
		path.push([toRow, toCol]);
	}
	if (piece === 'r' || piece === 'R') {
		if (
			col !== toCol
			&& row !== toRow
		) throw new Error(ChessErrors.BAD_ROOK);
		const isHorizontal = col !== toCol;
		const to = isHorizontal ? toCol : toRow;
		const from = isHorizontal ? col : row;
		let current = (to > from ? from + 1 : from - 1) as Coord;
		while (current !== to) {
			path.push([
				isHorizontal ? toRow : current,
				isHorizontal ? current : toCol,
			]);
			to > from ? current++ : current--;
		}
	}
	if (piece === 'b' || piece === 'B') {
		if (
			Math.abs(toCol - col)
			!== Math.abs(toRow - row)
		) throw new Error(ChessErrors.BAD_BISHOP);
		let currentRow = (toRow > row ? row + 1 : row - 1) as Coord;
		let currentCol = (toCol > col ? col + 1 : col - 1) as Coord;
		while (currentRow !== toRow && currentCol !== toCol) {
			path.push([
				currentRow,
				currentCol,
			]);
			toRow > row ? currentRow++ : currentRow--;
			toCol > col ? currentCol++ : currentCol--;
		}
	}

	path.slice(0, -1).forEach(([x, y]) => {
		if (squares[x][y] !== '~') {
			throw new Error(ChessErrors.COLLISION);
		}
	});

	return true;

};
