import { Context, useContext } from "react";

export const createHook = <T>(context: Context<T>) => {
    return () => {
        const ctx = useContext(context);
        if (!ctx) {
            throw new Error("Hook must be used within a Provider");
        }
        return ctx;
    };
};
