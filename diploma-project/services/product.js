import {addDoc, collection, doc, getDoc, serverTimestamp} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import {auth, firestore, storage} from "../firebase";
import {addProductToCatalog, getUserByEmail} from "./user";

export class Product {
    #title;
    #description;
    #displayImageURL;
    #owner;
    #createdDate;
    #tags;

    constructor(title = "", description = "", displayImageURL = null, owner = null, createdDate = null, tags = []) {
        this.#title = title;
        this.#description = description;
        this.#displayImageURL = displayImageURL;
        this.#owner = owner;
        this.#createdDate = createdDate;
        this.#tags = tags;
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

    get owner(){
        return this.#owner;
    }

    set owner(newOwner){
        this.#owner = newOwner;
    }

    get createdDate(){
        return this.#createdDate;
    }

    set createdDate(newCreatedDate){
        this.#createdDate = newCreatedDate;
    }

    get tags(){
        return this.#tags;
    }

    set tags(newTags){
        this.#tags = newTags;
    }
}

export const addProduct = (title, description, image, catalog, tags = []) => {
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
                                owner: auth.currentUser.uid,
                                tags: tags,
                                createdDate: serverTimestamp(),
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

// return product's data
export const getProduct = (id) => {
    return new Promise((resolve) => {
        const docRef = doc(firestore, "products", id);
        getDoc(docRef).then((documentSnapshot) => {
            if(documentSnapshot.exists()){
                resolve(documentSnapshot.data());
            } else {
                resolve(null);
            }
        });

    });
}

// returns list of products
export const getCatalog = (email) => {
    return new Promise((resolve) => {
        getUserByEmail(email).then((user) => {
            let promises = [];
            let products = [];
            let i = 0;

            user.catalog.forEach((productId) => {
                const promise = getProduct(productId)
                    .then((product) => {
                        if (product != null) {
                            const item = {
                                title: product.title,
                                description: product.description,
                                displayImageURL: product.displayImageURL,
                                owner: product.owner,
                                tags: product.tags,
                                createdDate: product.createdDate,
                                index: i++,
                            }
                            products.push(item);
                        }
                    });
                promises.push(promise);
            });

            // wait for all promises to finish up before resolving the main promise
            Promise.all(promises).then(() => {
                resolve(products);
            });
        });
    });
}