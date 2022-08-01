const numberOfOnes = (integer: number): number => {
	if (integer < 1) return 0;
	let oneCount = 0;
	[...new Array(integer)].forEach((_, index) => {
		const current = index + 1;
		const matches = current.toString().match(/1/g);
		if (!matches) return;
		oneCount += matches.length;
	});
	return oneCount;
};

// console.log(numberOfOnes(121));

export {
	numberOfOnes,
};