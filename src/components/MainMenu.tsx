import { useState } from "react";
import { NavLink } from "react-router-dom";
import ScoreData from "./ScoreData";
import UserData from "./UserData";

const MainMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-[#0c0f2f]/90 backdrop-blur-md shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Логотип */}
                <h1 className="text-2xl md:text-3xl font-display title-gradient">
                    Quiz Game
                </h1>

                {/* Desktop меню */}
                <nav className="hidden md:flex items-center gap-6 text-lg">
                    <NavLink to="/history" className="nav-link">
                        📜 History
                    </NavLink>
                    <NavLink to="/leaderboard" className="nav-link">
                        🏆 Leaderboard
                    </NavLink>
                    <ScoreData />
                    {/* ✅ только UserData, без дублирования Guest */}
                    <UserData />
                </nav>

                {/* Mobile burger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-yellow-400 text-3xl"
                >
                    ☰
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-[#1a1a4f]/95 backdrop-blur-md flex flex-col items-center gap-4 py-6">
                    <NavLink
                        to="/history"
                        className="nav-link"
                        onClick={() => setMenuOpen(false)}
                    >
                        📜 History
                    </NavLink>
                    <NavLink
                        to="/leaderboard"
                        className="nav-link"
                        onClick={() => setMenuOpen(false)}
                    >
                        🏆 Leaderboard
                    </NavLink>
                    <ScoreData />
                    {/* ✅ и тут только UserData */}
                    <UserData />
                </div>
            )}
        </header>
    );
};

export default MainMenu;
