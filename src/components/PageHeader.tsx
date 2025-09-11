import { useState } from "react";
import GameBoard from "./GameBoard";
import QuestionModal from "./QuestionModal";
import { useAppSelector } from "../app/hooks";

const Game = () => {
    const topics = useAppSelector((s) => s.topics.topics);
    const [selectedQuestion, setSelectedQuestion] = useState<{
        title: string;
        price: number;
        question: string;
        answer: string;
    } | null>(null);

    return (
        <div className="w-full flex flex-col items-center gap-6">
            <h1 className="text-3xl md:text-4xl font-display title-gradient text-center">
                Quiz Game
            </h1>

            <GameBoard topics={topics} onQuestionClick={setSelectedQuestion} />

            {selectedQuestion && (
                <QuestionModal
                    title={selectedQuestion.title}
                    price={selectedQuestion.price}
                    question={selectedQuestion.question}
                    answer={selectedQuestion.answer}
                    onClose={() => setSelectedQuestion(null)}
                />
            )}
        </div>
    );
};

export default Game;
