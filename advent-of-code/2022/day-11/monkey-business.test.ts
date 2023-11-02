import { readFile } from 'fs/promises';
import path from 'path';

import { config } from '~/config.js';

import { monkeyBusiness } from './monkey-business.js';

const EXAMPLE = `Monkey 0:
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

test('testing monkeyBusiness against example input', () => {
	const response = monkeyBusiness(EXAMPLE);
	const solution: Solution = {
		bigMb: 2713310158,
		monkeyBusiness: 10605,
	};
	expect(response).toStrictEqual(solution);
});

test('testing monkeyBusiness against real input', async () => {
	const input = await readFile(path.join(config.dirname, 'input.txt'), 'utf-8');
	const solution: Solution = {
		bigMb: 21816744824,
		monkeyBusiness: 120056,
	};
	expect(monkeyBusiness(input)).toStrictEqual(solution);
});
