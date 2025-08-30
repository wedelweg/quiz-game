import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userDataSlice from "../features/userData/userDataSlice.ts";
import scoreSlice from "../features/scoreData/scoreSlice.ts";


export const logOutAction = () => ({type:'LOGOUT'})

const appReducer = combineReducers({
    userLayer: userDataSlice,
    score: scoreSlice,
})

const logOutReducer = (state, action) => {
    if (action.type === "LOGOUT") {
        state = undefined;
    }
    return appReducer(state, action);
}

export const store = configureStore({
    reducer:
        logOutReducer

})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;