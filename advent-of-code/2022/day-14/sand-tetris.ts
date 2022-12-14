interface Solution {
	sands: number,
	part2: number,
}

interface CoordInput {
	row: number,
	col: number,
}

class Coord {

	row: number;
	col: number;

	constructor(input: CoordInput) {
		this.row = input.row;
		this.col = input.col;
	}

	equals(
		coord: Coord
	) {
		return this.row === coord.row
			&& this.col === coord.col;
	}

	existsIn(coords: Coord[]) {
		return coords.some(coord =>
			coord.row === this.row
			&& coord.col === this.col
		);
	}

}
export const sandTetris = (
	input: string
): Solution => {

	const paths = input.split('\n').map(row =>
		row.split(' -> ').map(coords => new Coord({
			row: Number(coords.split(',')?.[1]),
			col: Number(coords.split(',')?.[0]),
		}))
	);

	const start = new Coord({ row: 0, col: Infinity });
	const end = new Coord({ row: -Infinity, col: 500 });
	const source = new Coord({ row: 0, col: 500 });

	const rocks = paths.reduce(
		(rocks: Coord[], path) => rocks.concat(
			path.reduce(
				(pathRocks: Coord[], from, index) => {

					const to = path[index + 1];
					if (!to) return pathRocks;

					if (
						from.existsIn(rocks)
						&& to.existsIn(rocks)
					) return pathRocks;

					const direction = (
						to.row < from.row
							? 'left'
							: to.row > from.row
								? 'right'
								: to.col < from.col
									? 'up'
									: 'down'
					);

					const curr = new Coord(from);

					while (true) {

						if (curr.row > end.row) end.row = curr.row;
						if (curr.col < start.col) start.col = curr.col;
						if (curr.col > end.col) end.col = curr.col;

						if (!curr.existsIn(rocks)) {
							pathRocks.push(new Coord(curr));
						}

						if (curr.equals(to)) break;

						switch (direction) {
							case 'left': curr.row--; break;
							case 'right': curr.row++; break;
							case 'up': curr.col--; break;
							case 'down': curr.col++; break;
						}

					}

					return pathRocks;

				}
				, []
			)
		)
		, []
	);

	const sands: Coord[] = [];
	const sand = new Coord(source);

	while (true) {
		const obstacles = rocks.concat(sands);
		const isAbyss = (
			sand.row < start.row
			|| sand.row > end.row
			|| sand.col < start.col
			|| sand.col > end.col
		);
		if (isAbyss) break;
		const possibilities = [
			new Coord({ row: sand.row + 1, col: sand.col }),
			new Coord({ row: sand.row + 1, col: sand.col - 1 }),
			new Coord({ row: sand.row + 1, col: sand.col + 1 }),
		];
		const next = possibilities.find(coord =>
			!coord.existsIn(obstacles)
		);
		if (next) {
			sand.row = next.row;
			sand.col = next.col;
		}
		else {
			sands.push(new Coord(sand));
			sand.row = source.row;
			sand.col = source.col;
		}
	}

	let map = '';
	const curr = new Coord(start);
	while (true) {
		if (curr.equals(source)) map += '+';
		else if (curr.existsIn(rocks)) map += '#';
		else if (curr.existsIn(sands)) map += 'o';
		else map += '.';

		if (curr.equals(end)) break;
		else if (curr.col === end.col) {
			curr.row++;
			curr.col = start.col;
			map += '\n';
		}
		else curr.col++;
	}
	console.log(map);

	return {
		sands: sands.length,
		part2: 0,
	};

};
