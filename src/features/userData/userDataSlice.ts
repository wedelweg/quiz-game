import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../data/firestore";

export interface UserData {
    id: string;
    login: string;
    password: string;
    score: number;
}

interface UserDataState {
    id: string | null;
    login: string | null;
    score: number;
    loading: boolean;
    error: string | null;
    isGuest: boolean; // 👈 добавили
}

const initialState: UserDataState = {
    id: null,
    login: null,
    score: 0,
    loading: false,
    error: null,
    isGuest: false,
};

// регистрация
export const fetchUserSaveInDB = createAsyncThunk<
    UserData,
    { login: string; password: string }
>("userData/save", async ({ login, password }, thunkAPI) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            login,
            password,
            score: 0,
        });
        return { id: docRef.id, login, password, score: 0 };
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

// логин
export const fetchUserCheckExistInDB = createAsyncThunk<
    UserData,
    { login: string; password: string }
>("userData/checkExist", async ({ login, password }, thunkAPI) => {
    try {
        const q = query(
            collection(db, "users"),
            where("login", "==", login),
            where("password", "==", password)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) throw new Error("User not found or wrong password");

        const userDoc = snapshot.docs[0];
        const data = userDoc.data() as Omit<UserData, "id">;

        return {
            id: userDoc.id,
            login: data.login,
            password: data.password,
            score: data.score,
        };
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        changeId: (state, action) => {
            state.id = action.payload;
        },
        changeLogin: (state, action) => {
            state.login = action.payload;
        },
        changeScore: (state, action) => {
            state.score = action.payload;
        },
        setGuest: (state) => {
            state.id = null;
            state.login = "Guest";
            state.score = 0;
            state.isGuest = true; // 👈 сразу ставим
            localStorage.setItem("guest", "true");
            localStorage.removeItem("userId");
        },
        logout: (state) => {
            state.id = null;
            state.login = "Guest";
            state.score = 0;
            state.error = null;
            state.isGuest = true;
            localStorage.setItem("guest", "true");
            localStorage.removeItem("userId");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserSaveInDB.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.login = action.payload.login;
                state.score = 0;
                state.isGuest = false;
                localStorage.setItem("userId", action.payload.id);
                localStorage.removeItem("guest");
            })
            .addCase(fetchUserCheckExistInDB.fulfilled, (state, action) => {
                if (action.payload) {
                    state.id = action.payload.id;
                    state.login = action.payload.login;
                    state.score = action.payload.score;
                    state.isGuest = false;
                    localStorage.setItem("userId", action.payload.id);
                    localStorage.removeItem("guest");
                }
            });
    },
});

export const { changeId, changeLogin, changeScore, logout, setGuest } =
    userDataSlice.actions;
export default userDataSlice.reducer;
