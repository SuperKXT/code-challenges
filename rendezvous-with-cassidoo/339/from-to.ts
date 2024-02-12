export function* fromTo(from: number, to: number) {
	for (let i = from; i < to; i++) {
		yield i;
	}
}
