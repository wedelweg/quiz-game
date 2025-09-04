import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "./firestore.ts";
import {topics as seedTopicsData} from "./questions.ts";

/**
 * Выполняет одноразовый сидинг коллекции "topics" из локальных данных,
 * если коллекция пуста. Повторные вызовы безопасны.
 */
export async function runTopicsMigration(): Promise<{ seeded: boolean; count: number }> {
    try {
        const alreadyFlag = localStorage.getItem("topics_migrated_v1");

        const snapshot = await getDocs(collection(db, "topics"));
        if (snapshot.empty) {
            const ops = seedTopicsData.map((t) => setDoc(doc(db, "topics", t.title), t));
            await Promise.all(ops);
            localStorage.setItem("topics_migrated_v1", "true");
            return {seeded: true, count: seedTopicsData.length};
        }

        // Если не пусто — просто отмечаем, чтобы больше не проверять на клиенте
        if (!alreadyFlag) {
            localStorage.setItem("topics_migrated_v1", "true");
        }
        return {seeded: false, count: snapshot.size};
    } catch (e) {
        // В случае ошибки не блокируем приложение
        console.error("Topics migration failed", e);
        return {seeded: false, count: 0};
    }
}



