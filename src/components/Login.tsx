import {useRef} from "react";
import {useDispatch} from "react-redux";
import {changeLogin} from "../actions/userAction.ts";
import {useNavigate} from "react-router-dom";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../data/firestore.ts";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handleSubmit() {
        const login = userName.current!.value || "Guest";
        const password = passwordRef.current!.value || "";
        try {
            await addDoc(collection(db, "users"), {
                login,
                password,
                score: 0,
                createdAt: Date.now(),
            });
        } catch (e) {
            console.error("Error adding user to Firestore:", e);
        }
        dispatch(changeLogin(login));
        navigate("/game");
    }

    return (
        <div className="min-h-screen p-4 flex flex-col gap-6">
            <label>Login
                <input
                    className={"p-4 border-custom w-32 text-center transition-transform duration-300 active:scale-95"}
                    type={"text"} ref={userName}></input>
            </label>
            <label>Password
                <input
                    className={"p-4 border-custom w-32 text-center transition-transform duration-300 active:scale-95"}
                    type={"password"} ref={passwordRef}></input>
            </label>
            <button className="btn-yellow" onClick={handleSubmit}>Sign in</button>
        </div>
    );
};

export default Login;