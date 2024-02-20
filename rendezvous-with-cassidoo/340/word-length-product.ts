export const wordLengthProduct = (arr: string[]) => {
	let maxProduct: number = 0;
	for (let i = 0; i < arr.length; i++) {
		for (let j = i; j < arr.length; j++) {
			const iVal = arr[i] as string;
			const jVal = arr[j] as string;
			const combined = iVal + jVal;
			const currProduct = iVal.length * jVal.length;
			const iSize = new Set(iVal).size;
			const jSize = new Set(jVal).size;
			const ijSize = new Set(combined).size;
			if (iSize + jSize === ijSize && currProduct > maxProduct)
				maxProduct = currProduct;
		}
	}
	return maxProduct;
};
