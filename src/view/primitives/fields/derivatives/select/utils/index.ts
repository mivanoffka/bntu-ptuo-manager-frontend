import { IEnumerated } from "@/model";

export function enumToOptions<T extends IEnumerated>(enumeration: T[]) {
    return enumeration.map((item) => ({
        value: item.id,
        label: item.label,
    }));
}
