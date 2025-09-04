import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {logoutAction} from "../app/store.ts";

const UserData = () => {
    const userName = useAppSelector(state => state.userLayer.user.login);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // rootDispatch ->
    const logout = () => {
        localStorage.removeItem("userId");
        // dispatch(changeLogin(""));
        // dispatch(changeId(""));
        // dispatch(changeScore(0));
        dispatch(logoutAction());
        navigate("/");
    };

    return (
        <div className="flex items-center gap-4 text-yellow-400 text-right">
            <div>
                <div className="text-sm">Nickname:</div>
                <div className="text-lg font-bold">{userName + "" || "Guest"}</div>
            </div>
            <button onClick={logout} className="btn-yellow py-1 px-3">
                Logout
            </button>
        </div>
    );
};

export default UserData;
