import { useScore } from "../utils/useScore.ts"

const ScoreData = () => {
    const { score } = useScore();

    return (
        <div className="userData p-4 border-custom relative top-0 text-yellow-400 text-right">
            <div className="text-2xl font-bold">Score: {score}</div>
        </div>
    );
};

export default ScoreData;
//
// import { useScore } from "../utils/ScoreContext.tsx";
//
// export const ScoreData = () => {
//     const { score } = useScore();
//
//     return (
//         <div className="userData p-4 border-custom relative top-0">
//             <div>Score: </div>
//             <p className="flex justify-between">{score}</p>
//         </div>
//     );
// };
//

