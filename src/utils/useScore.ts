import {useContext} from "react";
import {ScoreContext} from "../components/ScoreContext.tsx";

export const useScore = () => {
    const context = useContext(ScoreContext);
    if (!context) {
        throw new Error("useScore must be used within a ScoreProvider");
    }
    return context;
};
