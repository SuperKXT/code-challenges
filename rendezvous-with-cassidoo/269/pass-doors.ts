export const passDoors = (noOfDoors: number, passes: number): number => {
	const doors = new Array<boolean>(noOfDoors).fill(false);
	for (let pass = 1; pass <= passes; pass++) {
		for (let index = pass; index <= noOfDoors; index += pass)
			doors[index - 1] = !doors[index - 1];
	}

	return doors.filter(Boolean).length;
};
