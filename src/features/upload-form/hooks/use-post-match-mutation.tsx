import {
    type DefaultError,
    type UseMutationOptions,
    useMutation,
} from "@tanstack/react-query";
import { insertSingleMatch } from "../api/post-upload";

import type { UploadMatchT } from "../types";

export interface useUploadQueryProps
    extends Omit<
        UseMutationOptions<void, DefaultError, UploadMatchT>,
        "mutationFn"
    > {}
export default function useUploadMutation({
    ...options
}: useUploadQueryProps = {}) {
    return useMutation({
        ...options,
        mutationFn: insertSingleMatch,
    });
}
