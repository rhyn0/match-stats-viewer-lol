import { FilterRange } from "./range";
import { FilterSelect } from "./select";
import { FilterText } from "./text";

// type imports
import type { RowData } from "@tanstack/react-table";
import type { FilterProps } from "./types";

function Filter<TData extends RowData>({ column }: FilterProps<TData>) {
    const columnFilterValue = column.getFilterValue();
    const { filterVariant } = column.columnDef.meta ?? {};

    if (!column.getCanFilter()) {
        return null;
    }
    return filterVariant === "range" ? (
        <FilterRange<TData>
            column={column}
            filterValue={columnFilterValue as [number, number] | undefined}
        />
    ) : filterVariant === "select" ? (
        <FilterSelect
            column={column}
            filterValue={columnFilterValue?.toString() ?? ""}
        />
    ) : (
        <FilterText
            column={column}
            filterValue={columnFilterValue as string | undefined}
        />
    );
}

export default Filter;
