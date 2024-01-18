import React, {useEffect, useRef, useState} from "react";
import {app_name, default_profile_picture} from "../public/constants";
import {useRouter} from "next/router";
import {auth} from "../firebase";
import Link from "next/link";
import logOut from "../services/logOut";
import Image from "next/future/image";
import { useUserStore } from "../store/userStorage";
import useTheme from "next-theme";

const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useUserStore((state) => ({user: state.user}));
    const router = useRouter();
    const themeToggleRef = useRef(null);
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

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
        if (themeToggleRef.current) {
            themeToggleRef.current.checked = theme !== 'dark';
        }

        let accessToken = sessionStorage.getItem("accessToken");
        if(accessToken !== ''){
            setIsLogged(true);
        }
    }, [user, theme]);

    return (
        <nav className="navbar flex-none bg-none space-x-4 sm:px-5">
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <div tabIndex={0} className="btn btn-ghost btn-circle p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[3] p-2 shadow-xl bg-base-300 rounded-box w-36">
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
            <div className="navbar-end flex space-x-1 sm:space-x-3">
                <div className="hidden xl:block form-control xl:mr-3">
                    <input type="text" placeholder="Search" className="input input-bordered w-full"/>
                </div>
                <button className="xl:hidden btn btn-ghost btn-circle p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-9 sm:w-9" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </button>
                <label className="swap swap-rotate">
                    <input type="checkbox" onClick={toggleTheme} ref={themeToggleRef}/>
                    <svg className="swap-on fill-current w-7 h-7 sm:w-9 sm:h-9" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                    </svg>
                    <svg className="swap-off fill-current w-7 h-7 sm:w-9 sm:h-9" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                    </svg>
                </label>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="btn btn-ghost btn-circle avatar p-1">
                        <figure className="relative rounded-full h-7 w-7 sm:h-9 sm:w-9">
                            <Image src={user.photoURL ? user.photoURL : default_profile_picture} alt="avatar icon"
                                   width={40} height={40}/>
                        </figure>
                    </div>
                    <div
                        className="mt-3 z-[3] p-2 shadow-xl menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
                        <div className="divide-y w-full divide-base-content">
                            <div className="px-4 py-3 text-base-content text-sm">
                                <div className="text-lg">{user.uid ? user.name : 'Guest'}</div>
                                <div className="font-medium truncate">{user.uid ? user.email : ''}</div>
                            </div>
                            <ul tabIndex={0} className="py-2">
                                {auth.currentUser ? (
                                    <>
                                        <li>
                                            <Link href="/profile">
                                                <button
                                                    className="btn btn-ghost btn-sm normal-case font-normal text-base justify-start">
                                                    Profile
                                                </button>
                                            </Link>
                                        </li>
                                        {user.craft &&
                                            <li>
                                                <Link href={`/catalog/${user.uid}`}>
                                                    <button
                                                        className="btn btn-ghost btn-sm normal-case font-normal text-base justify-start">
                                                        Catalog
                                                    </button>
                                                </Link>
                                            </li>}
                                        <li>
                                            <button
                                                className="btn btn-ghost btn-sm normal-case font-normal text-base justify-start"
                                                onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                        {error && <span className="error-text py-2 text-error">{error}</span>}
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
        </nav>
    )
}

export default Navbar;