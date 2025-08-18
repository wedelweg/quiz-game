import './App.css';
import {Route, Routes} from "react-router";
import Game from "./components/Game.tsx";
import Login from "./components/Login.tsx";
import {ScoreProvider} from "./components/ScoreContext.tsx";
import {Provider} from "react-redux";
import {store} from "./configureStore/store.ts";
import {collection, getDocs} from "firebase/firestore";
import {db} from "./data/firestore.ts";
import {useEffect} from "react";

const App = () => {

    useEffect(() => {
        getDocs(collection(db, "users"))
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                });
            })
            .catch((error) => {
                console.error("Error fetching users from Firestore:", error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a4f] to-[#000032]
            text-white p-4 flex flex-col items-center gap-6">
            <Provider store={store}>
                <ScoreProvider>
                    <Routes>
                        <Route path="/game" element={<Game/>}/>
                        <Route path="/" element={<Login/>}/>
                    </Routes>
                </ScoreProvider>
            </Provider>
        </div>
    );
};

export default App;
