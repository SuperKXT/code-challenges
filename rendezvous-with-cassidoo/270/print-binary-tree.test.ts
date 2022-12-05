import { printBinaryTree } from './print-binary-tree';

describe('testing passDoors', () => {
	it('should handle invalid input', () => {
		expect(printBinaryTree(-10)).toBe('');
		expect(printBinaryTree(0)).toBe('');
		expect(printBinaryTree(-Infinity)).toBe('');
		expect(printBinaryTree(Infinity)).toBe('');
		expect(printBinaryTree(NaN)).toBe('');
	});
	it('should print tree with 1 leaf node', () => {
		expect(printBinaryTree(1)).toBe('/\n');
	});
	it('should print tree with 2 leaf node', () => {
		expect(printBinaryTree(2)).toBe('/\\\n');
	});
	it('should print tree with 17 leaf node', () => {
		expect(printBinaryTree(17)).toBe(`               /\\
              /  \\
             /    \\
            /      \\
           /        \\
          /          \\
         /            \\
        /              \\
       /\\              /
      /  \\            /
     /    \\          /
    /      \\        /
   /\\      /\\      /
  /  \\    /  \\    /
 /\\  /\\  /\\  /\\  /
/\\/\\/\\/\\/\\/\\/\\/\\/\n`);
	});
});
