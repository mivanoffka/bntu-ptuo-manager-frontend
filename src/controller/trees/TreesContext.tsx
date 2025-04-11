import { createContext, useState, useEffect, ReactNode } from "react";
import { createHook } from "@/controller/utils";
import { useApi } from "@/controller/api";
import { ITreeNode } from "@/model";

interface ITreesContext {
    bntuDepartmentsTree: ITreeNode[];
    tradeUnionDepartmentsTree: ITreeNode[];
    setBntuDepartmentsTree: (value: ITreeNode[]) => void;
    setTradeUnionDepartmentsTree: (value: ITreeNode[]) => void;
    loading: boolean;
    error: string | null;
    reloadTrees: () => void;
}

const Trees = createContext<ITreesContext | undefined>(undefined);

export const TreesProvider = ({ children }: { children: ReactNode }) => {
    const { axiosInstance } = useApi();
    const [bntuDepartmentsTree, setBntuDepartmentsTree] = useState<ITreeNode[]>(
        []
    );
    const [tradeUnionDepartmentsTree, setTradeUnionDepartmentsTree] = useState<
        ITreeNode[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchTrees() {
        setLoading(true);
        setError(null);
        try {
            await Promise.all([
                fetchBntuDepartmentsTree(),
                fetchTradeUnionDepartmentsTree(),
            ]);
        } catch (err) {
            setError("Failed to fetch some trees");
        } finally {
            setLoading(false);
        }
    }

    async function fetchBntuDepartmentsTree() {
        try {
            const response = await axiosInstance.get("bntu-departments");
            setBntuDepartmentsTree(response.data || []);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function fetchTradeUnionDepartmentsTree() {
        try {
            const response = await axiosInstance.get("trade-union-departments");
            setTradeUnionDepartmentsTree(response.data || []);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    useEffect(() => {
        fetchTrees();
    }, []);

    const context: ITreesContext = {
        bntuDepartmentsTree,
        tradeUnionDepartmentsTree,
        setBntuDepartmentsTree,
        setTradeUnionDepartmentsTree,
        loading,
        error,
        reloadTrees: fetchTrees,
    };

    return <Trees.Provider value={context}>{children}</Trees.Provider>;
};

export const useTrees = createHook(Trees);
