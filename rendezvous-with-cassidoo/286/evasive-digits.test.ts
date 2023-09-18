import { evasiveDigits } from './evasive-digits.js';

test('testing evasiveDigits', () => {
	const result = Array.from({ length: 101 }, (_, index) => index);
	expect(evasiveDigits()).toStrictEqual(result);
});
