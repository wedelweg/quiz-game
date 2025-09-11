import { Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import Login from "./components/Login";
import Registration from "./components/Registration";
import AnswersHistory from "./components/AnswersHistory";
import Leaderboard from "./components/Leaderboard";
import MainMenu from "./components/MainMenu";

const App = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a4f] to-[#000032] text-white flex flex-col">
            {/* 🔥 Главное меню всегда наверху */}
            <MainMenu />

            {/* Контент страниц */}
            <div className="flex-1 p-6 mt-8 flex flex-col items-center gap-6">
                <Routes>
                    <Route path="/game" element={<Game />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/history" element={<AnswersHistory />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
