import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAnswersHistory } from "../features/answers/answersSlice";

const AnswersHistory = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((s) => s.userLayer.id);
    const { items, loading, error } = useAppSelector((s) => s.answers);

    useEffect(() => {
        if (userId) {
            dispatch(fetchAnswersHistory({ userId }));
        }
    }, [dispatch, userId]);

    if (!userId) {
        return (
            <div className="p-6 text-center text-red-400">
                Please log in to see your answers history.
            </div>
        );
    }

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-400">
                Error loading history: {error}
            </div>
        );
    }

    if (!items.length) {
        return (
            <div className="p-6 text-center text-gray-400">
                No answers yet.
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl bg-[#0c0f2f]/60 backdrop-blur-md rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                📜 Answers History
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-[#1a1a4f]">
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Topic</th>
                        <th className="px-4 py-2">Question</th>
                        <th className="px-4 py-2">Result</th>
                        <th className="px-4 py-2">Score</th>
                        <th className="px-4 py-2">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((ans, idx) => (
                        <tr
                            key={idx}
                            className={`border-b border-white/10 ${
                                ans.result === "correct"
                                    ? "text-green-400"
                                    : "text-red-400"
                            }`}
                        >
                            <td className="px-4 py-2">{idx + 1}</td>
                            <td className="px-4 py-2">{ans.title}</td>
                            <td className="px-4 py-2">{ans.question}</td>
                            <td className="px-4 py-2 capitalize">{ans.result}</td>
                            <td className="px-4 py-2">{ans.price}</td>
                            <td className="px-4 py-2">
                                {new Date(ans.answeredAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnswersHistory;
