import {addDoc, collection} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import {auth, firestore, storage} from "../firebase";
import {addProductToCatalog} from "./user";

export class Product {
    #title;
    #description;
    #displayImageURL;

    constructor(title = "", description = "", displayImageURL = null) {
        this.#title = title;
        this.#description = description;
        this.#displayImageURL = displayImageURL;
    }

    get title(){
        return this.#title;
    }
    set title(newTitle) {
        this.#title = newTitle;
    }

    get description(){
        return this.#description;
    }

    set description(newDescription){
        this.#description = newDescription;
    }

    get displayImageURL(){
        return this.#displayImageURL;
    }

    set displayImageURL(newDisplayImageURL){
        this.#displayImageURL = newDisplayImageURL;
    }
}

export const addProduct = (title, description, image, catalog) => {
    return new Promise((resolve, reject) => {
        // Create a Storage Ref
        const storageRef = ref(storage, 'products/' + auth.currentUser.uid + '/display_image/'  + image.name);

        // Upload the file and metadata
        const uploadTask = uploadBytesResumable(storageRef, image);

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
                        addDoc(
                            collection(firestore, "products"),
                            {
                                title: title,
                                description: description,
                                displayImageURL: downloadURL,
                        }).then((doc) => {
                            addProductToCatalog(doc.id, catalog).catch((errorMessage) => {
                                resolve(errorMessage);
                            });
                            resolve(null);
                        }).catch((error) => {
                            reject(error.message);
                        });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
        );
    });
}