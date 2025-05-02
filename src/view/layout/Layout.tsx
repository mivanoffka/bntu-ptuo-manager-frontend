import "./style/index.css";

export interface ILayoutProps {
    children?: React.ReactNode;
}

export function Layout(props: ILayoutProps) {
    const { children } = props;

    return <div className="layout">{children}</div>;
}
