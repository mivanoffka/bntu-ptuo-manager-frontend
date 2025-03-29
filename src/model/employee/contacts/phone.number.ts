import { PhoneNumberType } from "@/model/employee/contacts/phone.number.type";
import { Identifiable } from "@/model/identifiable";

export interface PhoneNumber extends Identifiable {
    id: number;
    value: string | null;
    comment: string | null;
    type: PhoneNumberType | null;
}
