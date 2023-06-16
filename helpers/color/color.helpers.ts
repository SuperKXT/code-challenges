type Option = 'hex' | 'hsl' | 'rgb';

export const HEX_REGEX = /#[0-9A-F]{6}/u;
export const RGB_REGEX = /rgb\(\d{1,3},\s?\d{1,3},\s?\d{1,3}\)/u;
export const HSL_REGEX = /hsl\(\d{1,3},\s?\d{1,3},\s?\d{1,3}\)/u;

const parseHex = (input: string): [number, number, number] => {
	if (!input.match(HEX_REGEX)) throw new Error('invalid hex color!');

	return (input.slice(1).match(/.{2}/gu) as RegExpExecArray).map((row) =>
		parseInt(`0x${row}`, 16)
	) as [number, number, number];
};

const parseHsl = (input: string): [number, number, number] => {
	if (!input.match(HSL_REGEX)) throw new Error('invalid hsl color!');

	return input
		.slice(4, -1)
		.split(',')
		.map((row, index) => {
			const number = Number(row);
			if (isNaN(number) || number < 0 || number > (index === 0 ? 360 : 100))
				throw new Error('invalid rgb color!');

			return number;
		}) as [number, number, number];
};

const parseRgb = (input: string): [number, number, number] => {
	if (!input.match(RGB_REGEX)) throw new Error('invalid rgb color!');

	return input
		.slice(4, -1)
		.split(',')
		.map((row) => {
			const number = Number(row);
			if (isNaN(number) || number < 0 || number > 255)
				throw new Error('invalid rgb color!');

			return number;
		}) as [number, number, number];
};

const toHexString = (rgb: [number, number, number]): string => {
	return `#${rgb
		.map((row) => row.toString(16).padStart(2, '0').toUpperCase())
		.join('')}`;
};

const rgbToHsl = (
	input: [number, number, number]
): [number, number, number] => {
	const [red, green, blue] = input.map((row) => row / 255) as [
		number,
		number,
		number
	];
	const min = Math.min(red, green, blue);
	const max = Math.max(red, green, blue);
	const range = max - min;
	const totalLuminance = max + min;
	const inverseTotal = 2 - totalLuminance;
	const lightness = totalLuminance / 2;
	const saturation =
		lightness < 0.5
			? range / totalLuminance
			: inverseTotal === 0
			? 0
			: range / inverseTotal;
	const redMax = range === 0 ? 0 : (green - blue) / range;
	const greenMax = (blue - red) / range + 2;
	const blueMax = (red - green) / range + 4;
	let hue = (max === red ? redMax : max === green ? greenMax : blueMax) * 60;
	if (hue < 0) hue += 360;

	return [
		Math.round(hue),
		Math.round(saturation * 100) || 0,
		Math.round(lightness * 100) || 0,
	];
};

const hslToRgb = (
	input: [number, number, number]
): [number, number, number] => {
	const hue = input[0];
	const saturation = input[1] / 100;
	const lightness = input[2] / 100;
	const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
	const hueI = hue / 60;
	const x = chroma * (1 - Math.abs((hueI % 2) - 1));
	const m = lightness - chroma / 2;
	const values =
		hueI <= 1
			? [chroma, x, 0]
			: hueI <= 2
			? [x, chroma, 0]
			: hueI <= 3
			? [0, chroma, x]
			: hueI <= 4
			? [0, x, chroma]
			: hueI <= 5
			? [x, 0, chroma]
			: [chroma, 0, x];
	return values.map((row) => Math.round((row + m) * 255)) as [
		number,
		number,
		number
	];
};

export const convertColor = <T extends Option>(
	from: T,
	to: Exclude<Option, T>,
	input: string
): string => {
	switch (from) {
		case 'hex': {
			const rgb = parseHex(input);
			if (to === 'rgb') return `rgb(${rgb.join(', ')})`;
			return `hsl(${rgbToHsl(rgb).join(', ')})`;
		}
		case 'hsl': {
			const hsl = parseHsl(input);
			const rgb = hslToRgb(hsl);
			if (to === 'rgb') return `rgb(${rgb.join(', ')})`;
			return toHexString(rgb);
		}
		case 'rgb': {
			const rgb = parseRgb(input);
			if (to === 'hex') return toHexString(rgb);
			return `hsl(${rgbToHsl(rgb).join(', ')})`;
		}
		default:
			throw new Error('invalid option!');
	}
};
