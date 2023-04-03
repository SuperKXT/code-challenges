import { readFile } from 'fs/promises';

import { numberToWords } from '~/helpers/format';

export const getSourceLength = async (): Promise<string> => {
	const file = await readFile(__filename, 'utf-8');
	const lines = file.split('\n').map((row) => row.trim());
	let isFunctionBody = false;
	let length = 0;
	for (const line of lines) {
		const trimmed = line.trim();
		if (
			trimmed ===
			'export const getSourceLength = async (): Promise<string> => {'
		)
			isFunctionBody = true;
		else if (trimmed === '};') break;
		else if (isFunctionBody) length += trimmed.length;
	}
	return numberToWords(length);
};
