import { numberOfOnes } from "./number-of-ones.js";

const TEST_1 = { answer: 7, number: 14 };
const TEST_2 = { answer: 55, number: 121 };
const TEST_3 = { answer: 0, number: 0 };

test("should find 7 digits for number 14", () => {
	const oneCount = numberOfOnes(TEST_1.number);
	expect(oneCount).toStrictEqual(TEST_1.answer);
});

test("should find 55 digits for number 121", () => {
	const oneCount = numberOfOnes(TEST_2.number);
	expect(oneCount).toStrictEqual(TEST_2.answer);
});

test("should find 0 digits for number < 1", () => {
	const oneCount = numberOfOnes(TEST_3.number);
	expect(oneCount).toStrictEqual(TEST_3.answer);
});
