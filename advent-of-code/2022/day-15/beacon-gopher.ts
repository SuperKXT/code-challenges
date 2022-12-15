interface Point {
	row: number,
	col: number,
}
interface Sensor extends Point {
	beacon: Point,
	distance: number,
}

const getDistance = (
	from: Point,
	to: Point
): number => (
	Math.abs(to.row - from.row)
	+ Math.abs(to.col - from.col)
);

const equal = (
	a: Point,
	b: Point
) => a.row === b.row && a.col === b.col;

export const beaconGopher1 = (
	input: string,
	row: number
): number => {

	let solution = 0;

	const sensors: Sensor[] = [];
	let startRow = 0;
	let endRow = 0;
	let startCol = 0;
	let endCol = 0;

	for (const line of input.split('\n')) {
		const [
			sensorCol,
			sensorRow,
			beaconCol,
			beaconRow,
		] = line
			.replace(/(Sensor at x=)|( y=)|( closest beacon is at x=)/g, '')
			.split(/\,|\:/g)
			.map(Number) as [number, number, number, number];

		const beacon: Point = {
			row: beaconRow,
			col: beaconCol,
		};

		const distance = getDistance(
			{ row: sensorRow, col: sensorCol },
			beacon
		);

		const sensor: Sensor = {
			row: sensorRow,
			col: sensorCol,
			beacon,
			distance,
		};

		const currStartRow = sensorRow - distance;
		const currEndRow = Math.max(sensorRow, beaconRow, sensorRow + distance);
		const currStartCol = sensorCol - distance;
		const currEndCol = Math.max(sensorCol, beaconCol, sensorCol + distance);

		if (startRow > currStartRow) startRow = currStartRow;
		if (endRow < currEndRow) endRow = currEndRow;
		if (startCol > currStartCol) startCol = currStartCol;
		if (endCol < currEndCol) endCol = currEndCol;

		sensors.push(sensor);

	}

	for (let col = startCol; col <= endCol; col++) {
		const point = { row, col };
		let isCovered = false;
		for (const sensor of sensors) {
			const isSensorOrBeacon = (
				equal(point, sensor)
				|| equal(point, sensor.beacon)
			);
			if (isSensorOrBeacon) break;
			if (sensor.distance >= getDistance(point, sensor)) {
				isCovered = true;
				break;
			}
		}
		if (isCovered) solution++;
	}

	return solution;

};

export const beaconGopher2 = (
	input: string,
	max: number
): number => {

	const sensors: Sensor[] = [];
	let startRow = 0;
	let endRow = 0;
	let startCol = 0;
	let endCol = 0;

	for (const line of input.split('\n')) {
		const [
			sensorCol,
			sensorRow,
			beaconCol,
			beaconRow,
		] = line
			.replace(/(Sensor at x=)|( y=)|( closest beacon is at x=)/g, '')
			.split(/\,|\:/g)
			.map(Number) as [number, number, number, number];

		const beacon: Point = {
			row: beaconRow,
			col: beaconCol,
		};

		const distance = getDistance(
			{ row: sensorRow, col: sensorCol },
			beacon
		);

		const sensor: Sensor = {
			row: sensorRow,
			col: sensorCol,
			beacon,
			distance,
		};

		const currStartRow = sensorRow - distance;
		const currEndRow = Math.max(sensorRow, beaconRow, sensorRow + distance);
		const currStartCol = sensorCol - distance;
		const currEndCol = Math.max(sensorCol, beaconCol, sensorCol + distance);

		if (startRow > currStartRow) startRow = currStartRow;
		if (endRow < currEndRow) endRow = currEndRow;
		if (startCol > currStartCol) startCol = currStartCol;
		if (endCol < currEndCol) endCol = currEndCol;

		sensors.push(sensor);

	}

	for (let row = 0; row <= max; row++) {
		for (let col = 0; col <= max; col++) {
			const point = { row, col };
			let isCovered = false;
			for (const sensor of sensors) {
				const isSensorOrBeacon = (
					equal(point, sensor)
					|| equal(point, sensor.beacon)
				);
				if (isSensorOrBeacon) {
					isCovered = true;
					break;
				}
				if (sensor.distance >= getDistance(point, sensor)) {
					isCovered = true;
					break;
				}
			}
			if (!isCovered) {
				return col * 4000000 + row;
			}
		}
	}

	return 0;

};
