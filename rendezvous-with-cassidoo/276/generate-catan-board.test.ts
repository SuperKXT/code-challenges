import {
	generateCatanBoard,
	isValidCatanBoard,
} from './generate-catan-board';

interface ValidityTest {
	board: string,
	isValid: boolean,
}

const validityTests: ValidityTest[] = [
	{
		board: [
			'  B 9 A',
			' 5 6 C 8',
			'6 4 B 5 3',
			' 2 8 9 3',
			'  A. 4',
		].join('\n'),
		isValid: true,
	},
	{
		board: [
			'  B B C',
			' 3 A 3 A',
			'2 4 6 . 6',
			' 4 5 9 9',
			'  8 5 8',
		].join('\n'),
		isValid: true,
	},
	{
		board: [
			'  6 3 8',
			' 2 4 5 A',
			'5 9 . 6 9',
			' A B 3 C',
			'  8 4 B',
		].join('\n'),
		isValid: true,
	},
	{
		board: [
			'  6 3 8',
			' 2 4 5 A',
		].join('\n'),
		isValid: false,
	},
	{
		board: [
			'  6 3 8',
			' 2 4 5 A',
			'2 9 . 6 9',
			' A B 3 C',
			'  8 4 B',
		].join('\n'),
		isValid: false,
	},
	{
		board: [
			'  6 3 A',
			' 2 4 5 A',
			'5 9 . 6 9',
			' 8 B 3 C',
			'  8 4 B',
		].join('\n'),
		isValid: false,
	},
];

describe('testing isValidCatanBoard', () => {
	it.each(validityTests)('should check the validity of the boards', ({ board, isValid }) => {
		expect(isValidCatanBoard(board)).toStrictEqual(isValid);
	});
});

describe('testing generateCatanBoard', () => {
	it('should generate a valid catan board', () => {
		const board = generateCatanBoard();
		expect(isValidCatanBoard(board)).toBeTruthy();
	});
});
