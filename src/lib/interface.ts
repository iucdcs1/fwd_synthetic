// lib/interface.ts
export interface GeneratorMetadata {
	name: string; // e.g. regexp/random etc...
	params: {
		[key: string]: string;
	};
}

export interface Column {
	// uml
	column_name: string;
	column_default: string | null;
	data_type: string;
	is_nullable: string;
	character_maximum_length: number | null;
	is_generated: string;
	related_to?: RelatedColumn[];

	// metadata
	generator: GeneratorMetadata | undefined;
}

export interface RelatedColumn {
	table_name: string;
	column_name: string;
}

export interface TableData {
	table_name: string;
	columns: {
		[key: string]: Column;
	};
}

export interface AppState {
	dbLink: string;
	tables: TableData[];
	selected_table: string;
}
