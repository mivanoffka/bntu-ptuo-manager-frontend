import { tempIds } from "@/controller/employee/utils";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { SelectableList } from "@/view/list/SelectableList";
import { useEffect, useState } from "react";
import { Button, Flex } from "antd";
import { GroupBox, InputField, SecondaryLabel } from "@/view/primitives";
import { IEnumerated } from "@/model";
import { ToolBarButton } from "@/view/manager/toolbar/buttons/ToolBarButton";
import {
    CheckOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    StopOutlined,
} from "@ant-design/icons";
import { Palette } from "@/view/constants";

export interface IEnumerationListProps {
    title: string;
    enumerationName: string;
}

export function EnumerationList(props: IEnumerationListProps) {
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [selectedId, setSelectedId] = useState<string | number | null>(null);
    const { enumerationName, title } = props;

    const [selectedItem, setSelectedItem] = useState<IEnumerated | null>(null);

    const {
        getEnumeration,
        addToEnumeration,
        removeFromEnumeration,
        updateEnumeration,
    } = useEnumerations();

    const enumeration = getEnumeration(enumerationName);

    const getNewItem = () => {
        return { id: tempIds.generate(), label: "Новое значение" };
    };

    useEffect(() => {
        if (selectedId === null) {
            setSelectedItem(null);
        } else {
            setSelectedItem(
                enumeration.find((item) => item.id === selectedId)!
            );
        }
    }, [selectedId]);

    return (
        <Flex vertical>
            <Flex>
                <SecondaryLabel>{title}</SecondaryLabel>
            </Flex>
            <Flex gap="small" style={{ width: "100%" }} vertical>
                <div
                    style={{
                        maxHeight: "500px",
                        width: "100%",
                        height: "100%",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        overflow: "auto",
                    }}
                >
                    <SelectableList
                        data={enumeration}
                        renderLabel={(item) => item.label}
                        getId={(item) => item.id}
                        selectedId={selectedId}
                        onSelect={(id) => {
                            if (selectedId === id) {
                                setSelectedId(null);
                            } else {
                                setSelectedId(id);
                            }
                        }}
                    ></SelectableList>
                </div>
                <Flex gap="small" style={{ width: "100%" }}>
                    <Flex gap="small" style={{ width: "60%" }}>
                        <InputField
                            editModeEnabled={editModeEnabled}
                            value={selectedItem?.label!}
                            onChange={(label) =>
                                setSelectedItem({ ...selectedItem, label })
                            }
                        ></InputField>
                    </Flex>

                    <Flex
                        gap="small"
                        align="center"
                        justify="space-evenly"
                        style={{ width: "40%" }}
                    >
                        {selectedItem === null ? (
                            <ToolBarButton
                                icon={<PlusOutlined />}
                                title="Добавить новую запись"
                                onClick={() => {
                                    setEditModeEnabled(true);
                                    setSelectedItem(getNewItem());
                                }}
                            ></ToolBarButton>
                        ) : editModeEnabled ? (
                            <>
                                <ToolBarButton
                                    color={Palette.GREEN}
                                    icon={<CheckOutlined />}
                                    title="Применить"
                                    onClick={async () => {
                                        if (selectedItem === null) return;

                                        await addToEnumeration(
                                            enumerationName,
                                            selectedItem.label
                                        );
                                        setEditModeEnabled(false);
                                        setSelectedItem(null);
                                    }}
                                ></ToolBarButton>
                                <ToolBarButton
                                    color={Palette.RED}
                                    icon={<StopOutlined />}
                                    title="Отменить"
                                    onClick={async () => {
                                        if (selectedId) {
                                            setSelectedItem(
                                                enumeration.find(
                                                    (item) =>
                                                        item.id === selectedId
                                                )!
                                            );
                                        } else {
                                            setSelectedItem(null);
                                        }

                                        setEditModeEnabled(false);
                                    }}
                                ></ToolBarButton>
                            </>
                        ) : (
                            <>
                                <ToolBarButton
                                    disabled={selectedItem === null}
                                    icon={<EditOutlined />}
                                    title="Изменить"
                                    onClick={() => {
                                        setEditModeEnabled(true);
                                    }}
                                ></ToolBarButton>
                                <ToolBarButton
                                    disabled={selectedItem === null}
                                    icon={<DeleteOutlined />}
                                    title="Удалить"
                                    onClick={async () => {
                                        if (selectedItem === null) return;
                                        await removeFromEnumeration(
                                            enumerationName,
                                            selectedItem.id
                                        );
                                        setSelectedId(null);
                                        setSelectedItem(null);
                                    }}
                                ></ToolBarButton>
                            </>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
