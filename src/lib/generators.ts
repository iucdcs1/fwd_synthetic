export interface GeneratorInfoArg {
	name: string;
	type: string; // type of this arg
}

export interface GeneratorInfo {
	name: string;
	types: string[]; // types this generator can generate for
	args: GeneratorInfoArg[]; // arguments needed for this generator
}

export const generators: GeneratorInfo[] = [
	{
		name: 'regexp',
		types: ['character varying', 'text'],
		args: [{ name: 'RegExp', type: 'text' }]
	},
	{
		name: 'random',
		types: ['integer', 'numeric'],
		args: [
			{ name: 'From', type: 'number' },
			{ name: 'To', type: 'number' }
		]
	}
];
