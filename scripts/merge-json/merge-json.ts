import { readFile, writeFile } from "node:fs/promises";

import { z } from "zod";

import { stringifyError } from "../../helpers/error.helpers.js";

const PARAMS_SCHEMA = z.tuple([z.string(), z.string()]).rest(z.string());

const [source, ...targets] = PARAMS_SCHEMA.parse(process.argv.slice(2));

const sourceFile = JSON.parse(await readFile(source, "utf-8")) as Record<
	string,
	unknown
>;

await Promise.all(
	targets.map(async (target) => {
		let targetFile: Record<string, unknown> = {};
		try {
			targetFile = JSON.parse(await readFile(target, "utf-8")) as never;
			console.info(`Merging ${target}`);
		} catch (error) {
			console.error(`Error merging ${target}: ${stringifyError(error)}`);
		}
		for (const key in targetFile) {
			if (!Object.hasOwn(targetFile, key)) continue;
			if (Object.hasOwn(sourceFile, key)) continue;
			console.info(`Adding ${key}`);
			sourceFile[key] = targetFile[key];
		}
	}),
);

await writeFile(source, JSON.stringify(sourceFile, null, "\t"));

console.info("Done!");
