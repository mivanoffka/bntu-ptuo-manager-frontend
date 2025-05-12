import { IPrimaryKeyed, DateTimeString } from "@/model/basics";
import { IEmployeeVersion } from "@/model/employees/version";

export interface IEmployee extends IPrimaryKeyed {
    employeeVersionTimestamps: DateTimeString[];
    latestEmployeeVersion: IEmployeeVersion;
}
