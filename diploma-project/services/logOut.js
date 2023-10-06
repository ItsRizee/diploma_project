import {signOut} from "firebase/auth";
import { auth } from "../firebase";

const logOut = async () => {
    try {
        await signOut(auth);
        return null; // Sign-in succeeded, no error message
    } catch (error) {
        return error.message; // Sign-in failed, return the error message
    }
};

export default logOut;
