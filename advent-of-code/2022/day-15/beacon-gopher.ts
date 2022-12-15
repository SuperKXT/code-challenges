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
	beacon: number,
	distance: number,
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
	let startRow = 0;
	let endRow = 0;
	let startCol = 0;
	let endCol = 0;

	const map: Map = [];

	for (const line of input.split('\n')) {
		const [
			sensorCol,
			sensorRow,
			beaconCol,
			beaconRow,
		] = line
			.replace(/(Sensor at x=)|( y=)|( closest beacon is at x=)/g, '')
			.split(/,|:/)
			.map(Number) as [number, number, number, number];

		const distance = (
			Math.abs(sensorRow - beaconRow)
			+ Math.abs(sensorCol + beaconCol)
		);

		const currStartRow = sensorRow - distance;
		const currEndRow = Math.max(sensorRow, beaconRow, sensorRow + distance);
		const currStartCol = sensorCol - distance;
		const currEndCol = Math.max(sensorCol, beaconCol, sensorCol + distance);

		if (startRow > currStartRow) {
			map.unshift(
				...new Array(startRow - currStartRow).fill(
					new Array(endCol - startCol).fill('.')
				)
			);
			startRow = currStartRow;
		}
		if (endRow < currEndRow) {
			map.push(
				...new Array(currEndRow - endRow).fill(
					new Array(endCol - startCol).fill('.')
				)
			);
			endRow = currEndRow;
		}
		if (startCol > currStartCol) startCol = currStartCol;
		if (endCol > currEndCol) endCol = currEndCol;

		const beacon: Beacon = {
			row: beaconRow,
			col: beaconCol,
		};

		const index = beacons.findIndex(({ row, col }) =>
			row === beaconRow && col === beaconCol
		);
		const sensor: Sensor = {
			row: sensorRow,
			col: sensorCol,
			beacon: index === -1 ? beacons.length : index,
			distance,
		};
		if (index === -1) beacons.push(beacon);
		sensors.push(sensor);

	}

	console.log(sensors, beacon);
	console.log(map.map(row => row.join('')).join('\n'));

	return solution;

};
