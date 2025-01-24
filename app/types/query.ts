import type {
    DefaultError,
    DefinedUseQueryResult,
    QueryKey,
    UseQueryOptions,
    UseQueryResult,
} from "@tanstack/react-query";

export interface ExtraQueryOptionsI<TFnData, TQueryKey extends QueryKey>
    extends Omit<
        UseQueryOptions<TFnData, DefaultError, TFnData, TQueryKey>,
        "queryKey" | "queryFn"
    > {}

export type TUseQueryWrapResult<
    TData,
    TError,
    TQueryKey extends QueryKey,
    TConfig extends ExtraQueryOptionsI<TData, TQueryKey>,
> = TConfig extends {
    initialData: UseQueryOptions<
        TData,
        TError,
        TData,
        TQueryKey
    >["initialData"];
}
    ? DefinedUseQueryResult<TData, TError>
    : UseQueryResult<TData, TError>;
