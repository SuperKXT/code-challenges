import { printAscii } from "./ascii-characters.js";

test("testing printAscii", () => {
	expect(printAscii()).toBe(
		" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
	);
});
