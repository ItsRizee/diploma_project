import {auth, firestore, storage} from "../firebase";
import {addDoc, collection, getDocs, updateDoc, query, where} from "firebase/firestore";
import {deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable} from "firebase/storage"
import {updateProfile} from "firebase/auth";

export class User {
    #name;
    #email;
    #photoURL;
    #uid;
    #interests;
    #requests;
    #craft;
    #orders;
    #catalog;

    constructor(name = "", email = "", photoURL = null, uid = null, interests = [], requests = [], craft = null, orders = null, catalog = null) {
        this.#name = name;
        this.#email = email;
        this.#photoURL = photoURL;
        this.#uid = uid;
        this.#interests = interests;
        this.#requests = requests;
        this.#craft = craft;
        this.#orders = orders;
        this.#catalog = catalog;
    }

    get name(){
        return this.#name;
    }

    set name(newName){
        this.#name = newName
    }

    get email(){
        return this.#email;
    }

    set email(newEmail){
        this.#email = newEmail;
    }

    get photoURL() {
        return this.#photoURL;
    }

    set photoURL(newPhotoURL) {
        this.#photoURL = newPhotoURL;
    }

    get uid() {
        return this.#uid;
    }

    set uid(newUid) {
        this.#uid = newUid;
    }

    get interests(){
        return this.#interests;
    }

    set interests(newInterests){
        this.#interests = newInterests;
    }

    get requests(){
        return this.#requests;
    }

    set requests(newRequests){
        this.#requests = newRequests;
    }

    get craft(){
        return this.#craft;
    }

    set craft(newCraft){
        this.#craft = newCraft;
    }

    get orders(){
        return this.#orders;
    }

    set orders(newOrders){
        this.#orders = newOrders;
    }

    get catalog(){
        return this.#catalog;
    }

    set catalog(newCatalog){
        this.#catalog = newCatalog;
    }
}

export const addUser = (name, email, uid) => {
    return new Promise((resolve, reject) => {
        addDoc(
            collection(firestore, "users"),
            {
                name: name,
                email: email,
                photoURL: null,
                uid: uid,
                interests: [],
                requests: [],
                craft: null,
                orders: null,
                catalog: null,
        }).then(() => {
            resolve(null);
        }).catch((error) => {
            reject(error.message);
        });
    });
}

export const getUser = (email) => {
    return new Promise((resolve) => {
        const q = query(collection(firestore, "users"), where("email", "==", email));
        getDocs(q).then((snapshot) => {
            const querySnapshot = snapshot;
            let user = new User();

            // there will be only 1 document because the email is unique
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                user.name = data.name;
                user.email = data.email;
                user.photoURL = data.photoURL;
                user.uid = data.uid;
                user.interests = data.interests;
                user.requests = data.requests;
                user.craft = data.craft;
                user.orders = data.orders;
                user.catalog = data.catalog;
            });

            resolve(user);
        });
    });
}

// const getUID = (email) => {
//     return new Promise((resolve) => {
//         const q = query(collection(firestore, "users"), where("email", "==", email));
//         getDocs(q).then((snapshot) => {
//             const querySnapshot = snapshot;
//             let uid;
//
//             querySnapshot.forEach((doc) => {
//                 const data = doc.data();
//                 uid = data.uid;
//             });
//
//             resolve(uid);
//         });
//     });
// }

export const getUserDoc = (uid) => {
    return new Promise((resolve) => {
        const q = query(collection(firestore, "users"), where("uid", "==", uid));
        getDocs(q).then((snapshot) => {
            resolve(snapshot.docs[0].ref); // Assuming there is only one document for a specific user
        });
    });
}

const UpdateProfilePictureDB = (photo) => {
    return new Promise((resolve, reject) => {
        getUserDoc(auth.currentUser.uid).then((docRef) => {
            // Use updateDoc to update the document
            updateDoc(docRef, { photoURL: photo })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
};



// can be called only from authenticated user
export const UpdateProfilePicture = (photo) => {
    return new Promise((resolve, reject) => {
        const listAllRef = ref(storage, 'profile_pictures/' + auth.currentUser.uid);

        // Find all the prefixes and items to see if there is a previous profile picture and if so delete it
        listAll(listAllRef)
            .then((res) => {
                const deletePromises = res.items.map((itemRef) => {
                    const deleteRef = ref(storage, itemRef.fullPath);
                    // Delete the file
                    return deleteObject(deleteRef);
                });

                // Wait for all delete promises to resolve
                return Promise.all(deletePromises);
            })
            .then(() => {
                // Create a Storage Ref
                const storageRef = ref(storage, 'profile_pictures/' + auth.currentUser.uid + '/' + photo.name);

                // Upload the file and metadata
                const uploadTask = uploadBytesResumable(storageRef, photo);

                uploadTask.on(
                    'state_changed',
                    () => {
                        // Get task progress, including the number of bytes uploaded
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        reject(error);
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                updateProfile(auth.currentUser, {
                                    photoURL: downloadURL,
                                })
                                    .then(() => {
                                        // Profile updated!
                                        resolve();
                                    })
                                    .catch((error) => {
                                        // An error occurred
                                        reject(error);
                                    });
                                UpdateProfilePictureDB(downloadURL)
                                    .then(() => {
                                        // Profile updated!
                                        resolve();
                                    })
                                    .catch((error) => {
                                        // An error occurred
                                        reject(error);
                                    });
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    }
                );
            })
            .catch((error) => {
                // There is no previous custom profile picture, so nothing is to be deleted
                reject(error);
            });
    });
};


export const UpdateProfileToCraftsman = (craft) => {
    return new Promise((resolve, reject) => {
        getUserDoc(auth.currentUser.uid).then((docRef) => {
            // Use updateDoc to update the document
            updateDoc(docRef, { craft: craft, orders: [], catalog: [] })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
}

export const addProductToCatalog = (productId, catalog) => {
    return new Promise((resolve, reject) => {
        catalog.push(productId);
        getUserDoc(auth.currentUser.uid).then((docRef) => {
            // Use updateDoc to update the document
            updateDoc(docRef, { catalog: catalog })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
}