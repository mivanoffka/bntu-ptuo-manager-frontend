import { createContext, useContext } from "react";
import { DisplayedEmployee } from "./DisplayedEmployeeContext";
import { createHook } from "@/controller/utils";
import {
    AcademicDegree,
    Address,
    BntuPosition,
    EducationLevel,
    Email,
    Gender,
    PhoneNumber,
    Relative,
    Reward,
    TradeUnionPosition,
    Employee,
} from "@/model";
import { DateTimeString } from "@/model/date.time.string";
import { tempIds } from "@/controller/employee/utils";

export interface IEmployeeUpdater {
    updateGender(value: Gender): void;
    updateFirstName(value: string): void;
    updateLastName(value: string): void;
    updateMiddleName(value: string): void;
    updateBirthdate(value: DateTimeString): void;
    updateBirthplace(value: string): void;
    updateBntuPositions(value: BntuPosition[]): void;
    updateTradeUnionPositions(value: TradeUnionPosition[]): void;
    updateJoinedAt(value: DateTimeString): void;
    updateIsArchived(value: boolean): void;
    updateArchivedAt(value: DateTimeString): void;
    updateIsRetired(value: boolean): void;
    updateRetiredAt(value: DateTimeString): void;
    updateEducationalInstitutions(value: string[]): void;
    updateEducationLevel(value: EducationLevel): void;
    updateAcademicDegree(value: AcademicDegree): void;
    updatePhoneNumbers(value: PhoneNumber[]): void;
    updateAddresses(value: Address[]): void;
    getEmails(): Email[];
    addEmail(): void;
    updateEmail(value: Email): void;
    removeEmail(value: Email): void;
    updateComments(value: Comment[]): void;
    updateRewards(value: Reward[]): void;
    updateRelatives(value: Relative[]): void;
}

interface Identifiable {
    id: any;
}

export const EmployeeUpdater = createContext<IEmployeeUpdater>(
    {} as IEmployeeUpdater
);

export function EmployeeUpdaterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { displayedEmployee, update } = useContext(DisplayedEmployee);

    function updateField<T>(fieldName: string, value: T) {
        if (!displayedEmployee) {
            return;
        }

        update({ ...displayedEmployee, [fieldName]: value });
    }

    function getList<T extends Identifiable>(fieldName: string): T[] {
        if (!displayedEmployee) {
            return [];
        }

        return (displayedEmployee[fieldName] as T[]) || ([] as T[]);
    }

    function updateList<T extends Identifiable>(fieldName: string, value: T) {
        if (!displayedEmployee) {
            return;
        }

        const list = (displayedEmployee[fieldName] as T[]) || ([] as T[]);

        update({
            ...displayedEmployee,
            [fieldName]: [
                ...list.filter((item) => item.id !== value.id),
                value,
            ],
        });
    }

    function removeFromList<T extends Identifiable>(
        fieldName: string,
        value: T
    ) {
        if (!displayedEmployee) {
            return;
        }

        const list = (displayedEmployee[fieldName] as T[]) || ([] as T[]);

        console.log(value);
        console.log(list);

        update({
            ...displayedEmployee,
            [fieldName]: list.filter((item) => item.id !== value.id),
        });
    }

    // region Common

    function updateGender(value: Gender) {
        updateField<Gender>("gender", value);
    }

    function updateNamePart(fieldName: string, value: string) {
        if (!displayedEmployee) {
            return;
        }

        const { names } = displayedEmployee;
        const { relevant, history } = names;

        let newRelevant = relevant;

        if (!newRelevant) {
            newRelevant = {
                firstName: null,
                lastName: null,
                middleName: null,
            };
        }

        update({
            ...displayedEmployee,
            names: {
                relevant: { ...newRelevant, [fieldName]: value },
                history,
            },
        });
    }

    function updateFirstName(value: string) {
        updateNamePart("firstName", value);
    }

    function updateLastName(value: string) {
        updateNamePart("lastName", value);
    }

    function updateMiddleName(value: string) {
        updateNamePart("middleName", value);
    }

    function updateBirthdate(value: DateTimeString) {
        updateField<DateTimeString>("birthdate", value);
    }

    function updateBirthplace(value: string) {
        updateField<string>("birthplace", value);
    }

    // endregion

    // region BNTU

    function updateBntuPositions(value: BntuPosition[]) {
        updateField<BntuPosition[]>("bntuPositions", value);
    }

    // endregion

    // region Trade union

    function updateTradeUnionPositions(value: TradeUnionPosition[]) {
        updateField<TradeUnionPosition[]>("tradeUnionPosition", value);
    }

    function updateJoinedAt(value: DateTimeString) {
        updateField<DateTimeString>("joinedAt", value);
    }

    function updateIsArchived(value: boolean) {
        updateField<boolean>("isArchived", value);
    }

    function updateArchivedAt(value: DateTimeString) {
        updateField<DateTimeString>("archivedAt", value);
    }

    function updateIsRetired(value: boolean) {
        updateField<boolean>("isRetired", value);
    }

    function updateRetiredAt(value: DateTimeString) {
        updateField<DateTimeString>("retiredAt", value);
    }

    // endregion

    // region Education

    function updateEducationalInstitutions(value: string[]) {
        updateField<string[]>("educationalInstitutions", value);
    }

    function updateEducationLevel(value: EducationLevel) {
        updateField<EducationLevel>("educationLevel", value);
    }

    function updateAcademicDegree(value: AcademicDegree) {
        updateField<AcademicDegree>("academicDegree", value);
    }

    // endregion

    // region Contacts

    function updateAddresses(value: Address[]) {
        updateField<Address[]>("addresses", value);
    }

    function getEmails() {
        return getList<Email>("emails");
    }

    function addEmail() {
        updateList<Email>("emails", {
            id: tempIds.generate(),
            value: "",
            comment: "",
        });
    }

    function updateEmail(email: Email) {
        updateList<Email>("emails", email);
    }

    function removeEmail(email: Email) {
        removeFromList<Email>("emails", email);
    }

    function updatePhoneNumbers(value: PhoneNumber[]) {
        updateField<PhoneNumber[]>("phoneNumbers", value);
    }

    // endregion

    // region Other

    function updateComments(value: Comment[]) {
        updateField<Comment[]>("comments", value);
    }

    function updateRewards(value: Reward[]) {
        updateField<Reward[]>("comments", value);
    }

    function updateRelatives(value: Relative[]) {
        updateField<Relative[]>("comments", value);
    }

    // endregion

    const context: IEmployeeUpdater = {
        updateGender,
        updateFirstName,
        updateLastName,
        updateMiddleName,
        updateBirthdate,
        updateBirthplace,
        updateBntuPositions,
        updateTradeUnionPositions,
        updateJoinedAt,
        updateIsArchived,
        updateArchivedAt,
        updateIsRetired,
        updateRetiredAt,
        updateEducationalInstitutions,
        updateEducationLevel,
        updateAcademicDegree,
        updatePhoneNumbers,
        updateAddresses,
        getEmails,
        addEmail,
        updateEmail,
        removeEmail,
        updateComments,
        updateRewards,
        updateRelatives,
    };

    return (
        <EmployeeUpdater.Provider value={context}>
            {children}
        </EmployeeUpdater.Provider>
    );
}

export const useEmployeeUpdater = createHook(EmployeeUpdater);
