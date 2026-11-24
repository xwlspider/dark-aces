import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { app } from "./firebase.js";
import { ADMIN_UID } from "../config/firebase.config.js";

const auth = getAuth(app);
export const login = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
export const logout = () => signOut(auth);
/** Avisa si quien navega es el admin (solo tu UID). */
export const onAdminChange = (cb) => onAuthStateChanged(auth, (u) => cb(!!u && u.uid === ADMIN_UID));
