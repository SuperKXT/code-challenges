import { fromTo } from "./from-to.js";

test("testing fromTo against test 1", () => {
	const range = fromTo(0, 3);
	expect(range()).toBe(0);
	expect(range()).toBe(1);
	expect(range()).toBe(2);
	expect(range()).toBeNull();
});
