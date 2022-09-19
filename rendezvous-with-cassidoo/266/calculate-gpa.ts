export type GradePoint = (
	| 'A'
	| 'A-'
	| 'B+'
	| 'B'
	| 'B-'
	| 'C+'
	| 'C'
	| 'C-'
	| 'D+'
	| 'D'
	| 'D-'
	| 'F'
);

export const key: Record<GradePoint, number> = {
	'A': 4,
	'A-': 3.7,
	'B+': 3.3,
	'B': 3,
	'B-': 2.7,
	'C+': 2.3,
	'C': 2,
	'C-': 1.7,
	'D+': 1.3,
	'D': 1,
	'D-': 0.7,
	'F': 0,
};

export const calculateGpa = (
	grades: GradePoint[]
): number => {
	return Number((
		grades.reduce((sum, grade) => sum += key[grade], 0)
		/ grades.length
	).toFixed(1));
};