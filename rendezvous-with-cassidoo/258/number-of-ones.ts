const numberOfOnes = (integer: number): number => {
	if (integer < 1) return 0;
	return [...new Array(integer)].reduce((count, _, index) => {
		const current = index + 1;
		const matches = current.toString().match(/1/g);
		if (!matches) return count;
		return (count += matches.length);
	}, 0);
};

// console.log(numberOfOnes(14));

export { numberOfOnes };
