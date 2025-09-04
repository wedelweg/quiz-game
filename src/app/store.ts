import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userDataSlice from "../features/userData/userDataSlice.ts";
import scoreSlice from "../features/scoreData/scoreSlice.ts";
import topicsReducer from "../features/topics/topicsSlice.ts";

const appReducer = combineReducers({
    userLayer: userDataSlice,
    score: scoreSlice,
    topics: topicsReducer,
})

export const logoutAction = ()=> ({type:"logout"});

const logOutReducer = (state, action) => {
    if (action.type === "logout") {
        state = undefined;
    }
    return appReducer(state, action);
}

export const store = configureStore({
    reducer: logOutReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;