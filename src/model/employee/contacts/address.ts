import { Identifiable } from "@/model/identifiable";

export interface Address extends Identifiable {
    id: number;
    value: string | null;
    comment: string | null;
}
