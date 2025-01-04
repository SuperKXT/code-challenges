import { stringifyError } from "./error.helpers.js";

test("test stringifyError", () => {
	expect(stringifyError(new Error("test error"))).toBe("test error");
	expect(stringifyError("test error")).toBe("test error");
	expect(stringifyError(2)).toBe("2");
	expect(stringifyError({ foo: 1, bar: 2 })).toBe(`{"foo":1,"bar":2}`);
});
