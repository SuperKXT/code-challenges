
const curriedAdd = (first?: number) => {
	if (first === undefined) return 0;
	return (second?: number) => {
		if (second !== undefined) {
			return curriedAdd(first + second);
		}
		return first;
	};
};
const first = curriedAdd(1);
const second = first(2);
const third = second();
console.log(curriedAdd(1)(2)());

export default curriedAdd;