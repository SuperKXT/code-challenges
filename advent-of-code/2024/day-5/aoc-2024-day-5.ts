const getCorrectedPages = (
	pages: string[],
	afterMap: Map<string, Set<string>>,
): string[] => {
	const corrected: string[] = [];
	for (let i = 0; i < pages.length; i++) {
		const page = pages[i] as string;
		const currSet = afterMap.get(page);
		for (let j = 0; j < corrected.length; j++) {
			const p = corrected[j] as string;
			if (currSet?.has(p)) {
				corrected[j] = page;
				corrected.push(p);
				return getCorrectedPages(
					[...corrected, ...pages.slice(i + 1)],
					afterMap,
				);
			}
		}
		corrected.push(page);
	}
	return corrected;
};

export const aoc2024Day5 = (input: string) => {
	const [rules, updates] = input.split("\n\n");
	if (!rules || !updates) throw new Error("Invalid input");

	const afterMap = new Map<string, Set<string>>();
	for (const rule of rules.split("\n")) {
		const [page, afterPage] = rule.split("|");
		if (!page || !afterPage) throw new Error("Invalid rule");
		const set = afterMap.get(page) ?? new Set<string>();
		set.add(afterPage);
		if (!afterMap.has(page)) afterMap.set(page, set);
	}

	let correctSum = 0;
	let incorrectSum = 0;
	for (const update of updates.split("\n")) {
		const pages = update.split(",");
		const updateSet = new Set<string>();
		let isCorrect = true;
		for (const page of pages) {
			const currSet = afterMap.get(page);
			if (currSet && updateSet.intersection(currSet).size > 0) {
				isCorrect = false;
			}
			updateSet.add(page);
		}
		if (isCorrect) {
			const middle = Number(pages[Math.floor(pages.length / 2)]);
			correctSum += middle;
		} else {
			const corrected = getCorrectedPages(pages, afterMap);
			const middle = Number(corrected[Math.floor(corrected.length / 2)]);
			incorrectSum += middle;
		}
	}

	return { correctSum, incorrectSum };
};
