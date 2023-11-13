import {useState} from "react";
import {app_name} from "../constants";
import {useRouter} from "next/router";
import {auth} from "../firebase";
import Link from "next/link";
import logOut from "../services/logOut";
import Image from "next/future/image";

const Navbar = () => {
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogout = async () => {
        setError(null);

        const errorMessage = await logOut();

        if (errorMessage === null) {
            // Logout was successful, navigate to the signIn page
            await router.push("/signin");
        } else {
            // Logout failed, set the error message
            setError(errorMessage);
        }
    };

    return (
        <div className="navbar bg-none space-x-4">
            <div className="navbar-start xl:block xl:items-center">
                <div className="dropdown lg:hidden">
                    <div tabIndex={0} className="btn btn-ghost btn-circle scale-75 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-200 dark:bg-gray-800 rounded-box w-36">
                        <li><div className="text-base"><Link href="/">Home</Link></div></li>
                        <li><div className="text-base"><Link href="#">New stage</Link></div></li>
                        <li><div className="text-base"><Link href="#">New product</Link></div></li>
                        <li><div className="text-base"><Link href="#">About us</Link></div></li>
                    </ul>
                </div>
                <h1 className="hidden lg:flex font-bold text-xl sm:text-3xl lg:ml-5">{app_name}</h1>
            </div>
            <div className="navbar-center items-start">
                <h1 className="lg:hidden font-bold text-xl sm:text-3xl">{app_name}</h1>
                <ul className="hidden lg:flex menu menu-horizontal px-1 space-x-5">
                    <li><div className="text-base"><Link href="/">Home</Link></div></li>
                    <li><div className="text-base"><Link href="#">New stage</Link></div></li>
                    <li><div className="text-base"><Link href="#">New product</Link></div></li>
                    <li><div className="text-base"><Link href="#">About us</Link></div></li>
                </ul>
            </div>
            <div className="navbar-end flex">
                <div className="hidden xl:block form-control xl:mr-3">
                    <input type="text" placeholder="Search" className="input input-bordered w-full" />
                </div>
                <button className="xl:hidden btn btn-ghost btn-circle scale-75 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <button className="btn btn-ghost btn-circle scale-75 p-2">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        {/*<span className="badge badge-xs badge-primary indicator-item"></span>*/}
                    </div>
                </button>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="btn btn-ghost btn-circle avatar scale-75 p-1">
                        <figure className="relative rounded-full">
                            <Image src="/profile_picture.png" alt="avatar icon" width={40} height={40}/>
                        </figure>
                    </div>
                    <div className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-200 rounded-box w-52 dark:bg-gray-800">
                        <div className="divide-y w-full divide-gray-300 dark:divide-gray-700">
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                                <div className="text-lg">{auth.currentUser ? auth.currentUser.displayName : 'Guest'}</div>
                                <div className="font-medium truncate">{auth.currentUser ? auth.currentUser.email : ''}</div>
                            </div>
                            <ul tabIndex={0} className="py-2">
                                {auth.currentUser ? (
                                    <>
                                        <li><div className="text-base"><Link href="/profile">Profile</Link></div></li>
                                        <li><div className="text-base" onClick={handleLogout}><Link href="#">Logout</Link></div></li>
                                    </>
                                ) : (
                                    <li><div className="text-base"><Link href="/signin">Login</Link></div></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;