import { z } from 'zod';

import { replaceString } from './replace-string.helpers';

test('test replaceString', () => {
	const first = replaceString('example_string_value', '_', ' ');
	expect(first).toBe('example string value');
	z.util.assertEqual<typeof first, 'example string value'>(true);

	const second = replaceString('example_string_value', ' ', '-');
	expect(second).toBe('example_string_value');
	z.util.assertEqual<typeof second, 'example_string_value'>(true);
});
