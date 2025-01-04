import { INVALID_ERROR, verticalSlashes } from "./vertical-slashes.js";

type Test = {
	input: string;
	output: string;
};

const TESTS: Test[] = [
	{
		input: String.raw`\\\//\/\\`,
		output: ["\\", " \\", "  \\", "  /", " /", " \\", " /", " \\", "  \\"].join(
			"\n",
		),
	},
	{
		input: String.raw`\\\\`,
		output: ["\\", " \\", "  \\", "   \\"].join("\n"),
	},
	{
		input: String.raw`//\\`,
		output: ["/", "/", "\\", " \\"].join("\n"),
	},
	{
		input: String.raw`\\///\\\\`,
		output: ["\\", " \\", " /", "/", "/", "\\", " \\", "  \\", "   \\"].join(
			"\n",
		),
	},
];

test.each(TESTS)("verticalSlashes for valid input", ({ input, output }) => {
	expect(verticalSlashes(input)).toStrictEqual(output);
});

test("testing verticalSlashes for invalid input", () => {
	expect(() => verticalSlashes(String.raw`  \/`)).toThrow(INVALID_ERROR);
	expect(() => verticalSlashes("")).toThrow(INVALID_ERROR);
});
