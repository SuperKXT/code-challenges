export const tuningTrouble = (
	input: string,
): {
	packetMarker: number;
	messageMarker: number;
} => {
	const solution = {
		messageMarker: 0,
		packetMarker: 0,
	};

	for (let index = 0; index < input.length; index++) {
		if (index <= 4) continue;

		if (!solution.packetMarker) {
			const isPacketMarker =
				[...new Set(input.slice(index - 4, index).split(""))].length === 4;
			if (isPacketMarker) solution.packetMarker = index;
		}

		if (index <= 14) continue;

		if (!solution.messageMarker) {
			const isMessageMarker =
				[...new Set(input.slice(index - 14, index).split(""))].length === 14;
			if (isMessageMarker) solution.messageMarker = index;
		}

		if (solution.packetMarker && solution.messageMarker) break;
	}

	return solution;
};
