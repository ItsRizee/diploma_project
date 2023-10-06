import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from "../firebase";

const registerWithEmailAndPassword = async (fullName, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        try {
            await updateProfile(userCredential.user, {displayName: fullName, photoURL: null});
        } catch (error) {
            return error.message; // Sign-in failed, return the error message
        }
        return null; // Sign-in succeeded, no error message
    } catch (error) {
        return error.message; // Sign-in failed, return the error message
    }
};

export default registerWithEmailAndPassword;