import { isValidMove, IsValidMoveArgs } from './check-chess-move';

interface Test extends IsValidMoveArgs {
	isValid: boolean,
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
		board,
		piece: 'R',
		move: [0, 0],
		isValid: false,
	},
	{
		board,
		piece: 'k',
		move: [0, 1],
		isValid: true,
	},
	{
		board,
		piece: 'Q',
		move: [5, 7],
		isValid: false,
	},
];

describe('testing isValidMove', () => {
	it.each(tests)('should tell if the move is valid', ({ isValid, ...params }) => {
		expect(isValidMove(params)).toStrictEqual(isValid);
	});
});
