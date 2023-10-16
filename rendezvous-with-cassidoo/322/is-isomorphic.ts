export const isIsomorphic = <T extends string, U extends string>(
	first: T,
	second: U,
): boolean => {
	if (first.length !== second.length) return false;
	const map = new Map<string, string>();
	for (let i = 0; i < first.length; ++i) {
		const f = first[i] as string;
		const s = second[i] as string;
		if (map.has(f) && map.get(f) !== s) return false;
		map.set(f, s);
	}
	return true;
};
