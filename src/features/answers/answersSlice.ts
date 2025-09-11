import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../data/firestore";

interface AnswerRecord {
    title: string;       // тема вопроса
    price: number;       // стоимость вопроса
    question: string;    // текст вопроса
    result: "correct" | "wrong"; // результат
    answeredAt: number;  // timestamp (Date.now())
}

interface AnswersState {
    items: AnswerRecord[];
    loading: boolean;
    error: string | null;
}

const initialState: AnswersState = {
    items: [],
    loading: false,
    error: null,
};

// ✅ добавить ответ в Firestore
export const addAnswerToHistory = createAsyncThunk<
    void,
    { userId: string; answer: AnswerRecord }
>("answers/add", async ({ userId, answer }, thunkAPI) => {
    try {
        await addDoc(collection(db, "answersHistory"), {
            userId,
            ...answer,
        });
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

// ✅ загрузить историю ответов пользователя
export const fetchAnswersHistory = createAsyncThunk<
    AnswerRecord[],
    { userId: string }
>("answers/fetch", async ({ userId }, thunkAPI) => {
    try {
        const q = query(
            collection(db, "answersHistory"),
            where("userId", "==", userId),
            orderBy("answeredAt", "desc")
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => doc.data() as AnswerRecord);
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

const answersSlice = createSlice({
    name: "answers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnswersHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnswersHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAnswersHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addAnswerToHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAnswerToHistory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addAnswerToHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default answersSlice.reducer;
