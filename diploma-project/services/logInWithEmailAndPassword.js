import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return null; // Sign-in succeeded, no error message
    } catch (error) {
        return error.message; // Sign-in failed, return the error message
    }
};

export default loginWithEmailAndPassword;
