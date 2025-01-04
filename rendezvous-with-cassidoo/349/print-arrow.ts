type Direction = "left" | "right" | "up" | "down";

export const printArrow = (direction: Direction, size: number): string => {
	switch (direction) {
		case "left": {
			let string = "*";
			for (let idx = 1; idx < size; idx++) {
				const curr = `${" ".repeat(idx)}*`;
				string = `${curr}\n${string}\n${curr}`;
			}
			return string;
		}
		case "right": {
			let string = `${" ".repeat(size - 1)}*`;
			for (let idx = 1; idx < size; idx++) {
				const curr = `${" ".repeat(size - idx - 1)}*`;
				string = `${curr}\n${string}\n${curr}`;
			}
			return string;
		}
		case "up":
		case "down": {
			let string = `${" ".repeat(size - 1)}*`;
			for (let idx = 2; idx <= size; idx++) {
				const indent = " ".repeat(size - idx);
				const between = " ".repeat(1 + (idx - 2) * 2);
				const curr = `${indent}*${between}*`;
				string =
					direction === "up" ? `${string}\n${curr}` : `${curr}\n${string}`;
			}
			return string;
		}
		default: {
			throw new Error("Invalid direction");
		}
	}
};
