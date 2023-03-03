const row = [0, 1, 2, 3, 4] as const;
type Row = (typeof row)[number];

const col = [0, 1, 2, 3, 4, 5] as const;
type Col = (typeof col)[number];

interface Position {
	row: Row;
	col: Col;
}

const move = ['R', 'L', 'U', 'D'] as const;
type Move = (typeof move)[number];

const isMove = (value: any): value is Move =>
	typeof value === 'string' && move.includes(value);

const getUniquePositions = (array: Position[]) => {
	return array.reduce<Position[]>((positions, current) => {
		const duplicate = positions.some(
			(position) => current.row === position.row && current.col === position.col
		);
		if (!duplicate) positions.push(current);
		return positions;
	}, []);
};

export const ropeBridge = (
	input: string,
	start: Position = { row: 0, col: 0 }
): {
	firstTail: number;
	lastTail: number;
} => {
	const rope = Array.from({ length: 10 }, () => [
		{ ...start },
	]) as RepeatedTuple<Position[], 9>;

	const head = rope.at(0) as Position[];
	const firstTail = rope.at(1) as Position[];
	const lastTail = rope.at(-1) as Position[];

	for (const current of input.split('\n')) {
		const [direction, repeat] = current.split(' ');
		if (!isMove(direction) || isNaN(Number(repeat))) 
			continue;
		

		[...new Array<undefined>(Number(repeat))].forEach(() => {
			const headPosition = { ...head.at(-1) } as Position;

			switch (direction) {
				case 'R':
					headPosition.col++;
					break;
				case 'L':
					headPosition.col--;
					break;
				case 'U':
					headPosition.row--;
					break;
				case 'D':
					headPosition.row++;
					break;
			}
			head.push(headPosition);

			for (const tail of rope.slice(1)) {
				const index = rope.indexOf(tail);
				const last = rope.at(index - 1) as Position[];

				const lastTailPosition = last.at(-1) as Position;
				const tailPosition = { ...tail.at(-1) } as Position;

				const areAdjacent =
					Math.abs(lastTailPosition.row - tailPosition.row) < 2 &&
					Math.abs(lastTailPosition.col - tailPosition.col) < 2;

				const updateKnot = (key: 'col' | 'row') => {
					if (areAdjacent) return;
					if (tailPosition[key] > lastTailPosition[key]) tailPosition[key]--;
					else if (tailPosition[key] < lastTailPosition[key])
						tailPosition[key]++;
				};

				updateKnot('row');
				updateKnot('col');
				tail.push(tailPosition);
			}
		});
	}

	return {
		firstTail: getUniquePositions(firstTail).length,
		lastTail: getUniquePositions(lastTail).length,
	};
};
