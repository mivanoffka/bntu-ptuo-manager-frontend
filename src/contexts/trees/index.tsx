import { createContext, useState, useEffect, ReactNode } from "react";
import { createHook } from "@/contexts/utils";
import { useApi } from "@/contexts/api";
import { TreesEndPoint } from "@/contexts/trees/constants";
import { toSnakeCase } from "@/contexts/api/utils";
import { ITreeNode } from "@/model";

interface ITreesContext {
    getTree: (name: string) => ITreeNode[];
    addToTree: (
        treeName: string,
        parentPath: string | null,
        label: string
    ) => Promise<void>;
    updateTree: (
        treeName: string,
        path: string,
        label: string
    ) => Promise<void>;
    removeFromTree: (treeName: string, path: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    reloadTrees: () => void;
}

const Trees = createContext<ITreesContext | undefined>(undefined);

export const TreesProvider = ({ children }: { children: ReactNode }) => {
    const { axiosInstance } = useApi();
    const [trees, setTrees] = useState<Record<string, ITreeNode[]>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTrees = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(TreesEndPoint.PREFIX);
            setTrees(response.data || {});
        } catch (err) {
            console.log(err);
            setError("Failed to fetch trees");
        } finally {
            setLoading(false);
        }
    };

    const postToTrees = async (
        treeName: string,
        parentPath: string | null,
        label: string
    ) => {
        setLoading(true);
        setError(null);

        const body = {
            label,
            parentPath,
        };

        try {
            await axiosInstance.post(
                `${TreesEndPoint.PREFIX}/?table_name=${treeName}`,
                body
            );
        } catch (err) {
            console.log(err);
            setError("Failed to post");
        } finally {
            setLoading(false);
        }
    };

    const putToTrees = async (
        treeName: string,
        path: string,
        label: string
    ) => {
        setLoading(true);
        setError(null);

        const body = {
            label,
        };

        try {
            await axiosInstance.put(
                `${TreesEndPoint.PREFIX}/${path}/?table_name=${treeName}`,
                body
            );
        } catch (err) {
            console.log(err);
            setError("Failed to put");
        } finally {
            setLoading(false);
        }
    };

    const deleteFromTrees = async (treeName: string, path: string) => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.delete(
                `${TreesEndPoint.PREFIX}/${path}/?table_name=${treeName}`
            );
        } catch (err) {
            console.log(err);
            setError("Failed to delete");
        } finally {
            setLoading(false);
        }
    };

    const getTree = (name: string) => {
        return trees[name] || [];
    };

    const addToTree = async (
        treeName: string,
        parentPath: string | null,
        label: string
    ) => {
        const name = toSnakeCase(treeName) as string;
        await postToTrees(name, parentPath, label);
        await fetchTrees();
    };

    const updateTree = async (
        treeName: string,
        path: string,
        label: string
    ) => {
        const name = toSnakeCase(treeName) as string;
        await putToTrees(name, path, label);
        await fetchTrees();
    };

    const removeFromTree = async (treeName: string, path: string) => {
        const name = toSnakeCase(treeName) as string;
        await deleteFromTrees(name, path);
        await fetchTrees();
    };

    useEffect(() => {
        fetchTrees();
    }, []);

    const context: ITreesContext = {
        getTree,
        addToTree,
        updateTree,
        removeFromTree,
        loading,
        error,
        reloadTrees: fetchTrees,
    };

    return <Trees.Provider value={context}>{children}</Trees.Provider>;
};

export const useTrees = createHook(Trees);
