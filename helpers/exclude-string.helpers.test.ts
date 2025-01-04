import { excludeString } from "./exclude-string.helpers.js";

test("should test excludeString", () => {
	const string1 = "foo" as "foo" | "bar" | "baz";
	const response1 = excludeString(string1, "foo");
	expect(response1).toBeUndefined();
	assertType<Exclude<typeof string1, "foo"> | undefined>(response1);

	const string2 = "bar" as "foo" | "bar" | "baz";
	const response2 = excludeString(string2, "foo", "baz");
	expect(response2).toBe("bar");
	assertType<Exclude<typeof string1, "foo" | "baz"> | undefined>(response2);
});
