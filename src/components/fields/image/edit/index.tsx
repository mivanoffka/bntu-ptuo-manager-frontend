import { IconButton } from "@/components/buttons";
import { ImageDisplayField } from "@/components/fields/image/display";
import { Palette } from "@/constants";
import {
    CloseOutlined,
    DeleteOutlined,
    RedoOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { Flex } from "antd";
import { useState, useRef } from "react";
import "./style.css"; // <-- import a CSS file

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
    const [imageUrl, setImageUrl] = useState<string | null>(baseImageUrl);

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

    const resetImage = () => {
        setImageUrl(baseImageUrl);
        setNewImage(undefined);
    };

    const deleteImage = () => {
        setImageUrl(null);
        setNewImage(null);
    };

    return (
        <div className="image-edit-wrapper">
            <ImageDisplayField
                imageUrl={imageUrl}
                width={width}
                height={height}
                placeholder=""
            />
            <Flex
                align="center"
                justify="center"
                className={`overlay ${imageUrl ? "with-image" : "no-image"}`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {imageUrl ? (
                    <Flex
                        vertical
                        align="center"
                        justify="center"
                        gap="small"
                        style={{
                            background: "white",
                            opacity: 0.9,
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <IconButton
                            color={Palette.GREEN}
                            icon={<RedoOutlined />}
                            onClick={handleUploadClick}
                            title="Заменить"
                        />
                        {newImage ? (
                            <IconButton
                                color={Palette.RED}
                                icon={<CloseOutlined />}
                                onClick={resetImage}
                                title="Сбросить"
                            />
                        ) : (
                            <IconButton
                                color={Palette.RED}
                                icon={<DeleteOutlined />}
                                onClick={deleteImage}
                                title="Удалить"
                            />
                        )}
                    </Flex>
                ) : (
                    <IconButton
                        color={Palette.GREEN}
                        icon={<UploadOutlined />}
                        onClick={handleUploadClick}
                        title="Загрузить"
                    />
                )}
            </Flex>
        </div>
    );
}
