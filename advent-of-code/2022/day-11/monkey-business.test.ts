import { readFile } from 'fs/promises';
import path from 'path';

import { monkeyBusiness } from './monkey-business';

const example = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

type Solution = ReturnType<typeof monkeyBusiness>;

describe('testing monkeyBusiness', () => {
	it('should return the correct solution for example test', () => {
		const response = monkeyBusiness(example);
		const solution: Solution = {
			monkeyBusiness: 10605,
			bigMb: 2713310158,
		};
		expect(response).toStrictEqual(solution);
	});
	it('should return the correct solution for the input file', async () => {
		const input = await readFile(path.join(__dirname, 'input.txt'), 'utf-8');
		const solution: Solution = {
			monkeyBusiness: 120056,
			bigMb: 21816744824,
		};
		expect(monkeyBusiness(input)).toStrictEqual(solution);
	});
});
