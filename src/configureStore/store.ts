import {legacy_createStore as createStore} from "redux";
import {userReducer} from "../reducers/userReducer.ts";
import type {StateInterface} from "../utils/types.ts";

export const initialState: StateInterface = {
     user:{
         login: "hello",
         password: "",
     },
     scores: {
         score: 0,
     }
 };

export const store = createStore(userReducer, initialState);