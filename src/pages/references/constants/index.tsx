import { EnumerationName } from "@/contexts/enumerations/constants";
import { TreeName } from "@/contexts/trees/constants";

export interface IReferenceInfo {
    value: string;
    label: string;
    isTree: boolean;
}

export const ENUMS_REFERENCES = [
    {
        value: EnumerationName.ACADEMIC_DEGREES,
        label: "Ученая степень",
        isTree: false,
    },
    {
        value: EnumerationName.EDUCATION_LEVELS,
        label: "Образование",
        isTree: false,
    },
    {
        value: EnumerationName.WORKING_GROUPS,
        label: "Профгруппа",
        isTree: true,
    },
    {
        value: EnumerationName.GENDERS,
        label: "Пол",
        isTree: false,
    },
    {
        value: EnumerationName.PHONE_NUMBER_TYPES,
        label: "Подразделение",
        isTree: false,
    },
    {
        value: EnumerationName.RELATIVE_TYPES,
        label: "Родство",
        isTree: false,
    },
];

export const TREE_REFERENCES = [
    {
        value: TreeName.BNTU_DEPARTMENTS,
        label: "Структура БНТУ",
        isTree: true,
    },
    {
        value: TreeName.TRADE_UNION_DEPARTMENTS,
        label: "Структура ЦПО",
        isTree: true,
    },
];

export const REFERENCES = [...ENUMS_REFERENCES, ...TREE_REFERENCES];
