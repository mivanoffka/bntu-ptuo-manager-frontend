import { Cube } from "@/components/page/top-bar/logo/cube";
import { Palette } from "@/constants";

export const Logo = () => (
    <Cube
        letters={["П", "П", "О"]}
        size={22}
        fontSize={28}
        colors={[Palette.GREEN, Palette.GREEN, Palette.BLUE]}
        fontFamily="Exotc350 Bd BT"
    />
);
