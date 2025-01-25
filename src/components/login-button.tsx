"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

interface LoginButtonProps {
    className?: string;
}
export default function LoginButton({ className }: LoginButtonProps) {
    const { status } = useSession();
    if (status === "authenticated") {
        return (
            <Button
                onMouseDown={() => signOut()}
                className={className}
                variant="secondary"
            >
                Sign Out
            </Button>
        );
    }
    return (
        <Button
            onMouseDown={() => signIn()}
            className={className}
            variant="secondary"
        >
            Sign In
        </Button>
    );
}
