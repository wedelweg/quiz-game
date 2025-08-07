import './App.css';
import {useState} from "react";
import {UserNameContext} from "./utils/context.ts";
import {Route, Routes} from "react-router";
import Game from "./components/Game.tsx";
import Login from "./components/Login.tsx";
import {ScoreProvider} from "./utils/ScoreContext.tsx";

const App = () => {
    const [userName, setUserName] = useState('');

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a4f] to-[#000032]
            text-white p-4 flex flex-col items-center gap-6">
            <UserNameContext value={{ userName, setUserName }}>
                <ScoreProvider>
                    <Routes>
                        <Route path="/game" element={<Game />} />
                        <Route path="/" element={<Login />} />
                    </Routes>
                </ScoreProvider>
            </UserNameContext>

        </div>
    );
};

export default App;




