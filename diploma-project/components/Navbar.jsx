import React, {useEffect, useState} from "react";
import {app_name, default_profile_picture} from "../public/constants";
import {useRouter} from "next/router";
import {auth} from "../firebase";
import Link from "next/link";
import logOut from "../services/logOut";
import Image from "next/future/image";
import { useUserStore } from "../store/userStorage";

const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useUserStore((state) => ({user: state.user}));
    const router = useRouter();

    const handleLogout = (event) => {
        event.preventDefault();

        setError(null);

        logOut()
            .then(() => {
                // Logout was successful, navigate to the signIn page
                void router.push("/signin");
            })
            .catch((error) => {
                // Logout failed, set the error message
                setError(error.message);
            });
    };

    useEffect(() => {
        let accessToken = sessionStorage.getItem("accessToken");
        if(accessToken !== ''){
            setIsLogged(true);
        }
    }, [user]);

    return (
        <header className="navbar flex-none bg-none space-x-4 sm:px-5">
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <div tabIndex={0} className="btn btn-ghost btn-circle p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[3] p-2 shadow-xl bg-base-200 dark:bg-gray-800 rounded-box w-36">
                        <li>
                            <Link href="/">
                                <button className="btn btn-ghost btn-sm normal-case font-normal text-base justify-start">
                                    Home
                                </button>
                            </Link>
                        </li>
                        {isLogged && user.craft &&
                            <li>
                                <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-sm normal-case font-normal text-base justify-start">
                                    New Product
                                </label>
                            </li>
                        }
                        {isLogged &&
                            <li>
                                <Link href="#">
                                    <button className="btn btn-ghost btn-sm normal-case font-normal text-base justify-start">
                                        New Request
                                    </button>
                                </Link>
                            </li>
                        }
                        <li>
                            <Link href="/about">
                                <button className="btn btn-ghost btn-sm normal-case font-normal text-base justify-start">
                                    About Us
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
                <h1 className="hidden lg:flex font-bold text-xl sm:text-3xl lg:ml-5">{app_name}</h1>
                <figure className="hidden lg:flex">
                    <Image src="/wavary-favicon-color.png" alt="hammer icon" width={35} height={35}/>
                </figure>
            </div>
            <div className="navbar-center items-start">
                <h1 className="lg:hidden font-bold text-xl sm:text-3xl">{app_name}</h1>
                <figure className="sm:hidden">
                    <Image src="/wavary-favicon-color.png" alt="hammer icon" width={25} height={25}/>
                </figure>
                <figure className="hidden sm:flex lg:hidden">
                    <Image src="/wavary-favicon-color.png" alt="hammer icon" width={35} height={35}/>
                </figure>
                <ul className="hidden lg:flex menu menu-horizontal px-1 space-x-5">
                    <li>
                        <Link href="/">
                            <button className="btn btn-ghost normal-case text-lg">Home</button>
                        </Link>
                    </li>
                    {isLogged && user.craft &&
                        <li>
                            <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost normal-case text-lg">
                                New Product
                            </label>
                        </li>
                    }
                    {isLogged &&
                        <li>
                            <Link href="#">
                                <button className="btn btn-ghost normal-case text-lg">
                                    New Request
                                </button>
                            </Link>
                        </li>
                    }
                    <li>
                        <Link href="/about">
                            <button className="btn btn-ghost normal-case text-lg">
                                About Us
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end flex -space-x-1 sm:space-x-3">
                <div className="hidden xl:block form-control xl:mr-3">
                    <input type="text" placeholder="Search" className="input input-bordered w-full"/>
                </div>
                <button className="xl:hidden btn btn-ghost btn-circle p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <button className="btn btn-ghost btn-circle p-2">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        {/*<span className="badge badge-xs badge-primary indicator-item"></span>*/}
                    </div>
                </button>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="btn btn-ghost btn-circle avatar p-1">
                        <figure className="relative rounded-full h-7 w-7 sm:h-9 sm:w-9">
                            <Image src={user.photoURL ? user.photoURL : default_profile_picture} alt="avatar icon" width={40} height={40}/>
                        </figure>
                    </div>
                    <div className="mt-3 z-[3] p-2 shadow-xl menu menu-sm dropdown-content bg-base-200 rounded-box w-52 dark:bg-gray-800">
                        <div className="divide-y w-full divide-gray-300 dark:divide-gray-700">
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                                <div className="text-lg">{user.uid ? user.name : 'Guest'}</div>
                                <div className="font-medium truncate">{user.uid ? user.email : ''}</div>
                            </div>
                            <ul tabIndex={0} className="py-2">
                                {auth.currentUser ? (
                                    <>
                                        <li>
                                            <Link href="/profile">
                                                <button className="btn btn-ghost btn-sm normal-case font-normal text-base justify-start">
                                                    Profile
                                                </button>
                                            </Link>
                                        </li>
                                        {user.craft &&
                                            <li>
                                                <Link href={`/catalog/${user.uid}`}>
                                                    <button className="btn btn-ghost btn-sm normal-case font-normal text-base justify-start">
                                                        Catalog
                                                    </button>
                                                </Link>
                                            </li>}
                                        <li>
                                            <button className="btn btn-ghost btn-sm normal-case font-normal text-base justify-start" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                        {error && <span className="error-text py-2 text-red-500">{error}</span>}
                                    </>
                                ) : (
                                    <li>
                                        <Link href="/signin">
                                            <button
                                                className="btn btn-ghost btn-sm normal-case font-normal text-base justify-start">Login
                                            </button>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;