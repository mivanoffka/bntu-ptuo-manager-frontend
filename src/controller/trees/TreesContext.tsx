import { createContext, useState, useEffect, ReactNode } from "react";
import { createHook } from "@/controller/utils";
import { useApi } from "@/controller/api";
import { TreesEndPoint } from "@/controller/trees/constants";
import { ITreeNode } from "@/model";

interface ITreesContext {
    getTree: (name: string) => ITreeNode[];
    loading: boolean;
    error: string | null;
    reloadTrees: () => void;
}

const Trees = createContext<ITreesContext | undefined>(undefined);

export const TreesProvider = ({ children }: { children: ReactNode }) => {
    const { axiosInstance } = useApi();
    const [enumerations, setTrees] = useState<Record<string, ITreeNode[]>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getTree = (name: string) => {
        return enumerations[name] || [];
    };

    async function fetchTrees() {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(TreesEndPoint.PREFIX);
            setTrees(response.data || {});
        } catch (err) {
            console.log(err);
            setError("Failed to fetch enumerations");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTrees();
    }, []);

    const context: ITreesContext = {
        getTree,
        loading,
        error,
        reloadTrees: fetchTrees,
    };

    return <Trees.Provider value={context}>{children}</Trees.Provider>;
};

export const useTrees = createHook(Trees);
