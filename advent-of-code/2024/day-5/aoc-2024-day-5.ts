export const aoc2024Day5 = (input: string) => {
	const [rules, updates] = input.split('\n\n');
	if (!rules || !updates) throw new Error('Invalid input');

	const afterMap = new Map<string, Set<string>>();
	for (const rule of rules.split('\n')) {
		const [page, afterPage] = rule.split('|');
		if (!page || !afterPage) throw new Error('Invalid rule');
		const set = afterMap.get(page) ?? new Set<string>();
		set.add(afterPage);
		if (!afterMap.has(page)) afterMap.set(page, set);
	}

	let middleSum = 0;
	updateLoop: for (const update of updates.split('\n')) {
		const pages = update.split(',');
		const updateSet = new Set<string>();
		const middle = Number(pages[Math.floor(pages.length / 2)]);
		for (const page of pages) {
			const currSet = afterMap.get(page);
			if (currSet && updateSet.intersection(currSet).size > 0)
				continue updateLoop;
			updateSet.add(page);
		}
		middleSum += middle;
	}

	return { middleSum };
};
