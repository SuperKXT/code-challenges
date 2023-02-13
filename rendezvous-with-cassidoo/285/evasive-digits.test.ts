import { evasiveDigits } from './evasive-digits';

describe('testing evasiveDigits', () => {
	it('should return array of 0-100 integers', () => {
		const result = Array.from({ length: 101 }, (_, index) => index);
		console.log(result);
		expect(evasiveDigits()).toStrictEqual(result);
	});
});
