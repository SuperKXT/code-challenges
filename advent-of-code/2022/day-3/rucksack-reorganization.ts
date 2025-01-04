import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

const LOWER_CASE = "abcdefghijklmnopqrstuvwxyz";
const UPPER_CASE = LOWER_CASE.toUpperCase() as Uppercase<typeof LOWER_CASE>;
const ITEMS = `${LOWER_CASE}${UPPER_CASE}`;

export const rucksackReorganization = async (
	override?: string,
): Promise<{
	commonPriority: number;
	badgePriority: number;
}> => {
	const input =
		override ??
		(await readFile(path.join(config.dirname, "input.txt"), "utf-8"));

	let commonPriority = 0;
	let badgePriority = 0;
	const group: string[] = [];

	for (const row of input.split("\n")) {
		if (!row) continue;

		if (group.length < 3) group.push(row);

		if (group.length === 3) {
			const badge = Array.from(group[0] ?? "").find((item) =>
				group.slice().every((elf) => elf.includes(item)),
			);
			badgePriority += ITEMS.indexOf(badge ?? " ") + 1;
			group.splice(0, 3);
		}

		const firstHalf = row.slice(0, row.length / 2);
		const secondHalf = row.slice(row.length / 2);
		const common = Array.from(firstHalf).find((item) =>
			secondHalf.includes(item),
		);
		commonPriority += ITEMS.indexOf(common ?? " ") + 1;
	}

	return {
		badgePriority,
		commonPriority,
	};
};
