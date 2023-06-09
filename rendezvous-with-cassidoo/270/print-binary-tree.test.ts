import { printBinaryTree } from './print-binary-tree';

test('testing printBinaryTree for invalid input', () => {
	expect(printBinaryTree(-10)).toBe('');
	expect(printBinaryTree(0)).toBe('');
	expect(printBinaryTree(-Infinity)).toBe('');
	expect(printBinaryTree(Infinity)).toBe('');
	expect(printBinaryTree(NaN)).toBe('');
});

test('testing printBinaryTree for valid input', () => {
	expect(printBinaryTree(1)).toBe('/\n');
	expect(printBinaryTree(2)).toBe('/\\\n');
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
