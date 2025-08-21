import {useState} from 'react';
import GameBoard from "./GameBoard.tsx";
import {topics} from "../data/questions.ts";
import QuestionModal from "./QuestionModal.tsx";
import PageHeader from "./PageHeader.tsx";

const Game = () => {

    const [selected, setSelected] = useState<{
        title: string,
        price: number,
        question: string,
        answer: string
    } | null>(null);

    const handleCloseModal = () => {
        setSelected(null);
    };

    return (
        <div className="w-full">
            <PageHeader/>
            <div className="game">
                {!selected && (
                    <GameBoard topics={topics} onQuestionClick={setSelected}/>
                )}
                {selected && (
                    <QuestionModal title={selected.title}
                                   price={selected.price}
                                   question={selected.question}
                                   answer={selected.answer}
                                   onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    )
};

export default Game;