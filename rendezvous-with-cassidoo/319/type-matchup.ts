export type TypeMatchupRes = { weakAgainst: string[]; strongAgainst: string[] };

export const typeMatchup = async (input: string): Promise<TypeMatchupRes> => {
	const dataRes = await fetch(`https://pokeapi.co/api/v2/type/${input}`);
	if (dataRes.status === 404) throw new Error(`Invalid Pokemon type: ${input}`);
	const data = (await dataRes.json()) as {
		damage_relations: {
			double_damage_from: { name: string }[];
			double_damage_to: { name: string }[];
		};
	};
	return {
		weakAgainst: data.damage_relations.double_damage_from.map(
			(row) => row.name,
		),
		strongAgainst: data.damage_relations.double_damage_to.map(
			(row) => row.name,
		),
	};
};
