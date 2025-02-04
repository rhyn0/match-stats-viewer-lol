import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import { Check, ChevronsUpDown } from "lucide-react";
import { allChampions } from "../constants";

export interface ChampionFormComboboxProps {
    value: string;
    onSelect: (champ: string) => void;
}

function ChampionFormCombobox({ value, onSelect }: ChampionFormComboboxProps) {
    return (
        <Popover defaultOpen={false}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        // biome-ignore lint/a11y/useSemanticElements:
                        role="combobox"
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? allChampions.find((champ) => champ === value)
                            : "Select champion..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {allChampions.map((champ) => (
                                <CommandItem
                                    key={champ}
                                    value={champ}
                                    onSelect={() => onSelect(champ)}
                                >
                                    <Check
                                        className={cn(
                                            "ml-auto mr-2 h-4 w-4",
                                            champ === value
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {champ}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default ChampionFormCombobox;
