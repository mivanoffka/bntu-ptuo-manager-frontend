import { IPrimaryKeyed, ITimeStamped, DateTimeString } from "@/model/basics";
import {
    IBntuPosition,
    IPhoneNumber,
    IEmail,
    IAddress,
    IEducationalInstitution,
    IRelative,
    IReward,
    IComment,
} from "@/model/employees/fields";

export interface IEmployeeVersion extends IPrimaryKeyed, ITimeStamped {
    [key: string]: any;

    // Common

    firstName: string | null;
    middleName: string | null;
    lastName: string | null;

    birthdate: DateTimeString | null;
    birthplace: string | null;
    genderId: number | null;

    imagePath: string | null;

    // BNTU

    bntuPositions: IBntuPosition[];

    // TradeUnion

    tradeUnionMembershipNumber: string | null;
    tradeUnionDepartmentAuthenticLabel: string | null;
    tradeUnionDepartmentPath: string | null;
    workingGroupId: number | null;

    joinedAt: DateTimeString | null;
    recordedAt: DateTimeString | null;
    isArchived: boolean | null;
    archivedAt: DateTimeString | null;
    isRetired: boolean | null;
    retiredAt: DateTimeString | null;

    // Contacts

    phoneNumbers: IPhoneNumber[];
    emails: IEmail[];
    addresses: IAddress[];

    // Education

    educationalInstitutions: IEducationalInstitution[];
    academicDegreeId: number | null;
    educationLevelId: number | null;

    // Other

    relatives: IRelative[];
    rewards: IReward[];
    comments: IComment[];
    exemptionIds: number[];
}
