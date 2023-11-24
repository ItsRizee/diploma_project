import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const loginWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Sign-in succeeded, no error message
                resolve();
            })
            .catch((error) => {
                // Sign-in failed, reject the error message
                reject(error);
            });
    });
};

export default loginWithEmailAndPassword;
