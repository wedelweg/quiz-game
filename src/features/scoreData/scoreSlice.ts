import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../data/firestore";

interface ScoreState {
    scores: {
        score: number;
    };
    loading: boolean;
    error: string | null;
}

const initialState: ScoreState = {
    scores: {
        score: 0,
    },
    loading: false,
    error: null,
};

// ✅ обновление очков пользователя в Firestore
export const fetchScoreUpdateDB = createAsyncThunk<
    number,
    { price: number; oldScore: number; id: string }
>("score/update", async ({ price, oldScore, id }, thunkAPI) => {
    try {
        const newScore = oldScore + price;
        const ref = doc(db, "users", id);

        await updateDoc(ref, {
            score: newScore,
        });

        return newScore;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {
        changeScore: (state, action) => {
            state.scores.score = action.payload;
        },
        resetScore: (state) => {
            state.scores.score = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchScoreUpdateDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchScoreUpdateDB.fulfilled, (state, action) => {
                state.loading = false;
                state.scores.score = action.payload;
            })
            .addCase(fetchScoreUpdateDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { changeScore, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
