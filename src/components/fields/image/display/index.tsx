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
            }}
        />
    ) : (
        <Flex
            align="center"
            justify="center"
            style={{
                width,
                height,
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
