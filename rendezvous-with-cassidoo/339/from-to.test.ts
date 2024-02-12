import { fromTo } from './from-to.js';

test('testing fromTo against test 1', () => {
	const range = fromTo(0, 3);
	expect(range.next().value).toBe(0);
	expect(range.next().value).toBe(1);
	expect(range.next().value).toBe(2);
	expect(range.next().value).toBeUndefined();
});
