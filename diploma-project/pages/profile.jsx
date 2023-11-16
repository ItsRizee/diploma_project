import {useEffect, useState} from "react";
import Head from "next/head";
import Image from "next/future/image";
import {auth} from "../firebase";
import {getUser} from "../services/user";
import {Navbar, Footer, ItemsScroll} from '../components';
import {discoverProducts} from "../public/constants";
import Collapse from "../components/Collapse";

const Profile = () => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const getUserData = async () => {
            const userData = await getUser(auth.currentUser.email);
            setUser(userData);
        }

        if(auth.currentUser){
            getUserData().then();
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
            <header>
                <Navbar/>
            </header>
            { auth.currentUser && user ?
                <main className="flex flex-col flex-1 my-10 space-y-5 mx-5 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-52 2xl:mx-72 justify-center items-center">
                    <div className="flex justify-center items-center">
                        <div>
                            <figure className="relative rounded-full flex justify-center mb-5">
                                <Image src="/profile_picture.png" alt="avatar icon" width={100} height={100}/>
                            </figure>
                            <div>
                                <div className="text-lg text-center mt-5">{user.name}</div>
                                <div className="font-medium text-center">{user.email}</div>
                                <div className="font-medium">Address: {user.address}</div>
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