import { Input } from "@/components/ui/input";
import React from "react";

export interface DebouncedInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value: string | number;
    onChange: React.Dispatch<number | string>;
    debounce?: number;
}
/**
 * A typical debounced input react component
 */
export function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: DebouncedInputProps) {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
        // if value hasn't changed, don't trigger onChange
        if (value === initialValue) {
            return;
        }
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value, initialValue, onChange, debounce]);

    return (
        <Input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
