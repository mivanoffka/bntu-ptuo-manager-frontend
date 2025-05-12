import { IEnumerated, IPrimaryKeyed, DateTimeString } from "@/model/basics";

export interface IAcademicDegree extends IEnumerated {}

export interface IEducationalInstitution extends IPrimaryKeyed {
    label: string | null;
    graduatedAt: DateTimeString | null;
    comment: string | null;
}
export interface IEducationLevel extends IEnumerated {}
