import { isValidMove } from './check-chess-move';
import { CHESS_ERRORS } from './check-chess-move.types';

import type { ChessResponse, IsValidMoveArgs } from './check-chess-move.types';

type Test = {
	input: IsValidMoveArgs;
	response: ChessResponse;
};

const BOARD = [
	'~~~~~~~~',
	'~~kb~~~~',
	'~~K~~~~~',
	'~~~~~~~~',
	'~~~~~~~~',
	'~~~~~~~~',
	'~~~~~~~~',
	'~~~R~~~~',
].join('\n');

const TESTS: Test[] = [
	{
		input: {
			board: BOARD,
			from: [7, 3],
			to: [0, 0],
		},
		response: {
			error: CHESS_ERRORS.badRook,
			isValid: false,
		},
	},
	{
		input: {
			board: BOARD,
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
			board: BOARD,
			from: [1, 2],
			to: [1, 3],
		},
		response: {
			error: CHESS_ERRORS.collision,
			isValid: false,
		},
	},
];

test.each(TESTS)('testing isValidMove', ({ input, response }) => {
	expect(isValidMove(input)).toStrictEqual(response);
});
