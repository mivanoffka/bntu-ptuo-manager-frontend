import { IconButton } from "@/components/buttons";
import { SecondaryLabel } from "@/components/labels";
import { FontSize, Palette } from "@/constants";
import { tempIds } from "@/contexts/employees/utils";
import { useTrees } from "@/contexts/trees";
import { ITreeNode } from "@/model";
import {
    PlusOutlined,
    CheckOutlined,
    StopOutlined,
    EditOutlined,
    DeleteOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { Divider, Flex, Input, List, Tree } from "antd";
import { useState, useEffect } from "react";

export interface ITreeListProps {
    title: string;
    treeName: string;
}

export function TreeList({ title, treeName }: ITreeListProps) {
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [insertModeEnabled, setInsertModeEnabled] = useState(false);
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<ITreeNode | null>(null);
    const [inputLabel, setInputLabel] = useState("");

    const {
        getTree,
        addToTree,
        updateTree,
        removeFromTree,
        loading,
        error,
        reloadTrees,
    } = useTrees();

    const treeData = getTree(treeName);

    // Convert ITreeNode[] to antd TreeData format
    const convertToTreeData = (nodes: ITreeNode[]): any[] =>
        nodes.map(({ path, label, children }) => ({
            title: label,
            key: path,
            children: children ? convertToTreeData(children) : [],
        }));

    // Recursive find node by path
    const findNodeByPath = (
        nodes: ITreeNode[],
        path: string
    ): ITreeNode | null => {
        for (const node of nodes) {
            if (node.path === path) return node;
            if (node.children) {
                const found = findNodeByPath(node.children, path);
                if (found) return found;
            }
        }
        return null;
    };

    // New node template with temp path
    const getNewNode = (): ITreeNode => ({
        path: `temp-${tempIds.generate()}`,
        label: null,
        children: [],
    });

    // Sync selectedNode and inputLabel with selectedPath
    useEffect(() => {
        if (!selectedPath) {
            setSelectedNode(null);
            setInputLabel("");
        } else {
            const node = findNodeByPath(treeData, selectedPath);
            setSelectedNode(node);
            setInputLabel(node?.label || "");
        }
    }, [selectedPath, treeData]);

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
                        overflowY: "auto",
                        border: "1px solid #d9d9d9",
                        borderRadius: 4,
                        width: "100%",
                    }}
                >
                    {treeData && treeData.length > 0 ? (
                        <Tree
                            autoExpandParent
                            blockNode
                            style={{ fontSize: 13, textAlign: "left" }}
                            showLine
                            switcherIcon={<DownOutlined />}
                            treeData={convertToTreeData(treeData)}
                            selectedKeys={selectedPath ? [selectedPath] : []}
                            onSelect={(selectedKeys) => {
                                if (selectedKeys.length === 0) {
                                    setSelectedPath(null);
                                } else {
                                    const key = selectedKeys[0];
                                    if (key === selectedPath) {
                                        setSelectedPath(null);
                                    } else {
                                        setSelectedPath(key);
                                        setEditModeEnabled(false);
                                        setInsertModeEnabled(false);
                                    }
                                }
                            }}
                            defaultExpandAll
                        />
                    ) : (
                        <List />
                    )}
                </div>

                <Flex gap="small" style={{ width: "100%" }}>
                    {(selectedNode || editModeEnabled) && (
                        <Flex gap="small" style={{ width: "50%" }}>
                            <Input
                                placeholder="Укажите значение"
                                value={inputLabel}
                                readOnly={!editModeEnabled}
                                onChange={(e) => setInputLabel(e.target.value)}
                            />
                        </Flex>
                    )}

                    <Flex
                        gap="small"
                        align="center"
                        justify="space-evenly"
                        style={{
                            width:
                                selectedNode || editModeEnabled
                                    ? "50%"
                                    : "100%",
                        }}
                    >
                        {!editModeEnabled ? (
                            selectedNode ? (
                                <Flex>
                                    <IconButton
                                        icon={<PlusOutlined />}
                                        title="Добавить"
                                        onClick={() => {
                                            setInputLabel(null);
                                            setEditModeEnabled(true);
                                            setInsertModeEnabled(true);
                                        }}
                                    />
                                    <IconButton
                                        disabled={
                                            !selectedNode || editModeEnabled
                                        }
                                        icon={<EditOutlined />}
                                        title="Изменить"
                                        onClick={() => {
                                            if (selectedNode) {
                                                setEditModeEnabled(true);
                                                setInputLabel(
                                                    selectedNode.label
                                                );
                                            }
                                        }}
                                    />
                                    <IconButton
                                        disabled={
                                            !selectedNode || editModeEnabled
                                        }
                                        icon={<DeleteOutlined />}
                                        title="Удалить"
                                        onClick={async () => {
                                            if (!selectedNode) return;
                                            await removeFromTree(
                                                treeName,
                                                selectedNode.path
                                            );
                                            setSelectedPath(null);
                                            setSelectedNode(null);
                                            await reloadTrees();
                                        }}
                                    />
                                </Flex>
                            ) : (
                                <IconButton
                                    icon={<PlusOutlined />}
                                    title="Добавить новую запись"
                                    onClick={() => {
                                        setInputLabel(null);
                                        setSelectedPath(null);
                                        setEditModeEnabled(true);
                                        setInsertModeEnabled(true);
                                    }}
                                />
                            )
                        ) : (
                            <>
                                <IconButton
                                    iconColor={Palette.GREEN}
                                    icon={<CheckOutlined />}
                                    title="Применить"
                                    onClick={async () => {
                                        if (!inputLabel.trim()) return;

                                        if (insertModeEnabled) {
                                            const path = selectedNode
                                                ? selectedNode.path
                                                : null;

                                            await addToTree(
                                                treeName,
                                                path,
                                                inputLabel
                                            );
                                        } else {
                                            if (
                                                selectedNode &&
                                                !selectedNode.path.startsWith(
                                                    "temp-"
                                                )
                                            ) {
                                                // Update existing node
                                                await updateTree(
                                                    treeName,
                                                    selectedNode.path,
                                                    inputLabel
                                                );
                                            } else {
                                            }
                                        }
                                        await reloadTrees();
                                        setEditModeEnabled(false);
                                        setInsertModeEnabled(false);

                                        setSelectedPath(null);
                                        setSelectedNode(null);
                                        setInputLabel("");
                                    }}
                                />
                                <IconButton
                                    iconColor={Palette.RED}
                                    icon={<StopOutlined />}
                                    title="Отменить"
                                    onClick={() => {
                                        if (selectedPath) {
                                            const node = findNodeByPath(
                                                treeData,
                                                selectedPath
                                            );
                                            setSelectedNode(node);
                                            setInputLabel(node?.label || "");
                                        } else {
                                            setSelectedNode(null);
                                            setInputLabel("");
                                        }
                                        setEditModeEnabled(false);
                                        setInsertModeEnabled(false);
                                    }}
                                />
                            </>
                        )}
                    </Flex>
                </Flex>
            </Flex>

            <Divider></Divider>
        </Flex>
    );
}
