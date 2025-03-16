import { useEmployeeUpdater } from "@/controller/employee/updaters/EmployeeUpdaterContext";
import { createHook } from "@/controller/utils";
import { Address, Email, PhoneNumber } from "@/model";
import { createContext } from "react";

export interface IEmployeeContactsUpdater {
    phoneNumbers: PhoneNumber[] | null;
    emails: Email[] | null;
    addresses: Address[] | null;

    updatePhoneNumbers: (value: PhoneNumber[]) => void;
    updateEmails: (value: Email[]) => void;
    updateAddresses: (value: Address[]) => void;
}

export const EmployeeContactsUpdater = createContext<IEmployeeContactsUpdater>(
    {} as IEmployeeContactsUpdater
);

export function EmployeeContactsUpdaterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { contacts, updateContacts } = useEmployeeUpdater();

    const phoneNumbers = contacts?.phoneNumbers || null;
    const emails = contacts?.emails || null;
    const addresses = contacts?.addresses || null;

    function updatePhoneNumbers(value: PhoneNumber[]) {
        if (!contacts) {
            return;
        }
        updateContacts({ ...contacts, phoneNumbers: value });
    }

    function updateEmails(value: Email[]) {
        if (!contacts) {
            return;
        }
        updateContacts({ ...contacts, emails: value });
    }

    function updateAddresses(value: Address[]) {
        if (!contacts) {
            return;
        }
        updateContacts({ ...contacts, addresses: value });
    }

    const context: IEmployeeContactsUpdater = {
        phoneNumbers,
        emails,
        addresses,
        updatePhoneNumbers,
        updateEmails,
        updateAddresses,
    };

    return (
        <EmployeeContactsUpdater.Provider value={context}>
            {children}
        </EmployeeContactsUpdater.Provider>
    );
}

export const useEmployeeContactsUpdater = createHook(EmployeeContactsUpdater);
