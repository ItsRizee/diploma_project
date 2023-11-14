import { firestore } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

class User {
    #name = "";
    #email = "";
    #address = "";
    #interests = [];
    #requests = [];
    #orders = [];

    constructor(name, email, address, interests, requests, orders) {
        this.#name = name;
        this.#email = email;
        this.#address = address;
        this.#interests = interests;
        this.#requests = requests;
        this.#orders = orders;
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

    get address (){
        return this.#address;
    }

    set address (newAddress){
        this.#address = newAddress;
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

    get orders(){
        return this.#orders;
    }

    set orders(newOrders){
        this.#orders = newOrders;
    }
}

export const addUser = async (name, email, address) => {
    try {
        await addDoc(
            collection(firestore, "users"),
            {
                name: name,
                email: email,
                address: address,
                interests: [],
                requests: [],
                orders: [],
            });
        return null;
    } catch (error) {
        return error.message;
    }
}

export const getUser = async (email) => {
    const q = query(collection(firestore, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let user = new User();

    // there will be only 1 document because the email is unique
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        user.name = data.name;
        user.email = data.email;
        user.address = data.address;
        user.interests = data.interests;
        user.requests = data.requests;
        user.orders = data.orders;
    });

    return user;
}