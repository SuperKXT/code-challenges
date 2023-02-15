import {
	BlackPiece,
	blackPieces,
	Board,
	ChessErrors,
	ChessResponse,
	IsValidMoveArgs,
	Position,
	Piece,
	square,
	WhitePiece,
	whitePieces,
	coords,
} from './check-chess-move.types';

const assertBoard: AssertFunction<Board> = (board) => {
	if (!Array.isArray(board) || board.length !== 8) {
		throw new Error(ChessErrors.BAD_ROWS);
	}
	for (const row of board) {
		if (!Array.isArray(row) || row.length !== 8) {
			throw new Error(ChessErrors.BAD_COLUMNS);
		}
		if (row.some((cell) => !square.includes(cell))) {
			throw new Error(ChessErrors.BAD_SQUARE);
		}
	}
};

const isEnemy = <P extends Piece>(
	piece: P,
	toCheck: any
): toCheck is P extends WhitePiece ? BlackPiece : WhitePiece => {
	const opposite = (
		whitePieces.includes(piece as any) ? blackPieces : whitePieces
	) as any;
	return opposite.includes(toCheck as any);
};

const isPosition = (value: any): value is Position => {
	return (
		Array.isArray(value) &&
		value.length === 2 &&
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
		const squares = board.split('\n').map((row) => row.split(''));

		assertBoard(squares);

		const piece = squares[row][col];
		const toPiece = squares[toRow][toCol];
		const toSquare = squares[toRow][toCol];

		if (piece === '~') {
			throw new Error(ChessErrors.EMPTY_SPACE);
		}

		if (toPiece !== '~' && !isEnemy(piece, toPiece)) {
			throw new Error(ChessErrors.COLLISION);
		}

		const isKill = toPiece !== '~';

		const path: Position[] = [];

		if (col === toCol && row === toRow) {
			throw new Error(ChessErrors.NO_MOVE);
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
			const isKill =
				toRow === nextRow &&
				(toCol === nextCol || toCol === prevCol) &&
				whitePieces.includes(toSquare as any);
			if (!isMove && !isKill) {
				throw new Error(ChessErrors.BAD_PAWN);
			}
			path.push([row, col], [toRow, toCol]);
			if (toRow === doubleNext) {
				path.splice(1, 0, [doubleNext, col]);
			}
		} else if (piece === 'r' || piece === 'R') {
			if (col !== toCol && row !== toRow) throw new Error(ChessErrors.BAD_ROOK);
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
				throw new Error(ChessErrors.BAD_BISHOP);
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
				throw new Error(ChessErrors.BAD_KNIGHT);
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
				throw new Error(ChessErrors.BAD_QUEEN);
			let currentRow = row;
			let currentCol = col;
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			while (true) {
				path.push([currentRow, currentCol] as Position);
				if (currentRow === toRow && currentCol === toCol) break;
				toRow > row ? currentRow++ : toRow < row ? currentRow-- : undefined;
				toCol > col ? currentCol++ : toCol < col ? currentCol-- : undefined;
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
				throw new Error(ChessErrors.BAD_KING);
			}
			path.push([row, col], [toRow, toCol]);
		}

		path.slice(1, -1).forEach(([x, y]) => {
			if (square[x][y] !== '~') {
				throw new Error(ChessErrors.COLLISION);
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
			error: error.message ?? error,
		};
	}
};
