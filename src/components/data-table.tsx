import { ColumnVisibiltyCheckbox } from "@/components/collapsible-checkbox";
import Filter, { type FilterVariantType } from "@/components/filter";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/cn";
import {
    type Column,
    type ColumnDef,
    type ColumnFiltersState,
    type InitialTableState,
    type PaginationState,
    type RowData,
    type SortDirection,
    type TableOptions,
    type TableState,
    type Table as TableT,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import React from "react";

declare module "@tanstack/react-table" {
    //allows us to define custom properties for our columns
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: FilterVariantType;
    }
}
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    columnOrder?: string[];
    onColumnOrderChange?: React.Dispatch<React.SetStateAction<string[]>>;
    columnFilters?: ColumnFiltersState;
    columnPinning?: {
        left?: string[];
        right?: string[];
    };
    pageSizeChangingEnabled?: boolean;
    pagination: PaginationState;
    onPaginationChange?: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    columnOrder,
    onColumnOrderChange,
    columnFilters,
    pagination,
    onPaginationChange,
    columnPinning = {},
    pageSizeChangingEnabled = true,
}: DataTableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] = React.useState<
        Record<string, boolean>
    >({});

    const state: Partial<TableState> = {
        columnVisibility: columnVisibility,
        columnOrder: columnOrder ?? [],
    };
    const initialState: InitialTableState = {
        columnFilters: columnFilters ?? [],
        columnPinning,
    };
    const tableOptions: TableOptions<TData> = {
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        // biome-ignore lint/suspicious/noEmptyBlockStatements: if no onColumnOrderChange is provided, we don't need to do anything
        onColumnOrderChange: onColumnOrderChange ?? (() => {}),
    };
    if (typeof onPaginationChange === "undefined") {
        initialState.pagination = pagination;
    } else {
        state.pagination = pagination;
        tableOptions.onPaginationChange = onPaginationChange;
    }

    const table = useReactTable({ ...tableOptions, state, initialState });
    const checkboxVisibility = Object.fromEntries(
        table
            .getAllLeafColumns()
            .map((column) => [column.id, column.getIsVisible()]),
    );
    return (
        <>
            <ColumnVisibiltyCheckbox
                columnState={checkboxVisibility}
                onChange={(colName, nextState) => {
                    if (typeof nextState !== "boolean") return;
                    setColumnVisibility((prev) => ({
                        ...prev,
                        [colName]: nextState,
                    }));
                }}
            />
            <div className="rounded-md border dark:text-white">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup, idx) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="border"
                                            style={getCommonPinningStyles<TData>(
                                                header.column,
                                                idx === 0,
                                            )}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div className="flex flex-col space-y-2">
                                                    <div
                                                        className={cn(
                                                            "group/sort",
                                                            {
                                                                "flex cursor-pointer select-none flex-row gap-2 justify-center":
                                                                    header.column.getCanSort(),
                                                            },
                                                        )}
                                                        onMouseDown={header.column.getToggleSortingHandler()}
                                                    >
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
                                                        <SortIcon
                                                            sortState={header.column.getIsSorted()}
                                                            noSortClassName="opacity-0 group-hover/sort:opacity-100 hover:opacity-100"
                                                        />
                                                    </div>
                                                    <Filter
                                                        column={header.column}
                                                    />
                                                </div>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            style={getCommonPinningStyles(
                                                cell.column,
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePaginationNav
                table={table}
                enablePageSizeChange={pageSizeChangingEnabled}
            />
        </>
    );
}

interface TablePaginationNavProps<TData> {
    table: TableT<TData>;
    enablePageSizeChange: boolean;
}
function TablePaginationNav<TData>({
    table,
    enablePageSizeChange,
}: TablePaginationNavProps<TData>) {
    const pageSizeOptions = [5, 10, 20, 50];
    return (
        <div className="flex flex-col items-center justify-end space-x-2 py-4">
            <div className="flex flex-row">
                <PaginationButton
                    // go to first page
                    onClick={() => table.firstPage()}
                >
                    <ChevronsLeft />
                </PaginationButton>
                <PaginationButton
                    // go to previous page, can be disabled
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft />
                </PaginationButton>
                <PaginationButton
                    // go to next page, can be disabled
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight />
                </PaginationButton>
                <PaginationButton
                    // go to last page
                    onClick={() => table.lastPage()}
                >
                    <ChevronsRight />
                </PaginationButton>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
            </div>
            <div className="flex flex-row">
                <span className="flex items-center gap-1">
                    Go to Page:
                    <Input
                        className="w-16 rounded border p-1"
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const newPage = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(newPage);
                        }}
                    />
                    <Select
                        onValueChange={(val) => table.setPageSize(Number(val))}
                        value={`${table.getState().pagination.pageSize}`}
                        disabled={!enablePageSizeChange}
                    >
                        <SelectTrigger className="max-w-fit rounded">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {pageSizeOptions.map((size) => (
                                <SelectItem value={`${size}`} key={size}>
                                    Show {size.toLocaleString()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </span>
            </div>
        </div>
    );
}

type PaginationButtonProps = Omit<ButtonProps, "variant" | "size">;

function PaginationButton({ children, ...props }: PaginationButtonProps) {
    return (
        <Button variant="outline" size="icon" {...props}>
            {children}
        </Button>
    );
}

function SortIcon({
    sortState,
    noSortClassName,
}: { sortState: false | SortDirection; noSortClassName?: string }) {
    if (!sortState) {
        return <ChevronDown className={noSortClassName} />;
    }
    if (sortState === "asc") {
        return <ChevronUp />;
    }
    return <ChevronDown />;
}

//These are the important styles to make sticky column pinning work!
//Apply styles like this using your CSS strategy of choice with this kind of logic to head cells, data cells, footer cells, etc.
//View the index.css file for more needed styles such as border-collapse: separate
// NOTE: there is a slight mistake made with `position` calculation when using multiple header rows
// to get around this, added the `isFirstRow` boolean to override `position: sticky`
function getCommonPinningStyles<TData>(
    column: Column<TData>,
    isFirstRow = false,
): React.CSSProperties {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn =
        isPinned === "left" && column.getIsLastColumn("left");
    const isFirstRightPinnedColumn =
        isPinned === "right" && column.getIsFirstColumn("right");

    return {
        boxShadow: isLastLeftPinnedColumn
            ? "-4px 0 4px -4px gray inset"
            : isFirstRightPinnedColumn
              ? "4px 0 4px -4px gray inset"
              : undefined,
        left:
            isPinned === "left" && !isFirstRow
                ? `${column.getStart("left")}px`
                : undefined,
        right:
            isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
        opacity: isPinned ? 0.9 : 1,
        position: isPinned ? "sticky" : "relative",
        width: column.getSize(),
        zIndex: isPinned ? 1 : 0,
        background: "hsl(var(--background))",
    };
}
