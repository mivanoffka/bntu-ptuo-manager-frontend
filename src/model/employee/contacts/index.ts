import { Address } from "@/model/employee/contacts/address";
import { PhoneNumber } from "@/model/employee/contacts/phone.number";
import { Email } from "@/model/employee/contacts/email";

export interface EmployeeContacts {
    phoneNumbers: PhoneNumber[];
    emails: Email[];
    addresses: Address[];
}

export { Address, PhoneNumber, Email };
