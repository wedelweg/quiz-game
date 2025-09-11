import * as React from "react";
import type { Topic } from "../utils/types";
import { useAppSelector } from "../app/hooks.ts";

interface Props {
    topics: Topic[];
    onQuestionClick: React.Dispatch<
        React.SetStateAction<
            | {
            title: string;
            price: number;
            question: string;
            answer: string;
        }
            | null
        >
    >;
}

const PRICES = [100, 200, 300, 400, 500];

export default function GameBoard({ topics, onQuestionClick }: Props) {
    const selectedMap = useAppSelector(
        (s) => s.topics.selectedIndexByTitleAndPrice
    );
    const answeredMap = useAppSelector(
        (s) => s.topics.answeredStatusByTitleAndPrice
    );

    const getPicked = (topic: Topic, priceVal: number) => {
        const idx = selectedMap[topic.title]?.[priceVal];
        return typeof idx === "number" ? topic.questions[idx] : undefined;
    };

    const PriceButton: React.FC<{
        topic: Topic;
        price: number;
        compact?: boolean;
    }> = ({ topic, price, compact }) => {
        const picked = getPicked(topic, price);
        const status = answeredMap[topic.title]?.[price];
        const isAnswered = status === "correct" || status === "wrong";
        const answeredClass =
            status === "correct"
                ? "board-cell--correct"
                : status === "wrong"
                    ? "board-cell--wrong"
                    : "";

        return (
            <button
                onClick={() =>
                    picked &&
                    onQuestionClick({
                        title: topic.title,
                        price,
                        question: picked.question,
                        answer: picked.answer,
                    })
                }
                disabled={!picked || isAnswered}
                className={[
                    "board-cell",
                    answeredClass,
                    isAnswered ? "opacity-90 cursor-not-allowed" : "cursor-pointer",
                    compact ? "px-3 py-4 text-lg" : "",
                ].join(" ")}
                onMouseMove={(e) => {
                    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    (e.currentTarget as HTMLElement).style.setProperty(
                        "--mx",
                        `${e.clientX - r.left}px`
                    );
                    (e.currentTarget as HTMLElement).style.setProperty(
                        "--my",
                        `${e.clientY - r.top}px`
                    );
                }}
            >
                <span className="status-mark" />
                {price}
            </button>
        );
    };

    return (
        <>
            {/* ====== Desktop (>= md) ====== */}
            <div className="hidden md:block w-full">
                <div className="mx-auto max-w-6xl flex flex-col gap-3">
                    {topics.map((topic, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-[repeat(6,minmax(110px,1fr))] gap-3"
                        >
                            <div className="title-cell">{topic.title}</div>
                            {PRICES.map((priceVal) => (
                                <PriceButton key={priceVal} topic={topic} price={priceVal} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* ====== Mobile (< md) grids 3×2 ====== */}
            <div className="md:hidden w-full">
                <div className="mx-auto max-w-md flex flex-col gap-4">
                    {topics.map((topic, i) => (
                        <div
                            key={i}
                            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow p-4"
                        >
                            <div className="text-slate-100 font-semibold mb-3">
                                {topic.title}
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {PRICES.map((priceVal) => (
                                    <PriceButton
                                        key={priceVal}
                                        topic={topic}
                                        price={priceVal}
                                        compact
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
