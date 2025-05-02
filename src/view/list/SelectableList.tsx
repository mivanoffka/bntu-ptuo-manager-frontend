import { List, Typography, Flex } from "antd";
import { ToolBarButton } from "@/view/manager/toolbar/buttons/ToolBarButton";
import { PlusOutlined } from "@ant-design/icons";
import "./list-item.css";

export function SelectableList({
    data,
    selectedId,
    onSelect,
    onLoadMore,
    renderLabel,
    getId,
}: {
    data: any[];
    selectedId: string | number | null;
    onSelect: (id: string | number) => void;
    onLoadMore?: () => void;
    renderLabel: (item: any) => string;
    getId: (item: any) => string | number;
}) {
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
            loadMore={
                onLoadMore && (
                    <Flex
                        justify="center"
                        align="center"
                        style={{ height: "25px" }}
                    >
                        <ToolBarButton
                            onClick={onLoadMore || (() => {})}
                            title="Больше"
                            icon={<PlusOutlined />}
                        />
                    </Flex>
                )
            }
        />
    );
}
