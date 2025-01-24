import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";

// type imports
import type { RowData } from "@tanstack/react-table";
import type { SubFilterProps } from "./types";

export interface FilterSelectProps<TData extends RowData>
    extends Omit<SubFilterProps<TData, string>, "filterValue"> {
    filterValue: NonNullable<SubFilterProps<TData, string>["filterValue"]>;
    placeholderText?: string;
}
/**
 * Requires columnFaceting and FactedUniqueValues to be enabled
 */
export function FilterSelect<TData extends RowData>({
    column,
    filterValue,
    placeholderText = "Team Name",
}: FilterSelectProps<TData>) {
    const sortedUniqueValues = React.useMemo(
        () =>
            Array.from(column.getFacetedUniqueValues().keys())
                .sort()
                .slice(0, 5000),
        [column.getFacetedUniqueValues],
    );
    return (
        <Select
            onValueChange={(newVal) => column.setFilterValue(newVal)}
            defaultValue={filterValue}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholderText} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    // @ts-expect-error - we do something weird here to allow an 'all' option
                    value={null}
                >
                    All
                </SelectItem>
                {sortedUniqueValues.map((filterOption) => (
                    <SelectItem value={filterOption} key={filterOption}>
                        {filterOption}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
