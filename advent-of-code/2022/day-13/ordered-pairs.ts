interface Solution {
	indicesSum: number,
	part2: number,
}

type Packet = (number | Packet)[];

const checkPacketOrder = (
	leftPacket: Packet,
	rightPacket: Packet
): boolean | undefined => {
	for (let index = 0; index < leftPacket.length; index++) {
		const left = leftPacket[index] as number | Packet;
		const right = rightPacket[index];
		if (right === undefined) return false;
		else if (
			typeof left === 'number'
			&& typeof right === 'number'
		) {
			if (left < right) return true;
			else if (left > right) return false;
			else continue;
		}
		else {
			const listCheck = checkPacketOrder(
				!Array.isArray(left) ? [left] : left,
				!Array.isArray(right) ? [right] : right
			);
			if (listCheck === undefined) continue;
			return listCheck;
		}
	}
	return (
		leftPacket.length === rightPacket.length
			? undefined
			: true
	);
};

export const orderedPairs = (
	input: string
): Solution => {

	const solution: Solution = {
		indicesSum: 0,
		part2: 0,
	};

	const pairs = input.split('\n\n');

	for (const pair of pairs) {
		const index = pairs.indexOf(pair);
		if (!pair.trim()) continue;
		const [left, right] = pair.split('\n').map(row =>
			JSON.parse(row) as Packet
		);
		if (!left || !right) continue;
		if (checkPacketOrder(left, right)) {
			solution.indicesSum += index + 1;
		}
		else console.log([JSON.stringify(left), JSON.stringify(right)]);
	}

	return solution;

};
