import { numberOfOnes } from './number-of-ones';

const test1 = { answer: 7, number: 14 };
const test2 = { answer: 55, number: 121 };
const test3 = { answer: 0, number: 0 };

test('should find 7 digits for number 14', () => {
	const oneCount = numberOfOnes(test1.number);
	expect(oneCount).toStrictEqual(test1.answer);
});

test('should find 55 digits for number 121', () => {
	const oneCount = numberOfOnes(test2.number);
	expect(oneCount).toStrictEqual(test2.answer);
});

test('should find 0 digits for number < 1', () => {
	const oneCount = numberOfOnes(test3.number);
	expect(oneCount).toStrictEqual(test3.answer);
});
