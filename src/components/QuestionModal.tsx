import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { fetchScoreUpdateDB } from "../features/scoreData/scoreSlice.ts";
import { markAnswered } from "../features/topics/topicsSlice.ts";
import { addAnswerToHistory } from "../features/answers/answersSlice.ts";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface Props {
    title: string;
    price: number;
    question: string;
    answer: string;
    onClose: () => void;
}

const QuestionModal = ({ title, price, question, answer, onClose }: Props) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [busy, setBusy] = useState(false); // защита от двойных кликов

    const dispatch = useAppDispatch();
    const id = useAppSelector((s) => s.userLayer.id);
    const oldScore = useAppSelector((s) => s.score.scores.score);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const onBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    function changeScore(delta: number) {
        if (!id) {
            // 🚫 Гостевой режим → показываем красивое модальное окно
            Swal.fire({
                icon: "info",
                title: "Гостевой режим",
                html: `
                    <p class="mb-3">Сохранение очков доступно только для авторизованных пользователей.</p>
                    <a href="${import.meta.env.BASE_URL}" 
                       class="px-4 py-2 inline-block rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition">
                        Залогиниться
                    </a>
                `,
                showConfirmButton: false,
                background: "#1a1a4f",
                color: "#fff",
            });
            return;
        }
        dispatch(fetchScoreUpdateDB({ price: delta, oldScore, id }));
    }

    async function handleResult(result: "correct" | "wrong") {
        if (busy) return;
        setBusy(true);

        dispatch(markAnswered({ title, price, result }));

        if (id) {
            dispatch(
                addAnswerToHistory({
                    userId: id,
                    answer: {
                        title,
                        price,
                        question,
                        result,
                        answeredAt: Date.now(),
                    },
                })
            );
        }

        changeScore(result === "correct" ? price : -price);

        setBusy(false);
        onClose();
    }

    return (
        <div
            className="modal-backdrop"
            onClick={onBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="q-title"
        >
            <div className="modal-card animate-fade-in-up">
                <h1 id="q-title" className="font-display text-3xl mb-2 text-white">
                    {title}
                </h1>
                <h2 className="text-amber-300 mb-4">{price} scores</h2>

                <p className="text-lg mb-6">{question}</p>

                {!showAnswer ? (
                    <button onClick={() => setShowAnswer(true)} className="btn-yellow">
                        Show answer
                    </button>
                ) : (
                    <div className="space-y-5">
                        <p className="mt-1 text-xl text-green-300">{answer}</p>

                        <div className="flex items-center justify-center w-full opacity-80">
                            User answered correctly?
                        </div>

                        <div className="flex justify-center gap-3">
                            <button
                                className="btn-yellow disabled:opacity-60"
                                disabled={busy}
                                onClick={() => handleResult("correct")}
                            >
                                YES
                            </button>
                            <button
                                className="btn-ghost disabled:opacity-60"
                                disabled={busy}
                                onClick={() => handleResult("wrong")}
                            >
                                NO
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionModal;
