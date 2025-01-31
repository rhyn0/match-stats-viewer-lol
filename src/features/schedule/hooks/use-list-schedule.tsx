import { useSuspenseQuery } from "@tanstack/react-query";
import {
    type ListScheduleReturnT,
    listScheduleQueryOptions,
} from "../api/list-schedule";

import type { ExtraQueryOptionsI } from "@/types";
import type scheduleKeys from "../api/keys";

type Key = (typeof scheduleKeys)["all"];

export interface useScheduleQueryProps
    extends ExtraQueryOptionsI<ListScheduleReturnT, Key> {}
export default function useListScheduleQuery({
    ...options
}: useScheduleQueryProps = {}) {
    return useSuspenseQuery({
        ...listScheduleQueryOptions(),
        ...options,
    });
}
