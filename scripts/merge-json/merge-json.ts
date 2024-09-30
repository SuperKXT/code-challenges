import { readFile, writeFile } from 'fs/promises';

import { z } from 'zod';

const PARAMS_SCHEMA = z
	.tuple([z.unknown(), z.unknown(), z.string(), z.string()])
	.rest(z.string());

const [source, ...targets] = PARAMS_SCHEMA.parse(process.argv.slice(2));

const sourceFile = JSON.parse(await readFile(source, 'utf-8')) as Record<
	string,
	unknown
>;

await Promise.all(
	targets.map(async (target) => {
		const targetFile = JSON.parse(await readFile(target, 'utf-8')) as Record<
			string,
			unknown
		>;
		for (const key in targetFile) {
			if (!Object.hasOwn(targetFile, key)) continue;
			if (Object.hasOwn(sourceFile, key)) continue;
			console.info(`Adding ${key}`);
			sourceFile[key] = targetFile[key];
		}
	}),
);

console.log(source);
console.log(Object.keys(sourceFile).length);

await writeFile(source, JSON.stringify(sourceFile, null, '\t'));

console.info('Done!');
