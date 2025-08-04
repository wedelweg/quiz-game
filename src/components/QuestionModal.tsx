import {useState} from "react";

interface Props {
    title: string,
    price: number,
    question: string,
    answer: string
}
const QuestionModal = ({ title, price, question, answer }: Props) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1a1a4f] rounded-xl shadow-lg p-8 w-[90%] max-w-xl text-center text-white animate-fade-in-up">
                <h1 className="text-3xl font-bold mb-2 text-white">{title}</h1>
                <h2 className="text-xl text-yellow-400 mb-4">{price} очков</h2>
                <p className="text-lg mb-6">{question}</p>
                {!showAnswer ? (
                    <button
                        onClick={() => setShowAnswer(true)}
                        className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition-colors"
                    >
                        Показать ответ
                    </button>
                ) : (
                    <p className="mt-4 text-xl text-green-300">{answer}</p>
                )}
            </div>
        </div>
    );
};


export default QuestionModal;