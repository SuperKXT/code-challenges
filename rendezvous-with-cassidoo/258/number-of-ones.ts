const numberOfOnes = (integer: number): number => {
	if (integer < 1) return 0;

	return [...new Array<undefined>(integer)].reduce<number>(
		(count, _, index) => {
			const current = index + 1;
			const matches = current.toString().match(/1/gu);
			if (!matches) return count;

			return count + matches.length;
		},
		0,
	);
};

export { numberOfOnes };
