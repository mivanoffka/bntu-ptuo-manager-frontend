import { DateTimeString } from "@/model/date.time.string";
import { IPrimaryKeyed } from "@/model/primary.keyed";
import { ITimeStamped } from "@/model/timestamped";

export interface IName extends IPrimaryKeyed, ITimeStamped {
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
}

export class NameUtility {
    static getFullName(name: IName | null, onNull?: string): string {
        if (!name) {
            return onNull ?? "–";
        }

        const { firstName, lastName, middleName } = name;

        if (!firstName && !lastName && !middleName) {
            return onNull ?? "–";
        }

        return `${lastName} ${firstName} ${middleName}`;
    }

    private static updatedNamePart(
        name: IName,
        newValue: string,
        fieldName: string
    ) {
        return { ...name, [fieldName]: newValue };
    }

    static updatedFirstName(name: IName, value: string) {
        return NameUtility.updatedNamePart(name, value, "firstName");
    }

    static updatedLastName(name: IName, value: string) {
        return NameUtility.updatedNamePart(name, value, "lastName");
    }

    static updatedMiddleName(name: IName, value: string) {
        return NameUtility.updatedNamePart(name, value, "middleName");
    }
}
