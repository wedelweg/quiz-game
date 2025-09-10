import { useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch } from "../app/hooks.ts";
import { fetchUserSaveInDB } from "../features/userData/userDataSlice.ts";

const Registration = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function handleSubmit() {
        const login = userNameRef.current!.value.trim();
        const password = passwordRef.current!.value;
        if (login && password) {
            dispatch(fetchUserSaveInDB({ login, password }));
            navigate("/game");
        } else {
            alert("Please fill in all fields");
        }
    }

    return (
        <div className="game-shell flex flex-col items-center justify-center gap-6">
            <div className="glass p-8 w-full max-w-md">
                <h2 className="font-display text-2xl mb-6 title-gradient text-center">Registration</h2>

                <label className="block mb-4">
                    <span className="block mb-2 font-semibold">Login</span>
                    <input className="input-glass" type="text" ref={userNameRef} placeholder="Your nickname"/>
                </label>

                <label className="block mb-6">
                    <span className="block mb-2 font-semibold">Password</span>
                    <input className="input-glass" type="password" ref={passwordRef} placeholder="••••••••"/>
                </label>

                <div className="flex flex-col gap-3">
                    <button className="btn-yellow" onClick={handleSubmit}>Register</button>
                    <NavLink to="/login" className="btn-ghost text-center">Go to Login</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Registration;
