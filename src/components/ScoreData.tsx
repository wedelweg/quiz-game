import { useAppSelector } from "../app/hooks.ts";

const ScoreData = () => {
    const score = useAppSelector((s) => s.score.scores.score);
    return (
        <div className="header-chip">
            <div className="flex items-baseline gap-2">
                <span className="opacity-80">Score</span>
                <span className="text-2xl font-extrabold text-yellow-300">{score}</span>
            </div>
        </div>
    );
};

export default ScoreData;
