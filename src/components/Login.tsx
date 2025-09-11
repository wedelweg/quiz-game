import { useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch } from "../app/hooks.ts";
import { fetchUserCheckExistInDB, changeScore, setGuest } from "../features/userData/userDataSlice.ts";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmitSignIn = async () => {
        const login = loginRef.current!.value.trim();
        const password = passwordRef.current!.value.trim();

        if (!login || !password) {
            Swal.fire({
                icon: "warning",
                title: "Заполните все поля!",
                confirmButtonText: "Ок",
                background: "#1a1a4f",
                color: "#fff",
                confirmButtonColor: "#facc15",
            });
            return;
        }

        try {
            const payload = await dispatch(fetchUserCheckExistInDB({ login, password })).unwrap();

            if (typeof payload?.score === "number") {
                dispatch(changeScore(payload.score));

                Swal.fire({
                    icon: "success",
                    title: "Добро пожаловать!",
                    text: `Приятной игры, ${login}!`,
                    confirmButtonText: "Играть",
                    background: "#1a1a4f",
                    color: "#fff",
                    confirmButtonColor: "#22c55e",
                }).then(() => {
                    navigate("/game");
                });
            }
        } catch {
            Swal.fire({
                icon: "error",
                title: "Ошибка входа",
                text: "Неверный логин или пароль",
                confirmButtonText: "Попробовать снова",
                background: "#1a1a4f",
                color: "#fff",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    const handleSubmitGuest = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setGuest());  // 👈 теперь Redux сразу знает, что это гость
        setTimeout(() => {
            navigate("/game");
        }, 0);
    };

    return (
        <div className="game-shell flex flex-col items-center gap-6">
            <div className="glass p-8 w-full max-w-md">
                <h2 className="font-display text-2xl mb-6 title-gradient text-center">
                    Sign in
                </h2>

                <label className="block mb-4">
                    <span className="block mb-2 font-semibold">Login</span>
                    <input
                        id="login-input"
                        className="input-glass"
                        type="text"
                        ref={loginRef}
                        placeholder="Your nickname"
                    />
                </label>

                <label className="block mb-6">
                    <span className="block mb-2 font-semibold">Password</span>
                    <input
                        id="password-input"
                        className="input-glass"
                        type="password"
                        ref={passwordRef}
                        placeholder="••••••••"
                    />
                </label>

                <div className="flex flex-col gap-3">
                    <button className="btn-yellow" onClick={handleSubmitSignIn}>
                        Sign in
                    </button>
                    <button className="btn-ghost" onClick={handleSubmitGuest}>
                        Sign in as a guest
                    </button>
                    <NavLink to="/register" className="btn-ghost text-center">
                        Go to registration
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;
