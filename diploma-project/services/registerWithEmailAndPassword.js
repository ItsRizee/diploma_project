import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from "../firebase";
import {default_profile_picture} from "../public/constants";

const registerWithEmailAndPassword = (fullName, email, password) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(userCredential.user, { displayName: fullName, photoURL: default_profile_picture })
                    .then(() => {
                        // Sign-in succeeded, no error message
                        resolve(userCredential.user);
                    })
                    .catch((updateProfileError) => {
                        // Update profile failed, return the error message
                        reject(updateProfileError);
                    });
            })
            .catch((createUserError) => {
                // Sign-in failed, return the error message
                reject(createUserError);
            });
    });
};

export default registerWithEmailAndPassword;