import {createAsyncThunk, createSlice, type ActionReducerMapBuilder, type PayloadAction} from "@reduxjs/toolkit";
import {collection, doc, getDocs, setDoc, type QueryDocumentSnapshot} from "firebase/firestore";
import {db} from "../../data/firestore.ts";
import type {Topic} from "../../utils/types";
import {topics as seedTopicsData} from "../../data/questions.ts";

interface TopicsState {
    topics: Topic[];
}

const initialState: TopicsState = {
    topics: []
}

export const fetchTopics = createAsyncThunk< Topic[] >(
    "topics/fetchTopics",
    async () => {
        const querySnapshot = await getDocs(collection(db, "topics"));
        const result: Topic[] = [];
        querySnapshot.forEach((docSnap: QueryDocumentSnapshot) => {
            const data = docSnap.data() as Topic;
            result.push({ title: data.title, questions: data.questions });
        });
        return result;
    }
);

export const seedTopics = createAsyncThunk(
    "topics/seedTopics",
    async (): Promise<void> => {
        // Пишем каждый топик под id равным title, чтобы не дублировать
        const ops = seedTopicsData.map((t) => setDoc(doc(db, "topics", t.title), t));
        await Promise.all(ops);
    }
);

const topicsSlice = createSlice({
    name: "topics",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<TopicsState>) => {
        builder
            .addCase(fetchTopics.fulfilled, (state: TopicsState, {payload}: PayloadAction<Topic[]>) => {
                state.topics = payload as Topic[];
            });
    }
});

export default topicsSlice.reducer;

