import {addDoc, collection, doc, getDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {firestore} from "../firebase";
import {addRequestToList, getUserByEmail, removeRequestFromList} from "./user";

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

export const addRequest = (title, description, user, craftsman, status) => {
    return new Promise((resolve, reject) => {
        addDoc(
            collection(firestore, "requests"),
            {
                title: title,
                description: description,
                user: user.uid,
                craftsman: craftsman.uid,
                status: status,
        }).then((doc) => {
            addRequestToList(doc.id, user, craftsman).then(() => {
                    resolve();
                })
                .catch((errorMessage) => {
                    reject(errorMessage);
            });
        }).catch((error) => {
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

// return request's data
export const getRequestDoc = (id) => {
    return new Promise((resolve) => {
        console.log(id);
        const docRef = doc(firestore, "requests", id);
        getDoc(docRef).then((documentSnapshot) => {
            if(documentSnapshot.exists()){
                resolve(documentSnapshot.ref);
            } else {
                resolve(null);
            }
        });

    });
}

// returns list of requests for a given catalogType ("requests" or "orders")
const getRequestsByListType = (email, listType) => {
    return new Promise((resolve) => {
        getUserByEmail(email).then((user) => {
            let promises = [];
            let requests = [];

            const listOfIndexes = (listType === "requests" ? user.requests : user.orders);

            listOfIndexes.forEach((requestId) => {
                const promise = getRequest(requestId)
                    .then((request) => {
                        if (request != null) {
                            const item = {
                                title: request.title,
                                description: request.description,
                                user: request.user,
                                craftsman: request.craftsman,
                                status: request.status,
                            };
                            requests.push(item);
                        }
                    });
                promises.push(promise);
            });

            // wait for all promises to finish up before resolving the main promise
            Promise.all(promises).then(() => {
                resolve(requests);
            });
        });
    });
}

// Function to get requests from the requests list
export const getRequests = (email) => {
    return getRequestsByListType(email, "requests");
}

// Function to get requests from the orders list
export const getOrders = (email) => {
    return getRequestsByListType(email, "orders");
}

export const updateStatus = (requestID, newStatus) => {
    return new Promise((resolve, reject) => {
        getRequestDoc(requestID).then((docRef) => {
            // Use updateDoc to update the document
            updateDoc(docRef, { status: newStatus })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
}

export const deleteRequest = (requestId, user, setUser, craftsman, setCraftsman) => {
    return new Promise((resolve, reject) => {
        // Remove request from Firestore
        const requestDocRef = doc(firestore, "requests", requestId);

        // Get the request data before removing it
        getDoc(requestDocRef).then((requestDoc) => {
            if (requestDoc.exists()) {
                // Remove the request from Firestore
                deleteDoc(requestDocRef).then(() => {
                    console.log("deleted request from DB");
                    // Remove the request from user's and craftsman's lists
                    removeRequestFromList(requestId, user, setUser, craftsman, setCraftsman)
                        .then(() => {
                            resolve();
                        })
                        .catch((errorMessage) => {
                            console.log(errorMessage);
                            reject(errorMessage);
                    });
                }).catch((error) => {
                    reject(error.message);
                });
            } else {
                // Request not found
                reject("Request not found.");
            }
        }).catch((error) => {
            reject(error.message);
        });
    });
};
