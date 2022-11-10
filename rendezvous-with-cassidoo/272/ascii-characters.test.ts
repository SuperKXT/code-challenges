import { printAscii } from './ascii-characters';

describe('testing printAscii', () => {
	it('should return printable ASCII characters', () => {
		expect(printAscii()).toBe(
			' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
		);
	});
});
