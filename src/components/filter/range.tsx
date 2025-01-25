import { DebouncedInput } from "@/components/debounce-input";
import type { RowData } from "@tanstack/react-table";

// type imports
import type { SubFilterProps } from "./types";

export function FilterRange<TData extends RowData>({
    column,
    filterValue,
}: SubFilterProps<TData, [number, number]>) {
    return (
        <div>
            <div className="mb-1 flex space-x-2">
                <DebouncedInput
                    type="number"
                    value={filterValue?.[0] ?? ""}
                    onChange={(value) =>
                        column.setFilterValue((old: [number, number]) => [
                            value,
                            old?.[1],
                        ])
                    }
                    placeholder="Min"
                    className="w-24 rounded border shadow"
                />
                <DebouncedInput
                    type="number"
                    value={filterValue?.[1] ?? ""}
                    onChange={(value) =>
                        column.setFilterValue((old: [number, number]) => [
                            old?.[0],
                            value,
                        ])
                    }
                    placeholder="Max"
                    className="w-24 rounded border shadow"
                />
            </div>
        </div>
    );
}
