import { useContext } from "react";
import { APIContext } from "../contexts/ContextAPI.js";

export const useAPIContext = () => {
    const context = useContext(APIContext);
    
    if (!context) {
        throw new Error("useAPIContext must be used within an APIContextProvider");
    }

    return context;
};
