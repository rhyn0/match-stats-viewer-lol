import React from "react";

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

function useLocalStorage<T extends JSONValue>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = React.useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage key:", key, error);
            return initialValue;
        }
    });

    const setValue = React.useCallback(
        (value: React.SetStateAction<T>) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error("Error setting localStorage key:", key, error);
            }
        },
        [key, storedValue],
    );

    React.useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key) {
                setStoredValue(
                    e.newValue ? JSON.parse(e.newValue) : initialValue,
                );
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key, initialValue]);

    return [storedValue, setValue] as const;
}

export default useLocalStorage;
