export const NUMBER_PERIODS = [
	'',
	'thousand',
	'million',
	'billion',
	'trillion',
	'quadrillion',
	'quintillion',
	'sextillion',
] as const;

export const NUMBER_TENS = [
	'',
	'',
	'twenty',
	'thirty',
	'forty',
	'fifty',
	'sixty',
	'seventy',
	'eighty',
	'ninety',
] as const;

export const NUMBER_UNITS = [
	'',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'eleven',
	'twelve',
	'thirteen',
	'fourteen',
	'fifteen',
	'sixteen',
	'seventeen',
	'eighteen',
	'nineteen',
] as const;

type Periods = typeof NUMBER_PERIODS;
type Tens = typeof NUMBER_TENS;
type Units = typeof NUMBER_UNITS;

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Join<
	T extends readonly string[],
	Separator extends string = ',',
	Result extends string = '',
> = T extends [infer First extends string, ...infer Rest extends string[]]
	? Join<
			Rest,
			Separator,
			First extends ''
				? Result
				: Result extends ''
				  ? First
				  : `${Result}${Separator}${First}`
	  >
	: Result;

type Int<T extends number> = `${T}` extends `${infer I extends
	number}.${string}`
	? I
	: T;

type Unsigned<T extends number> = `${T}` extends `-${infer I extends number}`
	? I
	: T;

type HundredsTuple = [Digit] | [Digit, Digit] | [Digit, Digit, Digit];

type HundredsToWords<
	Type extends HundredsTuple,
	Result extends string[] = [],
> = Type extends [
	infer Hundred extends Exclude<Digit, '0'>,
	...infer Rest extends [Digit, Digit],
]
	? HundredsToWords<Rest, Hundred extends 0 ? [] : [Units[Hundred], 'hundred']>
	: Type extends [infer Ten extends Digit, infer Unit extends Digit]
	  ? `${Ten}${Unit}` extends `${infer I extends number}`
			? Join<
					[
						...Result,
						...(Units[I] extends Exclude<Units[number], ''>
							? [Units[I]]
							: [Tens[Ten], Units[Unit]]),
					],
					' '
			  >
			: never
	  : Type extends [infer Unit extends Digit]
	    ? Join<[...Result, Units[Unit]], ' '>
	    : never;

type NumberToDigits<
	T extends number,
	Str extends string = `${T}` extends `-${infer I}` ? I : `${T}`,
	Result extends Digit[] = [],
> = Str extends `${infer First extends Digit}${infer Rest}`
	? NumberToDigits<never, Rest, [...Result, First]>
	: Result;

type GroupTuple<
	T extends unknown[],
	Size extends number,
	Curr extends unknown[] = [],
	Groups extends unknown[][] = [],
> = T extends [...infer Rest, infer Last]
	? [Last, ...Curr]['length'] extends Size
		? GroupTuple<Rest, Size, [], [[Last, ...Curr], ...Groups]>
		: GroupTuple<Rest, Size, [Last, ...Curr], Groups>
	: Curr extends []
	  ? Groups
	  : [Curr, ...Groups];

type FractionalToWords<
	T extends number,
	Digits extends Digit[] = NumberToDigits<T>,
	Result extends string[] = [],
> = Digits extends [infer First extends Digit, ...infer Rest extends Digit[]]
	? FractionalToWords<never, Rest, [...Result, Units[First]]>
	: ` point ${Join<Result, ' '>}`;

type JoinNumberChunks<
	T extends number,
	Result extends string[],
	Sign extends string = `${T}` extends `-${string}` ? 'minus ' : '',
	Fraction extends string = `${T}` extends `${string}.${infer F extends number}`
		? FractionalToWords<F>
		: '',
> = `${Sign}${Join<Result, ', '>}${Fraction}`;

type NumberToWords<
	T extends number,
	Groups extends HundredsTuple[] = GroupTuple<
		NumberToDigits<Unsigned<Int<T>>>,
		3
	>,
	Result extends string[] = [],
	Postfix extends string = ['', ...Periods][Groups['length']],
> = number extends T
	? string
	: T extends 0
	  ? 'zero'
	  : Groups extends [
					infer First extends HundredsTuple,
					...infer Rest extends HundredsTuple[],
	      ]
	    ? NumberToWords<
					T,
					Rest,
					[
						...Result,
						Postfix extends ''
							? HundredsToWords<First>
							: `${HundredsToWords<First>} ${Postfix}`,
					]
	      >
	    : JoinNumberChunks<T, Result>;

export const numberToWords = <T extends number>(
	number: T,
): NumberToWords<T> => {
	if (isNaN(number)) throw new Error('invalid number!');
	if (number === 0) return 'zero' as NumberToWords<T>;
	const string = Math.trunc(Math.abs(number)).toString();

	const groups = Array.from(
		{ length: Math.ceil(string.length / 3) },
		(_, index) => {
			const start = (index + 1) * -3;
			const end = start + 3 || undefined;
			return string.slice(start, end);
		},
	);
	const groupWords = groups.map((group, index) => {
		const postFix = NUMBER_PERIODS[index];
		const digits = group.padStart(3, '0');
		const hundreds = NUMBER_UNITS[Number(digits[0])];
		const pieces = new Array<string | undefined>();
		pieces.push(hundreds);
		if (hundreds) pieces.push('hundred');
		const unit = NUMBER_UNITS[Number(digits.slice(1))];
		if (unit) {
			pieces.push(unit);
		} else {
			const tens = NUMBER_TENS[Number(digits[1])];
			const units = NUMBER_UNITS[Number(digits[2])];
			pieces.push(tens);
			pieces.push(units);
		}
		pieces.push(postFix);
		return pieces.filter(Boolean).join(' ');
	});

	const fraction = String(number)
		.split('.')[1]
		?.split('')
		.map((num) => NUMBER_UNITS[Number(num)])
		.filter(Boolean)
		.join(' ');

	const stringified = groupWords.reverse().filter(Boolean).join(', ');
	return ((number < 0 ? 'minus ' : '') +
		stringified +
		(fraction ? ` point ${fraction}` : '')) as NumberToWords<T>;
};
