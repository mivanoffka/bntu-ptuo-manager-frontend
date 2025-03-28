import "./style/utils.css";

export interface IBoxProps {
    children: React.ReactNode;
}

export function VBox(props: IBoxProps) {
    const { children } = props;

    return <div className="v-box">{children}</div>;
}
