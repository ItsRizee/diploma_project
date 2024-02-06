import {addDoc, collection, doc, getDoc, updateDoc, deleteDoc, query, where, getDocs} from "firebase/firestore";
import {firestore} from "../firebase";

export class Request {
    #title;
    #description;
    #user;
    #craftsman;
    #status;

    constructor(title = "", description = "", user = null, craftsman = null, status = "waiting") {
        this.#title = title;
        this.#description = description;
        this.#user = user;
        this.#craftsman = craftsman;
        this.#status = status;
    }

    get title(){
        return this.#title;
    }

    set title(newTitle){
        this.#title = newTitle;
    }

    get description(){
        return this.#description;
    }

    set description(newDescription){
        this.#description = newDescription;
    }

    get user(){
        return this.#user;
    }

    set user(newUser){
        this.#user = newUser;
    }

    get craftsman(){
        return this.#craftsman;
    }

    set craftsman(newCraftsman){
        this.#craftsman = newCraftsman;
    }

    get status(){
        return this.#status;
    }

    set status(newStatus){
        this.#status = newStatus;
    }
}

export const addRequest = (title, description, user, craftsmanUID, status) => {
    return new Promise((resolve, reject) => {
        addDoc(
            collection(firestore, "requests"),
            {
                title: title,
                description: description,
                user: user.uid,
                craftsman: craftsmanUID,
                status: status,
            })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error.message);
            });
    });
}

// return request's data
export const getRequest = (id) => {
    return new Promise((resolve, reject) => {
        const docRef = doc(firestore, "requests", id);
        getDoc(docRef).then((documentSnapshot) => {
            if(documentSnapshot.exists()){
                resolve(documentSnapshot.data());
            } else {
                reject("Request doesn't exist");
            }
        });

    });
}

// returns list of requests for a given catalogType ("requests" or "orders")
const getRequestsByListType = (user, listType) => {
    return new Promise((resolve) => {
        let requests = [];

        const q = listType === "requests" ?
            query(collection(firestore, "requests"), where("user", "==", user.uid)) :
            query(collection(firestore, "requests"), where("craftsman", "==", user.uid));

        getDocs(q).then((snapshot) => {
            snapshot.forEach((doc) => {
                const request = doc.data();
                const item = {
                    title: request.title,
                    description: request.description,
                    user: request.user,
                    craftsman: request.craftsman,
                    status: request.status,
                    id: doc.id,
                };
                requests.push(item);
            });

            // Sort requests based on the specified principle
            requests.sort((a, b) => {
                const statusOrder = { "accepted": 0, "waiting": 1, "canceled": 2, "denied": 2 };
                return statusOrder[a.status] - statusOrder[b.status];
            });

            resolve(requests);
        });
    });
}

// Function to get requests from the requests list
export const getRequests = (user) => {
    return getRequestsByListType(user, "requests");
}

// Function to get requests from the orders list
export const getOrders = (user) => {
    return getRequestsByListType(user, "orders");
}

export const updateRequest = (requestID, title, description) => {
    return new Promise((resolve, reject) => {
        updateDoc(doc(firestore, "requests", requestID), { title: title, description: description })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export const updateStatus = (requestID, newStatus) => {
    return new Promise((resolve, reject) => {
        updateDoc(doc(firestore, "requests", requestID), { status: newStatus })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export const deleteRequest = (requestId, user, setUser) => {
    return new Promise((resolve, reject) => {
        // Remove request from Firestore
        const requestDocRef = doc(firestore, "requests", requestId);
        // Get the request data before removing it
        getDoc(requestDocRef)
            .then((requestDoc) => {
                if (requestDoc.exists()) {
                    // checks if it is delete or cancel operation => change orders or requests arrays
                    const isDelete = requestDoc.data().craftsman === user.uid;

                    // Remove the request from Firestore
                    deleteDoc(requestDocRef)
                        .then(() => {
                            if(isDelete) {
                                let orders = user.orders.filter(request => request.id !== requestId);

                                setUser({
                                    name: user.name,
                                    email: user.email,
                                    photoURL: user.photoURL,
                                    uid: user.uid,
                                    interests: user.interests,
                                    requests: user.requests,
                                    craft: user.craft,
                                    orders: orders,
                                    catalog: user.catalog
                                });
                            } else {
                                let requests = user.requests.filter(request => request.id !== requestId);

                                setUser({
                                    name: user.name,
                                    email: user.email,
                                    photoURL: user.photoURL,
                                    uid: user.uid,
                                    interests: user.interests,
                                    requests: requests,
                                    craft: user.craft,
                                    orders: user.orders,
                                    catalog: user.catalog
                                });
                            }

                            resolve();
                        })
                        .catch((error) => {
                            reject(error.message);
                    });
                } else {
                    // Request not found
                    reject("Request not found. Please reload the page!");
                }
            }).catch((error) => {
                reject(error.message);
        });
    });
};
