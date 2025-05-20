import { IconButton } from "@/components/buttons";
import { SecondaryLabel } from "@/components/labels";
import { SelectableList } from "@/components/selectable-list";
import { Palette } from "@/constants";
import { tempIds } from "@/contexts/employees/utils";
import { useEnumerations } from "@/contexts/enumerations";
import { IEnumerated } from "@/model";
import { EnumerationsListItem } from "@/pages/references/list/list-item";
import {
    PlusOutlined,
    CheckOutlined,
    StopOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { Divider, Flex, Input } from "antd";
import { E } from "node_modules/@faker-js/faker/dist/airline-CBNP41sR";
import { useState, useEffect } from "react";

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
        return { id: tempIds.generate(), label: null };
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
                        minHeight: "50px",
                        width: "100%",
                        height: "100%",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        overflow: "auto",
                    }}
                >
                    <SelectableList
                        data={enumeration}
                        RenderItem={EnumerationsListItem}
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
                    {(selectedItem || editModeEnabled) && (
                        <Flex gap="small" style={{ width: "50%" }}>
                            <Input
                                placeholder="Укажите значение"
                                value={selectedItem?.label!}
                                onChange={(e) =>
                                    setSelectedItem({
                                        ...selectedItem,
                                        label: e.target.value,
                                    })
                                }
                            ></Input>
                        </Flex>
                    )}

                    <Flex
                        gap="small"
                        align="center"
                        justify="space-evenly"
                        style={{
                            width:
                                selectedItem || editModeEnabled
                                    ? "50%"
                                    : "100%",
                        }}
                    >
                        {selectedItem === null ? (
                            <IconButton
                                icon={<PlusOutlined />}
                                title="Добавить новую запись"
                                onClick={() => {
                                    setEditModeEnabled(true);
                                    setSelectedItem(getNewItem());
                                }}
                            ></IconButton>
                        ) : editModeEnabled ? (
                            <>
                                <IconButton
                                    color={Palette.GREEN}
                                    icon={<CheckOutlined />}
                                    title="Применить"
                                    onClick={async () => {
                                        if (selectedItem === null) return;

                                        if (selectedItem.id >= 0) {
                                            await updateEnumeration(
                                                enumerationName,
                                                selectedItem.id,
                                                selectedItem.label
                                            );
                                        } else {
                                            await addToEnumeration(
                                                enumerationName,
                                                selectedItem.label
                                            );
                                        }

                                        setEditModeEnabled(false);
                                        setSelectedItem(null);
                                    }}
                                ></IconButton>
                                <IconButton
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
                                ></IconButton>
                            </>
                        ) : (
                            <>
                                <IconButton
                                    disabled={selectedItem === null}
                                    icon={<EditOutlined />}
                                    title="Изменить"
                                    onClick={() => {
                                        setEditModeEnabled(true);
                                    }}
                                ></IconButton>
                                <IconButton
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
                                ></IconButton>
                            </>
                        )}
                    </Flex>
                </Flex>
            </Flex>
            <Divider></Divider>
        </Flex>
    );
}
