import {createContext} from "react";

export const UserNameContext = createContext({
    userName: "",
    setUserName: (userName:string) => {
        console.log(`User name: ${userName}`);
    },
})



