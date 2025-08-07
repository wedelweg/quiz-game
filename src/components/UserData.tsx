// import {NavLink} from "react-router";
// import {UserNameContext} from "../utils/context.ts";
// import {useContext} from "react";
//
// const UserData = () => {
//     const {userName} = useContext(UserNameContext);
//
//     return (
//             <div className={"userData p-4 border-custom relative"}>
//                 <div
//                     className={"userNameFromLogin text-yellow-400 text-xl font-bold p-4 border-custom w-32 text-center"}>
//                     Nickname: {userName}
//                 </div>
//                 <NavLink to={"/"}>
//                     <button
//                         className="btn-yellow">Logout
//                     </button>
//                 </NavLink>
//             </div>
//     );
// };
//
// export default UserData;

import {UserNameContext} from "../utils/context.ts";;
import { useNavigate } from "react-router-dom";
import {useContext} from "react";

const UserData = () => {
    const { userName, setUserName } = useContext(UserNameContext);
    const navigate = useNavigate();

    const logout = () => {
        setUserName("");
        navigate("/");
    };

    return (
        <div className="flex items-center gap-4 text-yellow-400 text-right">
            <div>
                <div className="text-sm">Nickname:</div>
                <div className="text-lg font-bold">{userName || "Guest"}</div>
            </div>
            <button onClick={logout} className="btn-yellow py-1 px-3">
                Logout
            </button>
        </div>
    );
};

export default UserData;
