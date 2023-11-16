import {useEffect, useState} from "react";
import Head from "next/head";
import Image from "next/future/image";
import {auth} from "../firebase";
import {getUser} from "../services/user";
import {Navbar, Footer, ItemsScroll} from '../components';
import {discoverProducts} from "../public/constants";

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
        <div className="overflow-x-hidden">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Home page</title>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>
            <header>
                <Navbar/>
            </header>
            { auth.currentUser && user ?
                <main className="my-10 space-y-5 lg:mx-36 xl:mx-72">
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
                    <ItemsScroll listOfItems={discoverProducts} categoryName="My interests"/>
                    <ItemsScroll listOfItems={discoverProducts} categoryName="My Requests"/>
                    <ItemsScroll listOfItems={discoverProducts} categoryName="Received orders"/>
                </main> :
                <div className="text-lg text-center my-40">Loading...</div>
            }
            <Footer/>
        </div>
    );
}

export default Profile;