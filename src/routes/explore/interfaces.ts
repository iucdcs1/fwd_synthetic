import type { TableInfo } from "../interfaces";

export interface FetchError {
    err: string;
    detail: string;
}

export interface FetchResult {
    dbLink: string;
    tables: TableInfo[];
}