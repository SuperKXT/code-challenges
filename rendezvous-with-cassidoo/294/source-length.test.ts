import { getSourceLength } from './source-length';

test('sourceLength should return the number of characters in its source code', async () => {
	const response = await getSourceLength();
	expect(response).toBe(401);
});
