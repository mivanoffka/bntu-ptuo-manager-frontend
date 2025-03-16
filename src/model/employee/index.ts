import { EmployeeBNTU } from "@/model/employee/bntu";
import { EmployeeCommon } from "@/model/employee/common";
import { EmployeeContacts } from "@/model/employee/contacts";
import { EmployeeEducation } from "@/model/employee/education";
import { EmployeeOther } from "@/model/employee/other";
import { EmployeePTUO } from "@/model/employee/ptuo";
import { EmployeeRelatives } from "@/model/employee/relatives";
import { EmployeeRewards } from "@/model/employee/rewards";

export interface Employee {
    id: number | null;
    common: EmployeeCommon;
    bntu: EmployeeBNTU;
    ptuo: EmployeePTUO;
    education: EmployeeEducation;
    contacts: EmployeeContacts;
    relatives: EmployeeRelatives;
    rewards: EmployeeRewards;
    other: EmployeeOther;
}
