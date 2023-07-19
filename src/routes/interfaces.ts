export interface ColumnInfo {
    name: string;
    type: string;
    primaryKey: boolean;
    foreignKey: boolean;
    // TODO: Add more properties as needed
}

export interface TableInfo {
    name: string;
    columns: ColumnInfo[];
}