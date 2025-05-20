import { ConfigProviderProps, Flex } from "antd/lib";
import ruRU from "antd/lib/locale/ru_RU";

export const enum Palette {
    RED = "#de2358",
    GREEN = "#36b553",
    BLUE = "#5a72e8",

    LIGHT_GRAY = "#c0c0c0",
    GRAY = "#858585",
}

export const enum FontSize {
    SMALL = 12,
    MEDIUM = 14,
    LARGE = 16,
}

export const ANTD_CONFIG: ConfigProviderProps = {
    theme: {
        token: {
            colorPrimary: Palette.BLUE,
            colorLink: Palette.BLUE,
            fontSize: FontSize.MEDIUM,
            colorError: Palette.RED,
            colorSuccess: Palette.GREEN,
            colorInfo: Palette.BLUE,
        },
    },
    componentSize: "small",
    locale: { locale: "ru-RU" },
    renderEmpty: () => (
        <Flex
            align="center"
            justify="center"
            style={{ height: "100%", width: "100%" }}
        >
            Пусто
        </Flex>
    ),
};
