interface Solution {
	part1: number;
	part2: number;
}

interface CoordInput {
	row: number;
	col: number;
}

class Coord {
	row: number;
	col: number;

	constructor(input: CoordInput) {
		this.row = input.row;
		this.col = input.col;
	}

	equals(coord: Coord) {
		return this.row === coord.row && this.col === coord.col;
	}

	existsIn(coords: Coord[]) {
		return coords.some(
			(coord) => coord.row === this.row && coord.col === this.col
		);
	}
}

type MapRow = ('.' | '+' | '#' | 'o')[];
type Map = MapRow[];

const source = new Coord({ row: 0, col: 500 });
const rowLength = source.col * 2;

const getLanding = (
	map: Map,
	row: number = source.row,
	col: number = source.col
): null | Coord => {
	const mapRow = map[row];
	if (!mapRow || mapRow[col] !== '.' || !map[row + 1]) return null;
	const colOffset = [0, -1, 1].find(
		(offset) => map[row + 1]?.[col + offset] === '.'
	);
	if (colOffset !== undefined) {
		row++;
		col += colOffset;
		return getLanding(map, row, col);
	} else {
		return new Coord({ row, col });
	}
};

export const sandTetris = (input: string): Solution => {
	const solution: Solution = {
		part1: 0,
		part2: 0,
	};

	const paths = input.split('\n').map((row) =>
		row.split(' -> ').map(
			(coords) =>
				new Coord({
					row: Number(coords.split(',')[1]),
					col: Number(coords.split(',')[0]),
				})
		)
	);

	const start = new Coord({ row: 0, col: Infinity });
	const end = new Coord({ row: -Infinity, col: 500 });

	const rocks = paths.reduce(
		(rocks: Coord[], path) =>
			rocks.concat(
				path.reduce((pathRocks: Coord[], from, index) => {
					const to = path[index + 1];
					if (!to) return pathRocks;

					if (from.existsIn(rocks) && to.existsIn(rocks)) return pathRocks;

					const direction =
						to.row < from.row
							? 'left'
							: to.row > from.row
							? 'right'
							: to.col < from.col
							? 'up'
							: 'down';

					const curr = new Coord(from);

					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					while (true) {
						if (curr.row > end.row) end.row = curr.row;
						if (curr.col < start.col) start.col = curr.col;
						if (curr.col > end.col) end.col = curr.col;

						if (!curr.existsIn(rocks)) {
							pathRocks.push(new Coord(curr));
						}

						if (curr.equals(to)) break;

						switch (direction) {
							case 'left':
								curr.row--;
								break;
							case 'right':
								curr.row++;
								break;
							case 'up':
								curr.col--;
								break;
							case 'down':
								curr.col++;
								break;
						}
					}

					return pathRocks;
				}, [])
			),
		[]
	);

	const part1Map: Map = [...new Array(end.row + 1)].map(() =>
		[...new Array(rowLength)].fill('.')
	);
	rocks.forEach(({ row, col }) => {
		const mapRow = part1Map[row];
		if (mapRow) (part1Map[row] as MapRow)[col] = '#';
	});
	const part2Map: Map = structuredClone(part1Map);
	part2Map.push(new Array(rowLength).fill('.'), new Array(rowLength).fill('#'));

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	while (true) {
		const coord = getLanding(part1Map);
		if (!coord) break;
		const { row, col } = coord;
		(part1Map[row] as MapRow)[col] = 'o';
		solution.part1++;
	}

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	while (true) {
		const coord = getLanding(part2Map);
		if (!coord) break;
		const { row, col } = coord;
		(part2Map[row] as MapRow)[col] = 'o';
		solution.part2++;
	}

	return solution;
};
