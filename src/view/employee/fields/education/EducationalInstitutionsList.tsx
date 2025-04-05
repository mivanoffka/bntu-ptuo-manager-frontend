import { Listed } from "@/view/primitives/listed/Listed";
import { IEducationalInstitution } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { EducationalInstitutionField } from "@/view/employee/fields/education/EducationalInstitutionField";
import { useEmployeeEditor } from "@/controller/employee";

export function EducationalInstitutionsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getEducationalInstitutions = () =>
        getList<IEducationalInstitution>("educationalInstitutions");

    const addEducationalInstitution = () =>
        updateList<IEducationalInstitution>("educationalInstitutions", {
            id: tempIds.generate(),
            label: null,
            graduatedAt: null,
            comment: null,
        });

    const updateEducationalInstitution = (
        educationalInstitution: IEducationalInstitution
    ) =>
        updateList<IEducationalInstitution>(
            "educationalInstitutions",
            educationalInstitution
        );

    const removeEducationalInstitution = (
        educationalInstitution: IEducationalInstitution
    ) =>
        removeFromList<IEducationalInstitution>(
            "educationalInstitutions",
            educationalInstitution
        );

    return (
        <Listed
            items={getEducationalInstitutions()}
            FieldType={EducationalInstitutionField}
            get={getEducationalInstitutions}
            add={addEducationalInstitution}
            update={updateEducationalInstitution}
            remove={removeEducationalInstitution}
            title="Учебные учреждения"
        ></Listed>
    );
}
