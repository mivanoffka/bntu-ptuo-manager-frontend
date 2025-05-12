import { Flex, Image, Typography } from "antd";
import { FontSize, Palette } from "@/constants";

export interface IImageDisplayFieldProps {
    imageUrl: string | null;
    width?: number;
    height?: number;
}

export function ImageDisplayField(props: IImageDisplayFieldProps) {
    const { imageUrl, width, height } = props;

    return imageUrl ? (
        <Image preview={false} src={imageUrl} style={{ width, height }} />
    ) : (
        <Flex
            align="center"
            justify="center"
            style={{
                width,
                height,
                border: "1px solid #d9d9d9",
            }}
        >
            <Typography.Text
                style={{
                    textAlign: "center",
                    fontSize: FontSize.SMALL,
                    color: Palette.GRAY,
                }}
            >
                Без фото
            </Typography.Text>
        </Flex>
    );
}
