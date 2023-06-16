import { convertColor } from './color.helpers';

test('convertColor: test # 1', () => {
	const response = convertColor('rgb', 'hex', 'rgb(255, 0, 0)');
	expect(response).toStrictEqual('#FF0000');
});

test('convertColor: test # 2', () => {
	const response = convertColor('hsl', 'rgb', 'hsl(65, 80, 80)');
	expect(response).toStrictEqual('rgb(238, 245, 163)');
});

test('convertColor: test # 3', () => {
	const response = convertColor('hsl', 'hex', 'hsl(65,80,80)');
	expect(response).toStrictEqual('#EEF5A3');
});

test('convertColor: test # 2', () => {
	const response = convertColor('hex', 'rgb', '#EEF5A3');
	expect(response).toStrictEqual('rgb(238, 245, 163)');
});
