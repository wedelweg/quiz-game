import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../data/firestore";

interface User {
    id: string;
    login: string;
    score: number;
}

const Leaderboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const q = query(collection(db, "users"), orderBy("score", "desc"));
                const snapshot = await getDocs(q);
                const data: User[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    login: doc.data().login,
                    score: doc.data().score ?? 0,
                }));
                setUsers(data);
            } catch (e) {
                console.error("Error loading leaderboard:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return (
            <div className="text-center text-yellow-300 mt-10">
                Loading leaderboard...
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-3">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                🏆 Leaderboard
            </h2>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-[#0f0f3d] rounded-xl overflow-hidden shadow-lg">
                    <thead>
                    <tr className="bg-[#1e1e5c] text-yellow-400 text-left">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Login</th>
                        <th className="px-4 py-3 text-right">Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u, i) => (
                        <tr
                            key={u.id}
                            className={`border-t border-[#2a2a6e] ${
                                i % 2 === 0 ? "bg-[#15154a]" : "bg-[#10103b]"
                            }`}
                        >
                            <td className="px-4 py-3">{i + 1}</td>
                            <td className="px-4 py-3 font-semibold">{u.login}</td>
                            <td className="px-4 py-3 text-right">{u.score}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden grid gap-3">
                {users.map((u, i) => (
                    <div
                        key={u.id}
                        className="bg-[#1a1a4f] p-4 rounded-lg shadow-md flex justify-between items-center"
                    >
                        <div>
                            <div className="text-yellow-400 font-bold">#{i + 1}</div>
                            <div className="font-semibold text-white">{u.login}</div>
                        </div>
                        <div className="text-lg font-bold text-white">{u.score}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
