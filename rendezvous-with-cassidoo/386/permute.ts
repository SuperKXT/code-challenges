const getPermutations = (str: string, prev: string = ""): string[] => {
	if (str === "") return [prev];
	const res: string[] = [];
	let traversed = "";
	for (let i = 0; i < str.length; i++) {
		const curr = str[i];
		if (curr === undefined) continue;
		const remaining = str.slice(i + 1);
		const rest = `${traversed}${remaining}`;
		const newPrev = `${prev}${curr}`;
		res.push(...getPermutations(rest, newPrev));
		traversed += curr;
	}
	return res;
};

export const permute = (year: string): string[] => {
	return getPermutations(year);
};
