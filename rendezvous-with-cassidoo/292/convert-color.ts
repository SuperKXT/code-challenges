type Option = 'hex' | 'hsl' | 'rgb';
const HEX_REGEX = /^#[0-9A-F]{6}$/u;
const RGB_REGEX = /^\(\d{1,3},\d{1,3},\d{1,3}\)$/u;
const HSL_REGEX = /^\(\d{1,3},\d{1,3},\d{1,3}\)$/u;

export const convertColor = (
	from: Option,
	to: Option,
	input: string
): string => {
	if (from === to) return input;
	switch (from) {
		case 'hex': {
			if (!input.match(HEX_REGEX)) throw new Error('invalid hex color!');
			const hex = (input.slice(1).match(/.{2}/gu) as RegExpExecArray).map(
				(row) => parseInt(`0x${row}`, 16)
			) as [number, number, number];
			switch (to) {
				case 'hsl':
					return input;
				case 'rgb':
					return `(${hex.map((row) => row.toString(10)).join(',')})`;
				default:
					return input;
			}
		}
		case 'hsl': {
			if (!input.match(HSL_REGEX)) throw new Error('invalid hsl color!');
			switch (to) {
				case 'hex':
					return input;
				case 'rgb':
					return input;
				default:
					return input;
			}
		}
		case 'rgb': {
			if (!input.match(RGB_REGEX)) throw new Error('invalid rgb color!');
			const rgb = (input.slice(1, -1).split(',') as RegExpExecArray).map(
				(row) => {
					const number = Number(row);
					if (isNaN(number) || number < 0 || number > 255)
						throw new Error('invalid rgb color!');
					return number;
				}
			) as [number, number, number];
			switch (to) {
				case 'hex':
					return `#${rgb
						.map((row) => row.toString(16).padStart(2, '0').toUpperCase())
						.join('')}`;
				case 'hsl':
					return input;
				case 'rgb':
					return input;
			}
		}
	}
};
