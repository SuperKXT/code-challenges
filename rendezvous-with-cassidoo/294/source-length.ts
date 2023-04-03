import { readFile } from 'fs/promises';

export const getSourceLength = async (): Promise<number> => {
	const file = await readFile(__filename, 'utf-8');
	const lines = file.split('\n').map((row) => row.trim());
	let isProgram = false;
	let length = 0;
	for (const line of lines) {
		const trimmed = line.trim();
		if (
			trimmed ===
			'export const getSourceLength = async (): Promise<number> => {'
		)
			isProgram = true;
		else if (trimmed === '};') break;
		else if (isProgram) length += trimmed.length;
	}
	return length;
};
