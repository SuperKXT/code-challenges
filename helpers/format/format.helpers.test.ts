/* eslint-disable vitest/max-expects */
import { numberToWords } from './format.helpers';

test('should test numberToWords', () => {
	const test1 = {
		response: numberToWords(0),
		expected: 'zero',
	} as const;
	expect(test1.response).toStrictEqual(test1.expected);
	assertType<(typeof test1)['response']>(test1.expected);

	const test2 = {
		response: numberToWords(1),
		expected: 'one',
	} as const;
	expect(test2.response).toStrictEqual(test2.expected);
	assertType<(typeof test2)['response']>(test2.expected);

	const test3 = {
		response: numberToWords(2),
		expected: 'two',
	} as const;
	expect(test3.response).toStrictEqual(test3.expected);
	assertType<(typeof test3)['response']>(test3.expected);

	const test4 = {
		response: numberToWords(3),
		expected: 'three',
	} as const;
	expect(test4.response).toStrictEqual(test4.expected);
	assertType<(typeof test4)['response']>(test4.expected);

	const test5 = {
		response: numberToWords(4),
		expected: 'four',
	} as const;
	expect(test5.response).toStrictEqual(test5.expected);
	assertType<(typeof test5)['response']>(test5.expected);

	const test6 = {
		response: numberToWords(5),
		expected: 'five',
	} as const;
	expect(test6.response).toStrictEqual(test6.expected);
	assertType<(typeof test6)['response']>(test6.expected);

	const test7 = {
		response: numberToWords(6),
		expected: 'six',
	} as const;
	expect(test7.response).toStrictEqual(test7.expected);
	assertType<(typeof test7)['response']>(test7.expected);

	const test8 = {
		response: numberToWords(7),
		expected: 'seven',
	} as const;
	expect(test8.response).toStrictEqual(test8.expected);
	assertType<(typeof test8)['response']>(test8.expected);

	const test9 = {
		response: numberToWords(8),
		expected: 'eight',
	} as const;
	expect(test9.response).toStrictEqual(test9.expected);
	assertType<(typeof test9)['response']>(test9.expected);

	const test10 = {
		response: numberToWords(9),
		expected: 'nine',
	} as const;
	expect(test10.response).toStrictEqual(test10.expected);
	assertType<(typeof test10)['response']>(test10.expected);

	const test11 = {
		response: numberToWords(10),
		expected: 'ten',
	} as const;
	expect(test11.response).toStrictEqual(test11.expected);
	assertType<(typeof test11)['response']>(test11.expected);

	const test12 = {
		response: numberToWords(11),
		expected: 'eleven',
	} as const;
	expect(test12.response).toStrictEqual(test12.expected);
	assertType<(typeof test12)['response']>(test12.expected);

	const test13 = {
		response: numberToWords(12),
		expected: 'twelve',
	} as const;
	expect(test13.response).toStrictEqual(test13.expected);
	assertType<(typeof test13)['response']>(test13.expected);

	const test14 = {
		response: numberToWords(13),
		expected: 'thirteen',
	} as const;
	expect(test14.response).toStrictEqual(test14.expected);
	assertType<(typeof test14)['response']>(test14.expected);

	const test15 = {
		response: numberToWords(14),
		expected: 'fourteen',
	} as const;
	expect(test15.response).toStrictEqual(test15.expected);
	assertType<(typeof test15)['response']>(test15.expected);

	const test16 = {
		response: numberToWords(15),
		expected: 'fifteen',
	} as const;
	expect(test16.response).toStrictEqual(test16.expected);
	assertType<(typeof test16)['response']>(test16.expected);

	const test17 = {
		response: numberToWords(16),
		expected: 'sixteen',
	} as const;
	expect(test17.response).toStrictEqual(test17.expected);
	assertType<(typeof test17)['response']>(test17.expected);

	const test18 = {
		response: numberToWords(17),
		expected: 'seventeen',
	} as const;
	expect(test18.response).toStrictEqual(test18.expected);
	assertType<(typeof test18)['response']>(test18.expected);

	const test19 = {
		response: numberToWords(18),
		expected: 'eighteen',
	} as const;
	expect(test19.response).toStrictEqual(test19.expected);
	assertType<(typeof test19)['response']>(test19.expected);

	const test20 = {
		response: numberToWords(19),
		expected: 'nineteen',
	} as const;
	expect(test20.response).toStrictEqual(test20.expected);
	assertType<(typeof test20)['response']>(test20.expected);

	const test21 = {
		response: numberToWords(20),
		expected: 'twenty',
	} as const;
	expect(test21.response).toStrictEqual(test21.expected);
	assertType<(typeof test21)['response']>(test21.expected);

	const test22 = {
		response: numberToWords(123_456_789),
		expected:
			'one hundred twenty three million, four hundred fifty six thousand, seven hundred eighty nine',
	} as const;
	expect(test22.response).toStrictEqual(test22.expected);
	assertType<(typeof test22)['response']>(test22.expected);

	const test23 = {
		response: numberToWords(100_000),
		expected: 'one hundred thousand',
	} as const;
	expect(test23.response).toStrictEqual(test23.expected);
	assertType<(typeof test23)['response']>(test23.expected);

	const test24 = {
		response: numberToWords(-1_234_567_890),
		expected:
			'minus one billion, two hundred thirty four million, five hundred sixty seven thousand, eight hundred ninety',
	} as const;
	expect(test24.response).toStrictEqual(test24.expected);
	assertType<(typeof test24)['response']>(test24.expected);

	const test25 = {
		response: numberToWords(420),
		expected: 'four hundred twenty',
	} as const;
	expect(test25.response).toStrictEqual(test25.expected);
	assertType<(typeof test25)['response']>(test25.expected);

	const test26 = {
		response: numberToWords(10.2),
		expected: 'ten',
	} as const;
	expect(test26.response).toStrictEqual(test26.expected);
	assertType<(typeof test26)['response']>(test26.expected);

	const test27 = {
		response: numberToWords(43000 as number),
		expected: 'forty three thousand',
	} as const;
	expect(test27.response).toStrictEqual(test27.expected);
	assertType<(typeof test27)['response']>(test27.expected);
});
