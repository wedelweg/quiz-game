import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {UserInfo, UserStateInterface} from "../../utils/types.ts";
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../data/firestore.ts";

const initialState: UserStateInterface = {
    id: '',
    user: {
        login: '',
        password: '',
    }
}

export const fetchUserSaveInDB = createAsyncThunk(
    "user/fetchUserSaveInDB",
    async ({login, password}: UserInfo) => {
        const response = await addDoc(collection(db, "users"), {
            login,
            password,
            score: 0,
            createdAt: Date.now(),
        });
        if (!response) {
            throw new Error("Error adding user to Firestore");
        }
        return {
            id: response.id,
            login,
        };
    }
);

export const fetchUserCheckExistInDB = createAsyncThunk(
    "user/fetchUserCheckExistInDB",
    async ({login, password}: UserInfo) => {
        const userRef = collection(db, 'users');
        const buildQuery = query(
            userRef,
            where('login', '==', login),
            where('password', '==', password)
        );
        const querySnapshot = await getDocs(buildQuery);
        if (querySnapshot.empty) {
            throw new Error("User not found");
        }
        const userDoc = querySnapshot.docs[0];
        return {
            id: userDoc.id,
            login: userDoc.data().login
        }
    }
);

const userDataSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeLogin(state, action: PayloadAction<string>) {
            state.user.login = action.payload;
        },
        changeId(state, action: PayloadAction<string>) {
            state.id = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserSaveInDB.pending, (state) => {
                state.id = "Pending....";
                console.log("Pending...")
            })
            .addCase(fetchUserSaveInDB.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.user.login = action.payload.login;
                localStorage.setItem("userId", action.payload.id)
                console.log("Fulfilled...")
            })
            .addCase(fetchUserSaveInDB.rejected, (state, action) => {
                state.id = action.payload + "" || "Error!!!";
                console.log(action.payload);
                console.log("Rejected...")
            })
            .addCase(fetchUserCheckExistInDB.pending, (state) => {
                state.id = "Pending....";
                console.log("Check Pending...")
            })
            .addCase(fetchUserCheckExistInDB.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.user.login = action.payload.login;
                localStorage.setItem("userId", action.payload.id)
                console.log("Check Fulfilled...")
            })
            .addCase(fetchUserCheckExistInDB.rejected, () => {
                console.log("Check Rejected... Attention: Now system thinks it's a guest!") //todo need fix: reject sign in as a Guest if credentials are incorrect
            })
    }
})

export const {changeLogin, changeId} = userDataSlice.actions;
export default userDataSlice.reducer;
