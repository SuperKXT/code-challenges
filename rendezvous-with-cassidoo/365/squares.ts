type FindUnused<Arr extends string[], Res extends string[] = []> = never;

const deleteVar = (vars: Map<string, string[]>, varName: string) => {
	const curr = vars.get(varName);
	if (!curr) return;
	for (const v of curr) deleteVar(vars, v);
	vars.delete(varName);
};

export const findUnused = <const Arr extends [string, ...string[]]>(
	arr: Arr,
): FindUnused<Arr> => {
	let vars = new Map<string, string[]>();
	for (const curr of arr) {
		const log = curr.match(/log\((.*)\)/);
		if (log?.[1]) {
			const varVal = log[1].trim();
			deleteVar(vars, varVal);
		} else {
			const [varStr, expr] = curr.split('=');
			const dep = expr?.trim();
			if (varStr) vars.set(varStr.trim(), dep && vars.has(dep) ? [dep] : []);
		}
	}
	return Array.from(vars.keys()) as never;
};
