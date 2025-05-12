import { snakeCase } from "lodash";

export function toSnakeCase(obj: unknown): unknown {
    if (Array.isArray(obj)) {
        return obj.map(toSnakeCase);
    } else if (obj !== null && typeof obj === "string") {
        return snakeCase(obj);
    } else if (obj !== null && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                snakeCase(key),
                typeof value === "string" ? value : toSnakeCase(value),
            ])
        );
    }
    return obj;
}
