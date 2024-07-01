type Fruit = {
	name: string;
	quantity: number;
	price: number;
};

export class FruitStand {
	private fruits = new Map<string, Fruit>();

	addFruit(name: string, quantity: number, price: number) {
		const existing = this.fruits.get(name);
		if (existing) throw new Error(`Fruit ${name} already exists`);
		this.fruits.set(name, { name, quantity, price });
	}

	updateQuantity(name: string, quantity: number) {
		const existing = this.fruits.get(name);
		if (!existing) throw new Error(`Fruit ${name} not found`);
		this.fruits.set(name, { ...existing, quantity });
	}

	totalValue() {
		let value = 0;
		for (const fruit of this.fruits.values()) {
			value += fruit.quantity * fruit.price;
		}
		return value;
	}
}
