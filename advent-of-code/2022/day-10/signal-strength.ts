const commands = ['addx', 'noop'] as const;

type Command = (typeof commands)[number];

const isCommand = (value: any): value is Command => commands.includes(value);

interface Solution {
	strength: number;
	crtOutput: string;
}

interface Clock {
	cycle: number;
	register: number;
	target: number;
}

const getCrtOutput = ({
	register,
	cycle,
}: Clock): '#' | '.' | '\n#' | '\n.' => {
	const sprite = [register - 1, register, register + 1];
	const position = (cycle - 1) % 40;
	const isEol = cycle > 1 && position === 0;
	return sprite.includes(position)
		? `${isEol ? '\n' : ''}#`
		: `${isEol ? '\n' : ''}.`;
};

export const signalStrength = (input: string): Solution => {
	const clock: Clock = {
		cycle: 0,
		register: 1,
		target: 20,
	};

	const solution: Solution = {
		strength: 0,
		crtOutput: '',
	};

	for (const row of input.split('\n')) {
		const [command, x] = row.split(' ');
		if (!isCommand(command) || (command === 'addx' && isNaN(Number(x))))
			continue;

		const prevRegister = clock.register;

		switch (command) {
			case 'noop':
				clock.cycle++;
				solution.crtOutput += getCrtOutput(clock);
				break;
			case 'addx':
				clock.cycle++;
				solution.crtOutput += getCrtOutput(clock);
				clock.cycle++;
				solution.crtOutput += getCrtOutput(clock);
				clock.register += Number(x);
				break;
		}

		if (clock.cycle >= clock.target) {
			solution.strength += clock.target * prevRegister;
			clock.target += 40;
		}
	}

	return solution;
};
