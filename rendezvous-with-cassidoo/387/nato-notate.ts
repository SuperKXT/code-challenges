import { safeObjAccess } from "../../helpers/object.helpers.js";

const map = {
	a: "Alfa",
	b: "Bravo",
	c: "Charlie",
	d: "Delta",
	e: "Echo",
	f: "Foxtrot",
	g: "Golf",
	h: "Hotel",
	i: "India",
	j: "Juliet",
	k: "Kilo",
	l: "Lima",
	m: "Mike",
	n: "November",
	o: "Oscar",
	p: "Papa",
	q: "Quebec",
	r: "Romeo",
	s: "Sierra",
	t: "Tango",
	u: "Uniform",
	v: "Victor",
	w: "Whiskey",
	x: "X-ray",
	y: "Yankee",
	z: "Zulu",
	" ": "(space)",
	0: "Zero",
	1: "One",
	2: "Two",
	3: "Three",
	4: "Four",
	5: "Five",
	6: "Six",
	7: "Seven",
	8: "Eight",
	9: "Nine",
};

export const natoNotate = (str: string): string => {
	const result: string[] = [];
	for (const char of str) {
		const val = safeObjAccess(map, char);
		if (typeof val !== "string") continue;
		result.push(val);
	}
	return result.join(" ");
};
