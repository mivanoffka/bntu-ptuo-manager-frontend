import { Identifiable } from "@/model/identifiable";

export interface Email extends Identifiable {
    id: number;
    value: string | null;
    comment: string | null;
}
