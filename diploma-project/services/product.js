import {addDoc, collection, doc, getDoc, serverTimestamp} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import {auth, firestore, storage} from "../firebase";
import {addProductToCatalog, getUserByEmail} from "./user";

export class Product {
    #title;
    #description;
    #displayImageURL;
    #owner;
    #price;
    #createdDate;
    #likes;
    #timeline;
    #tags;

    constructor(title = "", description = "", displayImageURL = null, owner = null, price = null, createdDate = null, likes = 0, timeline = [], tags = []) {
        this.#title = title;
        this.#description = description;
        this.#displayImageURL = displayImageURL;
        this.#owner = owner;
        this.#price = price;
        this.#createdDate = createdDate;
        this.#likes = likes;
        this.#timeline = timeline;
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

    get price(){
        return this.#price;
    }

    set price(newPrice){
        this.#price = newPrice;
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

    get likes(){
        return this.#likes;
    }

    set likes(newLikes){
        this.#likes = newLikes;
    }

    get timeline(){
        return this.#timeline;
    }

    set timeline(newTimeline){
        this.#timeline = newTimeline;
    }
}

export const addProduct = (title, description, image, catalog, price, timeline = [], tags = []) => {
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
                                price: price,
                                tags: tags,
                                timeline: timeline,
                                createdDate: serverTimestamp(),
                                likes: 0,
                        }).then((doc) => {
                            addProductToCatalog(doc.id, catalog)
                                .then(() => {
                                    resolve(null);
                                })
                                .catch((errorMessage) => {
                                    reject(errorMessage);
                            });
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

// returns list of products for a given catalogType ("catalog" or "interests")
const getProductsByListType = (email, listType) => {
    return new Promise((resolve) => {
        getUserByEmail(email).then((user) => {
            let promises = [];
            let products = [];
            let i = 0;

            const listOfIndexes = listType === "catalog" ? user.catalog : user.interests;

            listOfIndexes.forEach((productId) => {
                const promise = getProduct(productId)
                    .then((product) => {
                        if (product != null) {
                            const item = {
                                title: product.title,
                                description: product.description,
                                displayImageURL: product.displayImageURL,
                                owner: product.owner,
                                price: product.price,
                                tags: product.tags,
                                createdDate: product.createdDate,
                                likes: product.likes,
                                timeline: product.timeline,
                                index: i++,
                            };
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

// Function to get products from the catalog list
export const getCatalog = (email) => {
    return getProductsByListType(email, "catalog");
}

// Function to get products from the interests list
export const getInterests = (email) => {
    return getProductsByListType(email, "interests");
}

// export const getCatalog = (email) => {
//     return new Promise((resolve) => {
//         getUserByEmail(email).then((user) => {
//             let promises = [];
//             let products = [];
//             let i = 0;
//
//             user.catalog.forEach((productId) => {
//                 const promise = getProduct(productId)
//                     .then((product) => {
//                         if (product != null) {
//                             const item = {
//                                 title: product.title,
//                                 description: product.description,
//                                 displayImageURL: product.displayImageURL,
//                                 owner: product.owner,
//                                 price: product.price,
//                                 tags: product.tags,
//                                 createdDate: product.createdDate,
//                                 likes: product.likes,
//                                 timeline: product.timeline,
//                                 index: i++,
//                             }
//                             products.push(item);
//                         }
//                     });
//                 promises.push(promise);
//             });
//
//             // wait for all promises to finish up before resolving the main promise
//             Promise.all(promises).then(() => {
//                 resolve(products);
//             });
//         });
//     });
// }