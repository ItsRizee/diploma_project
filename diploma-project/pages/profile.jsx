import {useEffect, useState} from "react";
import Head from "next/head";
import Image from "next/future/image";
import {auth, firestore} from "../firebase";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {getUser, User} from "../services/user";
import {Navbar, Footer, ItemsScroll, Collapse, UploadImageModal} from '../components';
import {default_profile_picture, discoverProducts} from "../public/constants";

const Profile = () => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const getUserData = async () => {
            getUser(auth.currentUser.email).then((userData) => {
                setUser(userData);
            });
        };

        if (auth.currentUser) {
            getUserData().then();

            const q = query(collection(firestore, "users"), where("uid", "==", auth.currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let userData = new User();

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    userData.name = data.name;
                    userData.email = data.email;
                    userData.photoURL = data.photoURL;
                    userData.uid = data.uid;
                    userData.interests = data.interests;
                    userData.requests = data.requests;
                    userData.orders = data.orders;
                });

                setUser(userData);
            });

            // Clean up the listener when the component unmounts
            return () => {
                unsubscribe();
            };
        }
    }, [auth.currentUser]);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Home page</title>
                {/*<link rel="icon" href="/images/favicon.ico"/>*/}
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
                <link rel="manifest" href="/images/site.webmanifest"/>
            </Head>
            <Navbar/>
            { auth.currentUser && user ?
                <main className="flex flex-col flex-1 my-10 space-y-5 mx-5 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-52 2xl:mx-72 justify-center items-center">
                    <div className="flex justify-center items-center mb-5">
                        <div>
                            <figure className="relative rounded-full flex justify-center mb-5">
                                <UploadImageModal />
                                <div className="absolute right-11 -bottom-2 z-10 h-10 w-10 bg-base-100 rounded-full"/>
                                <Image src={user.photoURL ? user.photoURL : default_profile_picture} alt="avatar icon" width={100} height={100}/>
                            </figure>
                            <div>
                                <div className="text-lg text-center mt-5">{user.name}</div>
                                <div className="font-medium text-center">{user.email}</div>
                            </div>
                        </div>
                    </div>
                    {/*<ItemsScroll listOfItems={user.interests} categoryName="My interests"/>*/}
                    {/*<ItemsScroll listOfItems={user.requests} categoryName="My Requests"/>*/}
                    {/*<ItemsScroll listOfItems={user.orders} categoryName="Received orders"/>*/}
                    <Collapse id={1} categoryName="My interests" content={<ItemsScroll listOfItems={discoverProducts} categoryName=""/>}/>
                    <Collapse id={2} categoryName="My Requests" content={<ItemsScroll listOfItems={discoverProducts} categoryName=""/>}/>
                    <Collapse id={3} categoryName="Received orders" content={<ItemsScroll listOfItems={discoverProducts} categoryName=""/>}/>
                </main> :
                <div className="flex flex-1 text-lg justify-center items-center my-40">Loading...</div>
            }
            <Footer/>
        </div>
    );
}

export default Profile;