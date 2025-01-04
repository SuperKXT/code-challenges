import { groupAnagrams } from "./group-anagrams.js";

test("testing groupAnagrams 1", () => {
	const result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
	const expected = [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] as const;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});

test("testing groupAnagrams 2", () => {
	const result = groupAnagrams(["vote", "please"]);
	const expected = [["vote"], ["please"]];
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});

test("testing groupAnagrams 3", () => {
	// cSpell: disable
	const result = groupAnagrams(["debitcard", "badcredit"]);
	const expected = [["debitcard", "badcredit"]];
	// cSpell: enable
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});
