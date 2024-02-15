import {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Link from 'next/link'
import registerWithEmailAndPassword from "../services/registerWithEmailAndPassword";
import { InputField } from "../components";
import { addUser } from "../services/user";
import {errorToast} from "../public/constants";
import {toast} from "react-toastify";

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [fetchingToken, setFetchingToken] = useState(true);
    const router = useRouter();
    const toastId = useRef(null);

    const onSubmit = (event) => {
        event.preventDefault();

        if (passwordOne === passwordTwo) {
            registerWithEmailAndPassword(fullName, email, passwordOne)
                .then((user) => {
                    addUser(fullName, email, user.uid)
                        .then(() => {
                            void router.push("/");
                        })
                        .catch((error) => {
                            // Failed to add user, set the error message
                            errorToast(error.message);
                        });
                })
                .catch((error) => {
                    // Register failed, set the error message
                    errorToast(error.message);
                });
        } else {
            errorToast("Passwords do not match!");
        }
    };

    useEffect(() => {
        // redirect if user is authenticated
        let accessToken = sessionStorage.getItem("accessToken");
        if(accessToken){
            void router.replace("/");
        } else {
            setFetchingToken(false);
        }
    }, []);

    if(fetchingToken) {
        return (
            <div className="flex flex-1 justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="overflow-x-hidden">
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Sign up</title>
                {/*<link rel="icon" href="/images/favicon.ico"/>*/}
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
                <link rel="manifest" href="/images/site.webmanifest"/>
            </Head>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={onSubmit}>
                            <h1 className="text-xl lg:text-3xl text-center font-bold">Create Free Account</h1>
                            <div className="form-control">
                                <InputField
                                    id="name-input"
                                    labelText="Full name"
                                    type="text"
                                    placeholder="Melvin Simonds"
                                    value={fullName}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        if(name.length > 20) {
                                            if(!toast.isActive(toastId.current)) {
                                                toastId.current = errorToast("Name can't be longer than 20 characters!");
                                            }
                                        } else {
                                            setFullName(name);
                                        }
                                    }}
                                />
                            </div>
                            <div className="form-control">
                                <InputField
                                    id="email-input"
                                    labelText="Email"
                                    type="email"
                                    placeholder="email@gmail.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-control">
                                <InputField
                                    id="password-input"
                                    labelText="Password"
                                    type="password"
                                    placeholder="password123"
                                    value={passwordOne}
                                    onChange={(e) => {
                                        setPasswordOne(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-control">
                                <InputField
                                    id="confirm-password-input"
                                    labelText="Confirm Password"
                                    type="password"
                                    placeholder="password123"
                                    value={passwordTwo}
                                    onChange={(e) => {
                                        setPasswordTwo(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-control">
                                <button className="btn btn-primary" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <div className="flex-shrink-0 w-full max-w-sm text-center lg:text-left px-5 lg:px-10">
                        <h1 className="text-3xl lg:text-5xl font-bold">One of us?</h1>
                        <p className="py-5 lg:py-10">If you already have an account just sign in and discover a great amount of new crafts</p>
                        <div className="form-control">
                            <Link href="/signin" className="btn btn-neutral normal-case text-lg lg:text-xl">
                                <a className="btn btn-neutral normal-case text-lg lg:text-xl">Sign In</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;