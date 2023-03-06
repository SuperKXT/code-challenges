import {
	BLACK_PIECES,
	CHESS_ERRORS,
	SQUARE,
	WHITE_PIECES,
	COORDS,
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
	if (!Array.isArray(board) || board.length !== 8)
		throw new Error(CHESS_ERRORS.badRows);

	for (const row of board) {
		if (!Array.isArray(row) || row.length !== 8)
			throw new Error(CHESS_ERRORS.badColumns);

		if (row.some((cell) => typeof cell !== 'string' || !SQUARE.includes(cell)))
			throw new Error(CHESS_ERRORS.badSquare);
	}
};

const isEnemy = <P extends Piece>(
	piece: P,
	toCheck: string
): toCheck is P extends WhitePiece ? BlackPiece : WhitePiece => {
	const opposite = WHITE_PIECES.includes(piece) ? BLACK_PIECES : WHITE_PIECES;
	return opposite.includes(toCheck);
};

const isPosition = (value: any): value is Position => {
	return (
		Array.isArray(value) &&
		value.length === 2 &&
		typeof value[0] === 'number' &&
		typeof value[1] === 'number' &&
		COORDS.includes(value[0]) &&
		COORDS.includes(value[1])
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

		if (piece === '~') throw new Error(CHESS_ERRORS.emptySpace);

		if (toPiece !== '~' && !isEnemy(piece, toPiece))
			throw new Error(CHESS_ERRORS.collision);

		const isKill = toPiece !== '~';

		const path: Position[] = [];

		if (col === toCol && row === toRow) throw new Error(CHESS_ERRORS.noMove);

		if (piece === 'p' || piece === 'P') {
			const nextRow = piece === 'p' ? row + 1 : row - 1;
			const start = piece === 'p' ? 1 : 6;
			const doubleNext = piece === 'p' ? start + 2 : start - 2;
			const nextCol = col + 1;
			const prevCol = col - 1;
			const isMove =
				(toRow === nextRow && toCol === col) ||
				(row === start && toRow === doubleNext && toCol === col);
			const isCurrentKill =
				toRow === nextRow &&
				(toCol === nextCol || toCol === prevCol) &&
				WHITE_PIECES.includes(toSquare);
			if (!isMove && !isCurrentKill) throw new Error(CHESS_ERRORS.badPawn);

			path.push([row, col], [toRow, toCol]);
			if (toRow === doubleNext) path.splice(1, 0, [doubleNext, col]);
		} else if (piece === 'r' || piece === 'R') {
			if (col !== toCol && row !== toRow) throw new Error(CHESS_ERRORS.badRook);
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
				throw new Error(CHESS_ERRORS.badBishop);
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
			const isValid = valid.some(
				([currRow, currCol]) => toRow === currRow && toCol === currCol
			);
			if (!isValid) throw new Error(CHESS_ERRORS.badKnight);

			let currentRow = row;
			let currentCol = col;
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			while (true) {
				path.push([currentRow, currentCol] as Position);
				if (currentRow === toRow && currentCol === toCol) break;
				else if (currentRow !== toRow)
					toRow > row ? currentRow++ : currentRow--;
				else toCol > col ? currentCol++ : currentCol--;
			}
		} else if (piece === 'q' || piece === 'Q') {
			const isHorizontal = row === toRow && col !== toCol;
			const isVertical = row !== toRow && col === toCol;
			const isDiagonal = Math.abs(toCol - col) !== Math.abs(toRow - row);
			if (!isHorizontal && !isVertical && !isDiagonal)
				throw new Error(CHESS_ERRORS.badQueen);
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
			const isValid = valid.some(
				([currRow, currCol]) => toRow === currRow && toCol === currCol
			);
			if (!isValid) throw new Error(CHESS_ERRORS.badKing);

			path.push([row, col], [toRow, toCol]);
		}

		path.slice(1, -1).forEach(([currRow, currCol]) => {
			if (SQUARE[currRow][currCol] !== '~')
				throw new Error(CHESS_ERRORS.collision);
		});

		return {
			isKill,
			isValid: true,
			path,
		};
	} catch (error: any) {
		return {
			error: (error as Error).message as ChessError,
			isValid: false,
		};
	}
};
