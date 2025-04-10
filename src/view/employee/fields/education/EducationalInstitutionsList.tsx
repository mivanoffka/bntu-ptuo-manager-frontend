import { Listed } from "@/view/primitives/listed/Listed";
import { IEducationalInstitution } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { EducationalInstitutionField } from "@/view/employee/fields/education/EducationalInstitutionField";
import { useEmployeeEditor } from "@/controller/employee";

export function EducationalInstitutionsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getEducationalInstitutions = () =>
        getList<IEducationalInstitution>("educationalInstitutions");

    const getNewEducationalInstitution = () => ({
        id: tempIds.generate(),
        label: null,
        graduatedAt: null,
        comment: null,
    });

    const updateEducationalInstitution = (
        item: IEducationalInstitution | null
    ) => {
        if (item) {
            updateList<IEducationalInstitution>(
                "educationalInstitutions",
                item
            );
        }
    };

    const removeEducationalInstitution = (item: IEducationalInstitution) =>
        removeFromList<IEducationalInstitution>(
            "educationalInstitutions",
            item
        );

    return (
        <Listed<IEducationalInstitution>
            items={getEducationalInstitutions()}
            FieldType={EducationalInstitutionField}
            newItemGetter={getNewEducationalInstitution}
            onChange={updateEducationalInstitution}
            onDelete={removeEducationalInstitution}
            title="Учебные учреждения"
        ></Listed>
    );
}
