import { assertValidCatanBoard, generateCatanBoard } from "./generate-catan.js";
import { CATAN_ERRORS } from "./generate-catan.types.js";

import type { CatanError } from "./generate-catan.types.js";

const VALID_BOARDS: string[] = [
	["  B 9 A", " 5 6 C 8", "6 4 B 5 3", " 2 8 9 3", "  A . 4"].join("\n"),
	["  B B C", " 3 A 3 A", "2 4 6 . 6", " 4 5 9 9", "  8 5 8"].join("\n"),
	["  6 3 8", " 2 4 5 A", "5 9 . 6 9", " A B 3 C", "  8 4 B"].join("\n"),
];

type InvalidBoard = {
	board: string;
	error: CatanError;
};

const INVALID_BOARDS: InvalidBoard[] = [
	{
		board: ["  6 3 8", " 2 4 5 A"].join("\n"),
		error: CATAN_ERRORS.badFormatting,
	},
	{
		board: ["  6 3 8", " 2 4 5 A", "2 9 . 6 9", " A B 3 C", "  8 4 B"].join(
			"\n",
		),
		error: CATAN_ERRORS.badPieceCount,
	},
	{
		board: ["  6 3 A", " 2 4 5 A", "5 9 . 8 9", " 8 B 3 C", "  6 4 B"].join(
			"\n",
		),
		error: CATAN_ERRORS.badPositioning,
	},
];

test.each(VALID_BOARDS)("assertValidCatanBoard for valid input", (board) => {
	expect(() => {
		assertValidCatanBoard(board);
	}).not.toThrow();
});

test.each(INVALID_BOARDS)(
	"testing assertValidCatanBoard for invalid input",
	({ board, error }) => {
		expect(() => {
			assertValidCatanBoard(board);
		}).toThrow(error);
	},
);

test("testing generateCatanBoard", () => {
	expect(() => {
		[...new Array<unknown>(1000)].forEach(() => {
			const board = generateCatanBoard();
			assertValidCatanBoard(board);
		});
	}).not.toThrow();
});
