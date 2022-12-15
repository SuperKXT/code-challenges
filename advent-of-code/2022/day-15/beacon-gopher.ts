type MapRow = ('.' | '#')[];
type Map = MapRow[];

interface Solution {
	part1: number,
	part2: number,
}

interface Beacon {
	row: number,
	col: number,
}

interface Sensor {
	row: number,
	col: number,
	beacon: Beacon,
}

export const beaconGopher = (
	input: string,
	row: number
): Solution => {

	const solution: Solution = {
		part1: 0,
		part2: 0,
	};

	const beacons: Beacon[] = [];
	const sensors: Sensor[] = [];

	for (const line of input.split('\n')) {

	}

	return solution;

};
