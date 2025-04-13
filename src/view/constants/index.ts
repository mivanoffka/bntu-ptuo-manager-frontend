import { ThemeConfig } from "antd";

export const enum Palette {
    RED = "#cf1322",
    GREEN = "#237804",
    BLUE = "#1677ff",

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
