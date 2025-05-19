import { ImageField } from "@/components/fields/image";
import { IFieldProps } from "@/components/fields/shared";
import { useEmployeeEditor } from "@/contexts/employees/editor";

export function EmployeePhotoField(props: IFieldProps) {
    const { isEditable } = props;
    const { getNewImage, setNewImage, getField } = useEmployeeEditor();

    const imagePath = getField<string | null>("imagePath");
    const baseImageUrl = imagePath ? `http://localhost:8000/${imagePath}` : "";

    return (
        <div style={{ border: "1px solid #d9d9d9", borderRadius: "4px" }}>
            <ImageField
                editModeEnabled={isEditable}
                newImage={getNewImage()}
                setNewImage={setNewImage}
                baseImageUrl={baseImageUrl}
                width={112}
                height={150}
            ></ImageField>
        </div>
    );
}
