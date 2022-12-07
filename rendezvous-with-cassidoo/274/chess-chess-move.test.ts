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
		from: 'R',
		to: [0, 0],
		isValid: false,
	},
	{
		board,
		from: 'k',
		to: [0, 1],
		isValid: true,
	},
	{
		board,
		from: 'Q',
		to: [5, 7],
		isValid: false,
	},
];

describe('testing isValidMove', () => {
	it.each(tests)('should tell if the move is valid', ({ isValid, ...params }) => {
		expect(isValidMove(params)).toStrictEqual(isValid);
	});
});
