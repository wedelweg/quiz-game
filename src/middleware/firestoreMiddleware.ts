import { collection, addDoc } from "firebase/firestore";
import {db} from "../data/firestore.ts";
import {CHANGE_LOGIN} from "../actions/userAction.ts";
import {auth} from "../data/firestore.ts";
import {signInAnonymously} from "firebase/auth";

export const firestoreMiddleware = (_store:any) => (next:any) => async (action:any) => {
    const result = next(action);
    if (action?.type === CHANGE_LOGIN && action?.payload) {
        try {
            if (!auth.currentUser) {
                await signInAnonymously(auth);
            }
            const docRef = await addDoc(collection(db, "users"), {
                login: String(action.payload),
                createdAt: Date.now(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return result;
}