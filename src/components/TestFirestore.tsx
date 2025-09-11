import { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../data/firestore";

const TestFirestore = () => {
    const [message, setMessage] = useState("");

    // 🚀 Добавить тестового юзера
    const addUser = async () => {
        try {
            await addDoc(collection(db, "users"), {
                login: "testUser",
                password: "123456",
                score: 0,
            });
            setMessage("✅ User added successfully!");
        } catch (error) {
            console.error("Error adding user: ", error);
            setMessage("❌ Error adding user, check console");
        }
    };

    // 📥 Получить список юзеров
    const fetchUsers = async () => {
        try {
            const snapshot = await getDocs(collection(db, "users"));
            const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            console.log("Users:", users);
            setMessage("✅ Users fetched, check console!");
        } catch (error) {
            console.error("Error fetching users: ", error);
            setMessage("❌ Error fetching users, check console");
        }
    };

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg">
            <h2 className="text-xl mb-4">Firestore Test</h2>
            <button onClick={addUser} className="btn-yellow mr-2">
                Add Test User
            </button>
            <button onClick={fetchUsers} className="btn-ghost">
                Fetch Users
            </button>
            <p className="mt-4">{message}</p>
        </div>
    );
};

export default TestFirestore;
