import { List, Typography } from "antd";
import "./list-item.css";
import { ReactNode } from "react";

export interface ISelectableListProps {
    data: any[];
    selectedId: string | number | null;
    onSelect: (id: number | null) => void;
    footer?: ReactNode;
    renderLabel: (item: any) => string;
    getId: (item: any) => string | number;
}

export function SelectableList(props: ISelectableListProps) {
    const { data, selectedId, onSelect, renderLabel, getId, footer } = props;

    return (
        <List
            dataSource={data}
            renderItem={(item, index) => {
                const id = getId(item);
                const isSelected = selectedId === id;
                const rowClass = `employee-row ${
                    index % 2 === 0 ? "even" : "odd"
                } ${isSelected ? "selected" : ""}`;

                return (
                    <List.Item
                        style={{ height: "25px" }}
                        className={rowClass}
                        onClick={() => onSelect(id)}
                    >
                        <Typography.Text style={{ fontSize: "13px" }}>
                            {renderLabel(item)}
                        </Typography.Text>
                    </List.Item>
                );
            }}
            loadMore={footer}
        />
    );
}
