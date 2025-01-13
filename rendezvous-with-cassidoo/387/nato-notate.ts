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
	"0": "Zero",
	"1": "One",
	"2": "Two",
	"3": "Three",
	"4": "Four",
	"5": "Five",
	"6": "Six",
	"7": "Seven",
	"8": "Eight",
	"9": "Nine",
} as const;

type NatoNotate<
	Str extends string,
	res extends string = "",
> = Str extends `${infer first}${infer rest}`
	? first extends keyof typeof map
		? NatoNotate<
				rest,
				res extends "" ? (typeof map)[first] : `${res} ${(typeof map)[first]}`
			>
		: NatoNotate<rest, res>
	: res;

export const natoNotate = <Str extends string>(str: Str): NatoNotate<Str> => {
	const result: string[] = [];
	for (const char of str) {
		const val = (map as Record<string, string>)[char];
		if (!val) continue;
		result.push(val);
	}
	return result.join(" ") as never;
};
