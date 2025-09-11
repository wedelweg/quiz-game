import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeId, changeLogin } from "../features/userData/userDataSlice";
import { changeScore } from "../features/scoreData/scoreSlice";

const UserData = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((s) => s.userLayer.id);
    const userLogin = useAppSelector((s) => s.userLayer.login || "Guest");

    const loginUrl = import.meta.env.BASE_URL; // например /quiz-game/
    const isLoginPage = window.location.pathname === loginUrl;

    // 👤 проверяем сразу и Redux, и localStorage
    const isGuest =
        (!userId && userLogin === "Guest") ||
        (!userId && localStorage.getItem("guest") === "true");

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.setItem("guest", "true"); // при выходе снова считаем гостем
        dispatch(changeId(""));
        dispatch(changeLogin("Guest"));
        dispatch(changeScore(0));
        window.location.href = loginUrl;
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="text-yellow-400 font-semibold text-center">
                Nickname:
                <div className="text-white font-normal mt-1">{userLogin}</div>
            </div>

            {userId ? (
                <button
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            ) : (
                isGuest &&
                !isLoginPage && (
                    <button
                        className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold transition"
                        onClick={() => (window.location.href = loginUrl)}
                    >
                        Go to Login Page
                    </button>
                )
            )}
        </div>
    );
};

export default UserData;
