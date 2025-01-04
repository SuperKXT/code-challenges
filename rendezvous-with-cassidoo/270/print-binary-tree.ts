export const printBinaryTree = (nodes: number): string => {
	if (
		typeof nodes !== "number" ||
		nodes < 1 ||
		nodes === Infinity ||
		isNaN(nodes)
	)
		return "";

	const steps = Math.max(1, Math.ceil(Math.log2(nodes)));
	let tree = "";
	for (let step = 1; step <= steps; step++) {
		const availableNodes = Math.min(2 ** (step - 1), nodes) * 2;
		const stepNodes = Math.min(
			availableNodes,
			Math.ceil(nodes / 2 ** (steps - step)),
		);
		const subSteps = Math.max(2 ** (steps - step - 1), 1);
		const spaces = 2 ** (steps - step);
		for (let subStep = 1; subStep <= subSteps; subStep++) {
			let node = 0;
			while (node < stepNodes) {
				tree += new Array(spaces - subStep + 1).join(" ");
				tree += "/";
				node++;
				if (node === stepNodes) continue;

				tree += new Array((subStep - 1) * 2 + 1).join(" ");
				tree += "\\";
				node++;
				if (node !== stepNodes)
					tree += new Array(spaces - subStep + 1).join(" ");
			}
			tree += "\n";
		}
	}
	return tree;
};
