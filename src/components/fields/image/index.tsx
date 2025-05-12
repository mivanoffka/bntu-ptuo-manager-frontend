import { ImageDisplayField } from "@/components/fields/image/display";
import { ImageEditField } from "@/components/fields/image/edit";

export interface IImageFieldProps {
    baseImageUrl: string | null;
    newImage: File | null | undefined;
    setNewImage: (image: File | null | undefined) => void;
    editModeEnabled: boolean;
    width?: number;
    height?: number;
}

export function ImageField(props: IImageFieldProps) {
    const {
        baseImageUrl,
        newImage,
        setNewImage,
        editModeEnabled,
        width,
        height,
    } = props;

    return editModeEnabled ? (
        <ImageEditField
            baseImageUrl={baseImageUrl}
            newImage={newImage}
            setNewImage={setNewImage}
            width={width}
            height={height}
        />
    ) : (
        <ImageDisplayField
            imageUrl={baseImageUrl}
            width={width}
            height={height}
        />
    );
}
