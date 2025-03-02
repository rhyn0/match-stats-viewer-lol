import useLocalStorage from "@/components/hooks/use-localstorage";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { arktypeResolver } from "@hookform/resolvers/arktype";
import React from "react";
import { useForm } from "react-hook-form";
import usePredictionMutation from "../hooks/use-post-prediction";
import {
    type AggregatedPredictionsT,
    type Match,
    PredictionFormArk,
    type PredictionFormT,
} from "../types";
import TournamentBracket from "./tournament-bracket";

export interface PlayoffPredictionFormProps {
    initialBracket: Match[];
    className?: string;
    predictions: AggregatedPredictionsT[];
}
export function PlayoffPredictionForm({
    initialBracket,
    className,
    predictions,
}: PlayoffPredictionFormProps) {
    const [previouslySubmittted, setPreviouslySubmitted] =
        useLocalStorage<boolean>("predictionSubmitted", false);
    const form = useForm<PredictionFormT>({
        resolver: arktypeResolver(PredictionFormArk),
        defaultValues: {
            email: "",
            // @ts-expect-error  - its fine for input teams to be null, but only accept submissions with team not null
            matches: initialBracket,
        },
        mode: "onSubmit",
    });
    const predictionMutation = usePredictionMutation();
    const onSubmit = React.useCallback(
        (values: PredictionFormT) => {
            console.log(values);
            predictionMutation.mutate(values);
            setPreviouslySubmitted(true);
        },
        [predictionMutation.mutate, setPreviouslySubmitted],
    );
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, (...args) => {
                    console.error(args);
                })}
                className={cn("space-y-8 w-full font-mono", className)}
            >
                <div className="flex flex-col space-y-2">
                    <FormField
                        control={form.control}
                        name="matches"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <TournamentBracket
                                        // @ts-expect-error - yah im not dealing with this one, see above
                                        bracket={field.value}
                                        onChange={field.onChange}
                                        className="md:mx-24 mx-8"
                                        predictions={predictions}
                                        ref={field.ref}
                                    />
                                </FormControl>
                                {fieldState.error && (
                                    <p className="text-red-500 text-center">
                                        All matches must have a prediction.
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />
                    <div className="justify-items-center space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your Email"
                                            {...field}
                                            className="min-w-32 max-w-fit"
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            variant={
                                previouslySubmittted ? "outline" : "default"
                            }
                            className="bg-emerald-600"
                            disabled={
                                predictionMutation.isPending ||
                                previouslySubmittted
                            }
                        >
                            {previouslySubmittted
                                ? "Your prediction has been recorded"
                                : predictionMutation.isPending
                                  ? "Submitting"
                                  : "Submit"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
