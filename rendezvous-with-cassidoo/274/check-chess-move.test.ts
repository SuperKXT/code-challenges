import { isValidMove } from './check-chess-move';
import { CHESS_ERRORS } from './check-chess-move.types';

import type { ChessResponse, IsValidMoveArgs } from './check-chess-move.types';

interface Test {
	input: IsValidMoveArgs;
	response: ChessResponse;
}

const board = [
	'~~~~~~~~',
	'~~kb~~~~',
	'~~K~~~~~',
	'~~~~~~~~',
	'~~~~~~~~',
	'~~~~~~~~',
	'~~~~~~~~',
	'~~~R~~~~',
].join('\n');

const tests: Test[] = [
	{
		input: {
			board,
			from: [7, 3],
			to: [0, 0],
		},
		response: {
			error: CHESS_ERRORS.BAD_ROOK,
			isValid: false,
		},
	},
	{
		input: {
			board,
			from: [1, 2],
			to: [0, 1],
		},
		response: {
			isKill: false,
			isValid: true,
			path: [
				[1, 2],
				[0, 1],
			],
		},
	},
	{
		input: {
			board,
			from: [1, 2],
			to: [1, 3],
		},
		response: {
			error: CHESS_ERRORS.COLLISION,
			isValid: false,
		},
	},
];

describe('testing isValidMove', () => {
	it.each(tests)('should tell if the move is valid', ({ input, response }) => {
		expect(isValidMove(input)).toStrictEqual(response);
	});
});
