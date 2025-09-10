import { useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch } from "../app/hooks.ts";
import { fetchUserCheckExistInDB } from "../features/userData/userDataSlice.ts";
import { changeScore } from "../features/scoreData/scoreSlice.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function handleSubmitSignIn() {
        const login = userNameRef.current!.value.trim();
        const password = passwordRef.current!.value;
        if (login && password) {
            dispatch(fetchUserCheckExistInDB({ login, password }))
                .unwrap()
                .then((payload) => {
                    if (typeof payload?.score === "number") {
                        dispatch(changeScore(payload.score));
                    }
                    navigate("/game");
                })
                .catch(() => {
                    alert("Неверный логин или пароль");
                });
        } else {
            alert("Please fill in all fields");
        }
    }

    function handleSubmitGuest() {
        navigate("/game");
    }

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
                        ref={userNameRef}
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
