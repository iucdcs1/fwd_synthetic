// lib/interface.ts
export interface Column {
	column_name: string;
	column_default: string | null;
	data_type: string;
	is_nullable: string;
	character_maximum_length: number | null;
	is_generated: string;
	related_to?: RelatedColumn[];
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
