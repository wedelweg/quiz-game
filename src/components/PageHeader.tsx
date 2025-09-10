import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ScoreData from "./ScoreData";
import UserData from "./UserData";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks.ts";

function MobileMenuSheet({
                             open,
                             onClose,
                             hasUser,
                         }: {
    open: boolean;
    onClose: () => void;
    hasUser: boolean;
}) {

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
            {/* затемнение */}
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
                aria-hidden
            />
            <div
                className="absolute inset-x-0 bottom-0 w-full max-w-md mx-auto mb-2
                   bg-white/5 border border-white/10 backdrop-blur-md rounded-t-2xl
                   shadow-[0_20px_60px_rgba(0,0,0,.6)] p-4 pb-6"
            >
                <div className="mx-auto h-1.5 w-12 rounded-full bg-white/25 mb-4" />
                <div className="flex flex-col gap-2">
                    {hasUser && (
                        <NavLink
                            to="/history"
                            className="btn-yellow w-full text-center"
                            onClick={onClose}
                        >
                            History
                        </NavLink>
                    )}

                    {/* UserData уже сам рисует Logout; без лишних «стеклянных» оболочек */}
                    <div className="w-full">
                        <UserData />
                    </div>

                    <button className="btn-ghost w-full" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

const PageHeader = () => {
    const userId = useAppSelector((s) => s.userLayer.id);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    return (
        <div className="sticky top-0 z-40 w-full bg-gradient-to-b from-[#0c0f2f]/80 to-transparent backdrop-blur-sm">
            <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 pt-3">
                {/* ===== Desktop (>= md) ===== */}
                <div className="hidden md:grid grid-cols-3 items-center gap-3 mb-4">
                    <div className="justify-self-start">
                        <ScoreData />
                    </div>
                    <h1 className="justify-self-center font-display text-4xl title-gradient">
                        Own Game
                    </h1>
                    <div className="justify-self-end flex items-center gap-3">
                        {userId && (
                            <NavLink to="/history" className="btn-yellow py-1 px-3">
                                History
                            </NavLink>
                        )}
                        <UserData />
                    </div>
                </div>

                <div className="md:hidden bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,.45)] px-4 py-3 mb-4">
                    <h1 className="font-display text-3xl title-gradient text-center mb-3">
                        Own Game
                    </h1>
                    <div className="flex items-center justify-between gap-2">
                        <ScoreData />
                        <button
                            className="btn-yellow py-1 px-3 text-sm"
                            onClick={() => setOpen(true)}
                            aria-haspopup="dialog"
                            aria-expanded={open}
                        >
                            Menu
                        </button>
                    </div>
                </div>
            </div>

            <MobileMenuSheet open={open} onClose={() => setOpen(false)} hasUser={!!userId} />
        </div>
    );
};

export default PageHeader;
