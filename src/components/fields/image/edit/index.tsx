import { ImageDisplayField } from "@/components/fields/image/display";
import { Button, Flex } from "antd";
import { useState, useRef } from "react";

export interface IImageEditFieldProps {
    baseImageUrl: string | null;
    newImage: File | null | undefined;
    setNewImage: (image: File | null | undefined) => void;
    width?: number;
    height?: number;
}

export function ImageEditField(props: IImageEditFieldProps) {
    const { baseImageUrl, newImage, setNewImage, width, height } = props;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setNewImage(file);
            setImageUrl(fileUrl);
        }
    };

    const [imageUrl, setImageUrl] = useState<string | null>(baseImageUrl);

    const resetImage = () => {
        setImageUrl(baseImageUrl);
        setNewImage(undefined);
    };

    const deleteImage = () => {
        setImageUrl(null);
        setNewImage(null);
    };

    return (
        <Flex vertical>
            <ImageDisplayField
                imageUrl={imageUrl}
                width={width}
                height={height}
            ></ImageDisplayField>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
            />
            {imageUrl ? (
                <Flex>
                    <Button onClick={handleUploadClick}>Заменить</Button>
                    {newImage ? (
                        <Button onClick={resetImage}>Сбросить</Button>
                    ) : (
                        <Button onClick={deleteImage}>Удалить</Button>
                    )}
                </Flex>
            ) : (
                <Button onClick={handleUploadClick}>Загрузить</Button>
            )}
        </Flex>
    );
}
