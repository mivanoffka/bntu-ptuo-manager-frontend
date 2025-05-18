import { Flex, Image, Typography } from "antd";
import { FontSize, Palette } from "@/constants";

export interface IImageDisplayFieldProps {
    imageUrl: string | null;
    width?: number;
    height?: number;
    placeholder?: string;
}

export function ImageDisplayField(props: IImageDisplayFieldProps) {
    const { imageUrl, width, height, placeholder = "Без фото" } = props;

    return imageUrl ? (
        <Image
            preview={false}
            src={imageUrl}
            style={{
                width,
                height,
                borderRadius: "4px",
            }}
        />
    ) : (
        <Flex
            align="center"
            justify="center"
            style={{
                width,
                height,
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
            }}
        >
            <Typography.Text
                style={{
                    textAlign: "center",
                    fontSize: FontSize.SMALL,
                    color: Palette.GRAY,
                }}
            >
                {placeholder}
            </Typography.Text>
        </Flex>
    );
}
