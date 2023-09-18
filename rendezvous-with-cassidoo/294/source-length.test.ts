import { getSourceLength } from './source-length.js';

test('sourceLength should return the number of characters in its source code', async () => {
	const response = await getSourceLength();
	expect(response).toBe('one thousand, eight hundred seventy eight');
});
