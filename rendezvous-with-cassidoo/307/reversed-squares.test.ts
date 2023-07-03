import { reversedSquare } from './reversed-squares';

test('testing reversedSquares against test 1', () => {
	expect(reversedSquare(9)).toBeTruthy();
});

test('testing reversedSquares against test 2', () => {
	expect(reversedSquare(10)).toBeFalsy();
});

test('testing reversedSquares against test 3', () => {
	expect(reversedSquare(441)).toBeTruthy();
});

test('testing reversedSquares against test 4', () => {
	expect(reversedSquare(25)).toBeFalsy();
});
