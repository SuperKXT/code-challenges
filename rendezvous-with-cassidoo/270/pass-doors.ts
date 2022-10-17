export const passDoors = <Doors extends number>(
	noOfDoors: Doors,
	passes: number
): number => {
	const doors = new Array<boolean>(noOfDoors).fill(false);
	for (let pass = 1; pass <= passes; pass++) {
		for (let index = pass; index <= noOfDoors; index += pass) {
			doors[index - 1] = !doors[index - 1];
		}
	}
	return doors.filter(Boolean).length;
};
