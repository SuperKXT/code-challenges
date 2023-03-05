import { generateCatanBoard, assertValidCatanBoard } from './generate-catan';
import { CATAN_ERRORS } from './generate-catan.types';
import type { CatanError } from './generate-catan.types';

const VALID_BOARDS: string[] = [
	['  B 9 A', ' 5 6 C 8', '6 4 B 5 3', ' 2 8 9 3', '  A . 4'].join('\n'),
	['  B B C', ' 3 A 3 A', '2 4 6 . 6', ' 4 5 9 9', '  8 5 8'].join('\n'),
	['  6 3 8', ' 2 4 5 A', '5 9 . 6 9', ' A B 3 C', '  8 4 B'].join('\n'),
];

interface InvalidBoard {
	board: string;
	error: CatanError;
}

const INVALID_BOARDS: InvalidBoard[] = [
	{
		board: ['  6 3 8', ' 2 4 5 A'].join('\n'),
		error: CATAN_ERRORS.badFormatting,
	},
	{
		board: ['  6 3 8', ' 2 4 5 A', '2 9 . 6 9', ' A B 3 C', '  8 4 B'].join(
			'\n'
		),
		error: CATAN_ERRORS.badPieceCount,
	},
	{
		board: ['  6 3 A', ' 2 4 5 A', '5 9 . 8 9', ' 8 B 3 C', '  6 4 B'].join(
			'\n'
		),
		error: CATAN_ERRORS.badPositioning,
	},
];

describe('testing isValidCatanBoard', () => {
	it.each(VALID_BOARDS)(
		'should assert the valid boards and return',
		(board) => {
			expect(() => assertValidCatanBoard(board)).not.toThrow();
		}
	);
	it.each(INVALID_BOARDS)(
		'should throw the correct error for invalid boards',
		({ board, error }) => {
			expect(() => assertValidCatanBoard(board)).toThrow(error);
		}
	);
});

describe('testing generateCatanBoard', () => {
	it('should generate a 1000 valid catan board', () => {
		expect(() => {
			[...new Array<unknown>(1000)].forEach(() => {
				const board = generateCatanBoard();
				assertValidCatanBoard(board);
			});
		}).not.toThrow();
	});
});
