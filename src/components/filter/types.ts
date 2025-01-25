import type { Column, RowData } from "@tanstack/react-table";

export interface FilterProps<TData extends RowData> {
    column: Column<TData, unknown>;
}
export interface SubFilterProps<TData extends RowData, FilterT>
    extends FilterProps<TData> {
    filterValue: FilterT | undefined;
}

export type FilterVariantType = "text" | "range" | "select";
