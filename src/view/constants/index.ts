import { ThemeConfig } from "antd";

export const enum Color {
    RED = "#cf1322",
    GREEN = "#389e0d",
    BLUE = "#1677ff",

    GRAY = "#858585",
}

export const enum FontSize {
    SMALL = 12,
    MEDIUM = 14,
    LARGE = 16,
}

export const THEME: ThemeConfig = {
    token: {
        colorPrimary: Color.BLUE,
        colorLink: Color.BLUE,
        fontSize: FontSize.MEDIUM,
    },
};
