import { ThemeConfig } from "antd";

export const enum Palette {
    RED = "#de2358",
    GREEN = "#36b553",
    // BLUE = "#665fde",
    BLUE = "#5a72e8",

    LIGHT_GRAY = "#c0c0c0",
    GRAY = "#858585",
}

export const enum FontSize {
    SMALL = 12,
    MEDIUM = 14,
    LARGE = 16,
}

export const THEME: ThemeConfig = {
    token: {
        colorPrimary: Palette.BLUE,
        colorLink: Palette.BLUE,
        fontSize: FontSize.MEDIUM,
    },
};
