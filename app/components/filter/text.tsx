import { DebouncedInput } from "@/components/debounce-input";

// type imports
import type { RowData } from "@tanstack/react-table";
import type { SubFilterProps } from "./types";

export function FilterText<TData extends RowData>({
    column,
    filterValue,
}: SubFilterProps<TData, string>) {
    return (
        <DebouncedInput
            className="w-36 rounded border shadow"
            onChange={(value) => column.setFilterValue(value)}
            placeholder="Search..."
            type="text"
            value={filterValue ?? ""}
        />
    );
}
