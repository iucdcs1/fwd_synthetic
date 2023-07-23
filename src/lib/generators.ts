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
		args: [{ name: 'regexp', type: 'str' }]
	},
	{
		name: 'random',
		types: ['integer', 'numeric'],
		args: [
			{ name: 'from', type: 'num' },
			{ name: 'to', type: 'num' }
		]
	}
];
