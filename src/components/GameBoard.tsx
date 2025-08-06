import type {Topic} from "../data/questions.ts";
import * as React from "react";


interface Props {
    topics: Topic[];
    onQuestionClick: React.Dispatch<React.SetStateAction<{
        title: string,
        price: number,
        question: string,
        answer: string
    } | null>>;
}

const GameBoard = ({topics, onQuestionClick}: Props) => {
    return (
        <div
            className="min-h-screen bg-gradient-to-b from-[#1a1a4f] to-[#000032]
            text-white p-4 flex flex-col items-center gap-6">

        <h1 className="text-4xl font-bold mb-6">Своя Игра</h1>

            <div className="flex flex-col gap-2 w-fit mx-auto">

            {topics.map((topic, i) =>
                    <div key={i}  className="flex">
                        <div className="w-32 bg-[#1f1f6b] text-white text-lg font-semibold p-4
                        border border-gray-500 rounded-l">
                            {topic.title}
                        </div>


                        {topic.questions.map((q, i) =>
                            <button key={i} onClick={() => onQuestionClick({
                                title: topic.title,
                                price: q.price,
                                question: q.question,
                                answer: q.answer
                            })
                            }
                                    className="bg-[#000066] hover:bg-[#000088] text-yellow-400 text-xl font-bold
                                    p-4 border border-gray-500 w-32 text-center transition-transform duration-300 active:scale-95"
                            >
                                {q.price}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


            export default GameBoard;