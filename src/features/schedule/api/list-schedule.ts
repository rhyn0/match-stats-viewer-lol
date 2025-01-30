import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { ListScheduleArk, type ListScheduleT } from "../types";
import scheduleKeys from "./keys";

const ArrayOfListScheduleArk = ListScheduleArk.array();

export type ListScheduleReturnT = ListScheduleT[];

export async function listSchedule(): Promise<ListScheduleReturnT> {
    const url = `${getBaseURL()}/api/schedule`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed request for the schedule");
    }
    const { data } = await response.json();
    const parsed = ArrayOfListScheduleArk(data);
    // console.log("🚀 ~ listSchedule ~ parsed:", parsed);
    if (parsed instanceof type.errors) {
        throw new Error("Received invalid Schedule data");
    }
    return parsed;
}

export const listScheduleQueryOptions = () =>
    queryOptions({
        queryKey: scheduleKeys.all,
        queryFn: async () => await listSchedule(),
        staleTime: 1000 * 60 * 60, // 1 hour
        refetchInterval: 1000 * 60 * 90, // 1 hour half
    });
