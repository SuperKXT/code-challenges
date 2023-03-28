export const findAntiDivisors = (number: number): number[] => {
	const list: number[] = [];
	for (let index = 2; index < number; index++) {
		const remainder = number % index;
		if (index % 2 === 0) {
			if (remainder === index / 2) list.push(index);
		} else if (remainder === (index + 1) / 2 || remainder === (index - 1) / 2) {
			list.push(index);
		}
	}
	return list;
};
