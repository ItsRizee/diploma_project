import {addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where, limit} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import {auth, firestore, storage} from "../firebase";
import {addProductToCatalog, getUserById} from "./user";

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

    constructor(title = "", description = "", displayImageURL = null, owner = null, price = null, createdDate = null, likes = [], timeline = [], tags = []) {
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
                                likes: [],
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

export const updateLikesOfProduct = (productID, likes) => {
    return new Promise((resolve, reject) => {
        updateDoc(doc(firestore, "products", productID), { likes: likes })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// returns list of products for a given catalogType ("catalog" or "interests")
const getProductsByListType = (user, listType) => {
    return new Promise((resolve) => {
        let products = [];

        const q = listType === "catalog" ?
            query(collection(firestore, "products"), where("owner", "==", user.uid)) :
            query(collection(firestore, "products"), where("likes", "array-contains", user.uid));

        getDocs(q).then((snapshot) => {
            snapshot.forEach((doc) => {
                const product = doc.data();
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
                    id: doc.id,
                };
                products.push(item);
            });

            // Sort products by createdDate in descending order (newest to oldest)
            products.sort((a, b) => b.createdDate.toMillis() - a.createdDate.toMillis());

            resolve(products);
        });
    });
}

// Function to get products from the catalog list
export const getCatalog = (user) => {
    return getProductsByListType(user, "catalog");
}

// Function to get products from the interests list
export const getInterests = (user) => {
    return getProductsByListType(user, "interests");
}

export const getNewProducts = () => {
    return new Promise((resolve) => {
        // Get the current time and calculate the timestamp for 24 hours ago
        const currentTime = new Date();
        const twentyFourHoursAgo = new Date(currentTime - 86400000); // 86400000 milliseconds in 24 hours

        getDocs(query(collection(firestore, "products"), where('createdDate', '>', twentyFourHoursAgo))).then((querySnapshot) => {
            let newProducts = [];
            let promises = [];

            querySnapshot.forEach((doc) => {
                const product = doc.data();
                let promise = getUserById(product.owner).then((userData) => {
                    const item = {
                        name: userData.name,
                        photoURL: userData.photoURL,
                        userID: product.owner,
                        productID: doc.id,
                    }

                    newProducts.push(item);
                });

                promises.push(promise);
            });

            Promise.all(promises).then(() => {
                resolve(newProducts);
            });
        });
    });
}

export const getTrendingProducts = () => {
    return new Promise((resolve) => {
        // Get the current time and calculate the timestamp for a week ago
        const currentTime = new Date();
        const weekAgo = new Date(currentTime - 604800000);

        getDocs(query(collection(firestore, "products"), where('createdDate', '>', weekAgo))).then((querySnapshot) => {
            let newProducts = [];

            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const item = {
                    title: product.title,
                    description: product.description,
                    likes: product.likes,
                    displayImageURL: product.displayImageURL,
                    id: doc.id,
                }

                newProducts.push(item);
            });

            resolve(newProducts);
        });
    });
}

export const getDiscoverProducts = () => {
    return new Promise((resolve) => {
        // Get the current time and calculate the timestamp for a week ago
        const currentTime = new Date();
        const monthAgo = new Date(currentTime - 2629800000);

        getDocs(query(collection(firestore, "products"), where('createdDate', '>', monthAgo), limit(10))).then((querySnapshot) => {
            let newProducts = [];

            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const item = {
                    title: product.title,
                    description: product.description,
                    displayImageURL: product.displayImageURL,
                    owner: product.owner,
                    price: product.price,
                    tags: product.tags,
                    createdDate: product.createdDate.toMillis(),
                    likes: product.likes,
                    id: doc.id,
                };

                newProducts.push(item);
            });

            resolve(newProducts);
        });
    });
}