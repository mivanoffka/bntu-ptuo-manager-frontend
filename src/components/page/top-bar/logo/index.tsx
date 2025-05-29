import { Cube } from "@/components/page/top-bar/logo/cube";
import { Palette } from "@/constants";

export interface ILogoProps {
    size?: number;
}

export const Logo = (props: ILogoProps) => {
    const { size = 22 } = props;
    const fontSize = size * 1.28;

    return (
        <Cube
            letters={["П", "П", "О"]}
            size={size}
            fontSize={fontSize}
            colors={[Palette.GREEN, Palette.GREEN, Palette.BLUE]}
            fontFamily="Exotc350 Bd BT"
        />
    );
};
