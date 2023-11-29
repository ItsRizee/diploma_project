import {signOut} from "firebase/auth";
import { auth } from "../firebase";

const logOut = () => {
    return new Promise((resolve, reject) => {
        signOut(auth)
            .then(() => {
                // Sign-out succeeded, no error message
                resolve();
            })
            .catch((error) => {
                // Sign-out failed, reject the error message
                reject(error);
            });
    });
};

export default logOut;
