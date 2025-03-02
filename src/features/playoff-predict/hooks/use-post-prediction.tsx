import {
    type DefaultError,
    type UseMutationOptions,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import playoffPredictKeys from "../api/keys";
import { insertSinglePrediction } from "../api/post-prediction";

import type { PredictionFormT } from "../types";

export interface usePredictionMutationProps
    extends Omit<
        UseMutationOptions<void, DefaultError, PredictionFormT>,
        "mutationFn"
    > {}
export default function usePredictionMutation({
    onSuccess,
    ...options
}: usePredictionMutationProps = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: insertSinglePrediction,
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries({
                queryKey: playoffPredictKeys.predictions,
            });
            onSuccess?.(data, variables, context);
        },
        ...options,
    });
}
