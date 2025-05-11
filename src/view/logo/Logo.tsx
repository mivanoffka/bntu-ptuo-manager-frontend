import { Palette } from "@/view/constants";
import React from "react";

export interface ICubeProps {
    letters: string[];
    colors: Palette[];
    size: number;
    fontSize: number;
    fontFamily: string;
}

export const Cube = (props: ICubeProps) => {
    const { letters, size, fontSize, colors, fontFamily } = props;

    const half = size / 2;

    const faceStyle = {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: "none",
        border: "none",
        color: "#0ff",
        fontFamily,
        fontSize: `${fontSize}px`,
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const faces = {
        front: { transform: `translateZ(${half}px)` },
        right: { transform: `rotateY(90deg) translateZ(${half}px)` },
        top: { transform: `rotateX(90deg) translateZ(${half}px)` },
    };

    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                position: "relative",
                transformStyle: "preserve-3d",
                transform: "rotateX(-45deg) rotateY(-45deg)",
            }}
        >
            <div style={{ ...faceStyle, ...faces.front, color: colors[0] }}>
                {letters[0]}
            </div>
            <div style={{ ...faceStyle, ...faces.right, color: colors[2] }}>
                {letters[2]}
            </div>
            <div style={{ ...faceStyle, ...faces.top, color: colors[1] }}>
                {letters[1]}
            </div>
        </div>
    );
};

export const Logo = () => (
    <Cube
        letters={["П", "П", "О"]}
        size={22}
        fontSize={28}
        colors={[Palette.GREEN, Palette.GREEN, Palette.BLUE]}
        // fontFamily="Exotc350 Bd BT"
    />
);
