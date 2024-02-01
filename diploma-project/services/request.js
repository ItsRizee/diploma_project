import {addDoc, collection, doc, getDoc, updateDoc, deleteDoc, query, where, getDocs} from "firebase/firestore";
import {firestore} from "../firebase";
import {addRequestToList, getUserByEmail, removeRequestFromList, User} from "./user";

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

export const addRequest = (title, description, user, setUser, craftsmanUID, status) => {
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
            .then((doc) => {
                // addRequestToList(doc.id, user, craftsman)
                //     .then(() => {
                //         resolve();
                //     })
                //     .catch((errorMessage) => {
                //         reject(errorMessage);
                // });
                // NEW CODE
                let requests = [...user.requests, doc.id];
                let userCopy = {...user};
                userCopy.requests = requests;
                setUser(userCopy);

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

// return request's data
export const getRequestDoc = (id) => {
    return new Promise((resolve) => {
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
        getRequestDoc(requestID).then((docRef) => {
            // Use updateDoc to update the document
            updateDoc(docRef, { title: title, description: description })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
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

export const deleteRequest = (requestId, user, setUser) => {
    return new Promise((resolve, reject) => {
        // Remove request from Firestore
        const requestDocRef = doc(firestore, "requests", requestId);
        // Get the request data before removing it
        getDoc(requestDocRef)
            .then((requestDoc) => {
                if (requestDoc.exists()) {
                    // Remove the request from Firestore
                    deleteDoc(requestDocRef)
                        .then(() => {
                            // Remove the request from user's and craftsman's lists
                            // removeRequestFromList(requestId, user, setUser, craftsman, setCraftsman)
                            //     .then(() => {
                            //         resolve();
                            //     })
                            //     .catch((errorMessage) => {
                            //         console.log(errorMessage);
                            //         reject(errorMessage);
                            // });
                            // NEW CODE
                            console.log("Before:");
                            console.log(user.orders);
                            console.log(requestId);

                            let orders = user.orders.filter(request => request.id !== requestId);

                            console.log("After:")
                            console.log(orders);

                            let userCopy = {...user};
                            userCopy.orders = orders;
                            setUser(userCopy);
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
