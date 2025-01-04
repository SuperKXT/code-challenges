import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);

export const config = {
	// eslint-disable-next-line n/no-process-env
	isTest: process.env.NODE_ENV === "test",
	filename,
	dirname: dirname(filename),
};
