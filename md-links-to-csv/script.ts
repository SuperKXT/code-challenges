import { readFile, writeFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const generateTable = async () => {
	const file = await readFile(path.join(__dirname, './input.md'), 'utf-8');
	const csv = ['title,status,tag,url'];
	let tag = '';
	for (const line of file.split('\n')) {
		const trimmed = line.trim();
		if (!trimmed) continue;
		if (trimmed.startsWith('- ')) {
			tag = trimmed.replace(/\s*-\s*(.+)\s*/, (_, name) => name);
			continue;
		}
		const match = line.match(/\s*\[(.+)\]\((.+)\)\s*/);
		if (!match) continue;
		csv.push(`"${match[1]?.replace(/\"/g, "`")}","Not Started","${tag}","${match[2]}"`);
	}
	writeFile(path.join(__dirname, 'output.csv'), csv.join('\n'));
}

generateTable();
