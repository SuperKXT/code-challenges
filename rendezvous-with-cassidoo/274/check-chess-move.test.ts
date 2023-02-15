import { isValidMove } from './check-chess-move';
import {
	ChessErrors,
	ChessResponse,
	IsValidMoveArgs,
} from './check-chess-move.types';

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
			isValid: false,
			error: ChessErrors.BAD_ROOK,
		},
	},
	{
		input: {
			board,
			from: [1, 2],
			to: [0, 1],
		},
		response: {
			isValid: true,
			path: [
				[1, 2],
				[0, 1],
			],
			isKill: false,
		},
	},
	{
		input: {
			board,
			from: [1, 2],
			to: [1, 3],
		},
		response: {
			isValid: false,
			error: ChessErrors.COLLISION,
		},
	},
];

describe('testing isValidMove', () => {
	it.each(tests)('should tell if the move is valid', ({ input, response }) => {
		expect(isValidMove(input)).toStrictEqual(response);
	});
});
