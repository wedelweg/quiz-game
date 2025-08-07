import {legacy_createStore as createStore, type Store} from "redux";
import {userReducer} from "../reducers/userReducer.js";
import type {StateInterface} from "../utils/types.ts";


export const initialState: StateInterface = {
    user: {
       login: '',
        password: ''
    },
    scores: {
        score: 0,
    }
};

export const store: Store<StateInterface> = createStore(userReducer, initialState);