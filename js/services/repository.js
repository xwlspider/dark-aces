import { collection, doc, setDoc, deleteDoc, onSnapshot }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase.js";

/** Patrón Repository: una sola implementación para cualquier colección. */
export function createRepository(name) {
  const col = collection(db, name);
  return {
    subscribe: (cb) => onSnapshot(col, (s) => cb(s.docs.map((d) => ({ id: d.id, ...d.data() }))), console.error),
    save: ({ id, ...data }) => setDoc(doc(db, name, id), data),
    remove: (id) => deleteDoc(doc(db, name, id)),
  };
}
