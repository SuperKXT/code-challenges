import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const campCleanup = async (
	override?: string,
): Promise<{
	overlap: number;
	fullOverlap: number;
}> => {
	const input =
		override ??
		(await readFile(path.join(config.dirname, "input.txt"), "utf-8"));

	return input.split("\n").reduce(
		(object, row) => {
			if (!row) return object;

			const [elfA, elfB] = row.split(",");
			const [elfOneStart = 0, elfOneEnd = 0] =
				elfA?.split("-").map(Number) ?? [];
			const [elfTwoStart = 0, elfTwoEnd = 0] =
				elfB?.split("-").map(Number) ?? [];

			const isOneInTwo = elfOneStart >= elfTwoStart && elfOneEnd <= elfTwoEnd;
			const isTwoInOne = elfTwoStart >= elfOneStart && elfTwoEnd <= elfOneEnd;
			const isOverlap = elfOneStart <= elfTwoEnd && elfTwoStart <= elfOneEnd;

			if (isOverlap) object.overlap++;

			if (isOneInTwo || isTwoInOne) object.fullOverlap++;

			return object;
		},
		{ fullOverlap: 0, overlap: 0 },
	);
};
