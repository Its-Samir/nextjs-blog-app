"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { Button } from "@/components/ui/button";

export default function AuthModal({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState(false);

    function handleClick() {
        setMode(p => !p);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-max md:w-full">
                {mode ? <RegisterForm /> : <LoginForm />}
                <Button onClick={handleClick}>
                    Switch to {mode ? "Login" : "Register"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}
