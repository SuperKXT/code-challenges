import {
	blackPieces,
	CHESS_ERRORS,
	square,
	whitePieces,
	coords,
} from './check-chess-move.types';

import type {
	BlackPiece,
	Board,
	ChessResponse,
	IsValidMoveArgs,
	Position,
	Piece,
	WhitePiece,
	ChessError,
} from './check-chess-move.types';

const assertBoard: AssertFunction<Board> = (board: any) => {
	if (!Array.isArray(board) || board.length !== 8) {
		throw new Error(CHESS_ERRORS.BAD_ROWS);
	}
	for (const row of board) {
		if (!Array.isArray(row) || row.length !== 8) {
			throw new Error(CHESS_ERRORS.BAD_COLUMNS);
		}
		if (
			row.some((cell) => typeof cell !== 'string' || !square.includes(cell))
		) {
			throw new Error(CHESS_ERRORS.BAD_SQUARE);
		}
	}
};

const isEnemy = <P extends Piece>(
	piece: P,
	toCheck: string
): toCheck is P extends WhitePiece ? BlackPiece : WhitePiece => {
	const opposite = whitePieces.includes(piece) ? blackPieces : whitePieces;
	return opposite.includes(toCheck);
};

const isPosition = (value: any): value is Position => {
	return (
		Array.isArray(value) &&
		value.length === 2 &&
		typeof value[0] === 'number' &&
		typeof value[1] === 'number' &&
		coords.includes(value[0]) &&
		coords.includes(value[1])
	);
};

export const isValidMove = ({
	board,
	from: [row, col],
	to: [toRow, toCol],
}: IsValidMoveArgs): ChessResponse => {
	try {
		const squares = board.split('\n').map((curr) => curr.split(''));

		assertBoard(squares);

		const piece = squares[row][col];
		const toPiece = squares[toRow][toCol];
		const toSquare = squares[toRow][toCol];

		if (piece === '~') {
			throw new Error(CHESS_ERRORS.EMPTY_SPACE);
		}

		if (toPiece !== '~' && !isEnemy(piece, toPiece)) {
			throw new Error(CHESS_ERRORS.COLLISION);
		}

		const isKill = toPiece !== '~';

		const path: Position[] = [];

		if (col === toCol && row === toRow) {
			throw new Error(CHESS_ERRORS.NO_MOVE);
		}

		if (piece === 'p' || piece === 'P') {
			const nextRow = piece === 'p' ? row + 1 : row - 1;
			const start = piece === 'p' ? 1 : 6;
			const doubleNext = piece === 'p' ? start + 2 : start - 2;
			const nextCol = col + 1;
			const prevCol = col - 1;
			const isMove =
				(toRow === nextRow && toCol === col) ||
				(row == start && toRow === doubleNext && toCol === col);
			const isCurrentKill =
				toRow === nextRow &&
				(toCol === nextCol || toCol === prevCol) &&
				whitePieces.includes(toSquare);
			if (!isMove && !isCurrentKill) {
				throw new Error(CHESS_ERRORS.BAD_PAWN);
			}
			path.push([row, col], [toRow, toCol]);
			if (toRow === doubleNext) {
				path.splice(1, 0, [doubleNext, col]);
			}
		} else if (piece === 'r' || piece === 'R') {
			if (col !== toCol && row !== toRow)
				throw new Error(CHESS_ERRORS.BAD_ROOK);
			const isHorizontal = col !== toCol;
			const to = isHorizontal ? toCol : toRow;
			const from = isHorizontal ? col : row;
			let current = from;
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			while (true) {
				path.push([
					isHorizontal ? toRow : current,
					isHorizontal ? current : toCol,
				]);
				if (to === from) break;
				to > from ? current++ : current--;
			}
		} else if (piece === 'b' || piece === 'B') {
			if (Math.abs(toCol - col) !== Math.abs(toRow - row))
				throw new Error(CHESS_ERRORS.BAD_BISHOP);
			let currentRow = row;
			let currentCol = col;
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			while (true) {
				path.push([currentRow, currentCol] as Position);
				if (currentRow === toRow && currentCol === toCol) break;
				toRow > row ? currentRow++ : currentRow--;
				toCol > col ? currentCol++ : currentCol--;
			}
		} else if (piece === 'n' || piece === 'N') {
			const valid = [
				[row - 1, col - 2],
				[row - 1, col + 2],
				[row - 2, col - 1],
				[row - 2, col + 1],
				[row + 1, col - 2],
				[row + 2, col - 1],
				[row + 2, col + 1],
				[row + 1, col + 2],
			].filter(isPosition);
			const isValid = valid.some(([x, y]) => toRow === x && toCol === y);
			if (!isValid) {
				throw new Error(CHESS_ERRORS.BAD_KNIGHT);
			}
			let currentRow = row;
			let currentCol = col;
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			while (true) {
				path.push([currentRow, currentCol] as Position);
				if (currentRow === toRow && currentCol === toCol) break;
				else if (currentRow !== toRow) {
					toRow > row ? currentRow++ : currentRow--;
				} else {
					toCol > col ? currentCol++ : currentCol--;
				}
			}
		} else if (piece === 'q' || piece === 'Q') {
			const isHorizontal = row === toRow && col !== toCol;
			const isVertical = row !== toRow && col === toCol;
			const isDiagonal = Math.abs(toCol - col) !== Math.abs(toRow - row);
			if (!isHorizontal && !isVertical && !isDiagonal)
				throw new Error(CHESS_ERRORS.BAD_QUEEN);
			let currentRow = row;
			let currentCol = col;
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			while (true) {
				path.push([currentRow, currentCol] as Position);
				if (currentRow === toRow && currentCol === toCol) break;
				if (toRow > row) currentRow++;
				else if (toRow < row) currentRow--;
				if (toCol > col) currentCol++;
				else if (toCol < col) currentCol--;
			}
		} else {
			const valid = [
				[row - 1, col - 1],
				[row - 1, col],
				[row - 1, col + 1],
				[row, col - 1],
				[row, col + 1],
				[row + 1, col - 1],
				[row + 1, col],
				[row + 1, col + 1],
			].filter(isPosition);
			const isValid = valid.some(([x, y]) => toRow === x && toCol === y);
			if (!isValid) {
				throw new Error(CHESS_ERRORS.BAD_KING);
			}
			path.push([row, col], [toRow, toCol]);
		}

		path.slice(1, -1).forEach(([x, y]) => {
			if (square[x][y] !== '~') {
				throw new Error(CHESS_ERRORS.COLLISION);
			}
		});

		return {
			isValid: true,
			path,
			isKill,
		};
	} catch (error: any) {
		return {
			isValid: false,
			error: error as ChessError,
		};
	}
};
