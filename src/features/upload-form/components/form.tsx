"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn";
import { playerPositionOptions } from "@/types";
import { arktypeResolver } from "@hookform/resolvers/arktype";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import useUploadMutation, {
    type useUploadQueryProps,
} from "../hooks/use-post-match-mutation";
import { parseKda } from "../lib/parse-kda";
import {
    InputUploadMatchArk,
    type InputUploadMatchT,
    type UploadMatchT,
} from "../types";

export interface UploadFormProps extends useUploadQueryProps {}

const defaultValues = {
    isPlayoffs: false,
    matchRecord: {
        blueWon: false,
    },
    playerMatchRecords: Array(10)
        .fill({})
        .map((_p, idx) => ({
            position: playerPositionOptions.at(idx % 5),
        })),
    blueBans: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
    },
    redBans: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
    },
};

export function UploadForm({ onSuccess, ...options }: UploadFormProps) {
    // 1. Define your form.
    const form = useForm<InputUploadMatchT>({
        resolver: arktypeResolver(InputUploadMatchArk),
        defaultValues,
    });
    const uploadMutation = useUploadMutation({
        ...options,
        onSuccess(...args) {
            form.reset();
            onSuccess?.(...args);
        },
    });

    const playerMatchFields = useFieldArray({
        control: form.control,
        name: "playerMatchRecords",
    });
    const onSubmit = (values: InputUploadMatchT) => {
        const parsed: UploadMatchT = {
            ...values,
            playerMatchRecords: values.playerMatchRecords.map((rec) => ({
                ...rec,
                kda: parseKda(rec.kda.raw),
            })),
        };
        uploadMutation.mutate(parsed);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, (...args) => {
                    console.error(args);
                })}
                className="space-y-8 w-full font-mono"
            >
                <div className="space-y-4">
                    <div className="flex flex-row space-x-4 justify-between">
                        <FormField
                            control={form.control}
                            name="matchRecord.blueTeamName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Blue Team Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Team X"
                                            {...field}
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="matchRecord.redTeamName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Red Team Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Team Y"
                                            {...field}
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="matchRecord.blueWon"
                            render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                    <FormItem className="space-x-4">
                                        <FormLabel>Blue Team Won</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Check this if Blue Team won.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <FormField
                            control={form.control}
                            name="matchRecord.gameTimeSeconds"
                            render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                    <FormItem>
                                        <FormLabel>
                                            Game Time in Seconds
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                value={field.value ?? 0}
                                                onChange={(e) => {
                                                    const val = Number.parseInt(
                                                        e.target.value,
                                                    );
                                                    field.onChange(
                                                        Number.isNaN(val)
                                                            ? 0
                                                            : val,
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="matchRecord.playDate"
                            render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Play Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground",
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP",
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date <
                                                        new Date("2025-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isPlayoffs"
                            render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                    <FormItem>
                                        <FormLabel>Playoffs Game?</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between px-10">
                    <span className="text-4xl text-blue-600">Blue</span>{" "}
                    <span className="text-4xl text-red-600">Red</span>
                </div>
                <section className="grid lg:grid-cols-2 grid-flow-col grid-rows-5 gap-4">
                    {Array(5)
                        .fill(null)
                        .map((_, idx) => (
                            <FormField
                                // biome-ignore lint/suspicious/noArrayIndexKey:
                                key={`blue-${idx}`}
                                control={form.control}
                                name={`blueBans.${(idx + 1) as 1 | 2 | 3 | 4 | 5}`}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2 justify-self-start">
                                        <FormItem>
                                            <FormLabel>
                                                Blue Ban {idx + 1}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Champion X"
                                                    {...field}
                                                    value={field.value ?? ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                        ))}
                    {Array(5)
                        .fill(null)
                        .map((_, idx) => (
                            <FormField
                                // biome-ignore lint/suspicious/noArrayIndexKey:
                                key={`red-${idx}`}
                                control={form.control}
                                name={`redBans.${(idx + 1) as 1 | 2 | 3 | 4 | 5}`}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2 justify-self-end">
                                        <FormItem>
                                            <FormLabel>
                                                Red Ban {idx + 1}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Champion Y"
                                                    {...field}
                                                    value={field.value ?? ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                        ))}
                </section>
                <section className="grid lg:grid-cols-2 grid-flow-col grid-rows-5 gap-4">
                    {playerMatchFields.fields.map((field, index) => (
                        <div
                            key={field.id}
                            className={cn(
                                "space-y-2 border-2 border-green-600 dark:border-amber-200 border-solid p-2 w-4/5",
                                {
                                    "justify-self-start": index < 5,
                                    "justify-self-end": index >= 5,
                                },
                            )}
                        >
                            <h3 className="text-lg font-semibold">
                                Player {index + 1}
                            </h3>
                            <FormField
                                control={form.control}
                                name={`playerMatchRecords.${index}.playerName`}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <FormItem>
                                            <FormLabel>
                                                Player {index + 1} name{" "}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value ?? ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`playerMatchRecords.${index}.championName`}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <FormItem>
                                            <FormLabel>
                                                Player {index + 1} Champion{" "}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value ?? ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`playerMatchRecords.${index}.position`}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <FormItem>
                                            <FormLabel>
                                                Player {index + 1} Position{" "}
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select position" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {playerPositionOptions.map(
                                                        (position) => (
                                                            <SelectItem
                                                                key={position}
                                                                value={position}
                                                            >
                                                                {position}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`playerMatchRecords.${index}.kda.raw`}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <FormItem>
                                            <FormLabel>
                                                Player {index + 1} KDA{" "}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value ?? ""}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Format of input should match
                                                'K/D/A'
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                        </div>
                    ))}
                </section>
                <Button type="submit">Submit Match Data</Button>
            </form>
        </Form>
    );
}
