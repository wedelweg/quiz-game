import {useState} from 'react';
import GameBoard from "./GameBoard.tsx";
import QuestionModal from "./QuestionModal.tsx";
import PageHeader from "./PageHeader.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {fetchTopics, seedTopics} from "../features/topics/topicsSlice.ts";

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

    const dispatch = useAppDispatch();
    const topics = useAppSelector(state => state.topics.topics);

    useEffect(() => {
        // Загружаем топики; если пусто — сначала сеедим, потом перезагружаем
        dispatch(fetchTopics()).then((action: any) => {
            if (Array.isArray(action.payload) && action.payload.length === 0) {
                dispatch(seedTopics()).then(() => dispatch(fetchTopics()));
            }
        });
    }, [dispatch]);

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