import { FruitStand } from './fruit-stand.js';

test('testing FruitStand', () => {
	const stand = new FruitStand();
	// Add fruits to the stand
	stand.addFruit('apple', 10, 0.5);
	stand.addFruit('banana', 5, 0.2);
	stand.addFruit('cherry', 20, 0.1);

	// Update the quantity of an existing fruit
	stand.updateQuantity('banana', 10);

	// Calculate the total value of all fruits in the stand
	const result = stand.totalValue();
	const expected = 9;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
