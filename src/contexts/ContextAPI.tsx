import { createContext, ReactNode, useEffect, useState } from "react";

// Define shape of context value
interface ChildrenProps {
    children: ReactNode;
}

interface Item {
    id: number;
    createdAt: string;
    name: string;
    status: boolean;
}

interface dataLoad {
    data: Item[] | undefined;
    loading: boolean;
    error: string | null;
    setData: (data: Item[]) => void;
}

// Context
export const APIContext = createContext<dataLoad | undefined>(undefined);

export const APIContextProvider = ({ children }: ChildrenProps) => {
    const [data, setData] = useState<Item[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://66fedc6d2b9aac9c997da1c9.mockapi.io/todo/get/todo");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                setError((err as Error).message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const updateItemById = async (item: Item) => {
        try {
            await fetch(`https://66fedc6d2b9aac9c997da1c9.mockapi.io/todo/get/todo/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
        } catch (err) {
            console.error("Failed to update item:", err);
        }
    };
    useEffect(() => {
        if (data) {
            data.forEach((item) => updateItemById(item));
        }
    }, [data]);

    return (
        <APIContext.Provider value={{ data, loading, error, setData }}>
            {children}
        </APIContext.Provider>
    );
};
