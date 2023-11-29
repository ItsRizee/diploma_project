import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Link from 'next/link'
import registerWithEmailAndPassword from "../services/registerWithEmailAndPassword";
import { InputField } from "../components";
import { addUser } from "../services/user";
import {auth} from "../firebase";

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const router = useRouter();
    const [error, setError] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();

        setError(null)

        if(passwordOne === passwordTwo) {
            registerWithEmailAndPassword(fullName, email, passwordOne)
                .then(() => {
                    addUser(fullName, email, auth.currentUser.uid)
                        .then(() => {
                            void router.push("/signin");
                        })
                        .catch((error) => {
                            // Failed to add user, set the error message
                            setError(error.message);
                        });
                })
                .catch((error) => {
                    // Register failed, set the error message
                    setError(error.message);
                });
        } else {
            setError("Passwords do not match")
        }
    };

    return (
        <div className="overflow-x-hidden">
            <Head>
                <meta charSet="UTF-8" />
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
                                    labelText="Full name"
                                    type="text"
                                    placeholder="Melvin Simonds"
                                    value={fullName}
                                    onChange={(e) => {
                                        setFullName(e.target.value);
                                        setError(null); // Reset the error state on input change
                                    }}
                                />
                            </div>
                            <div className="form-control">
                                <InputField
                                    labelText="Email"
                                    type="email"
                                    placeholder="email@gmail.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError(null); // Reset the error state on input change
                                    }}
                                />
                            </div>
                            <div className="form-control">
                                <InputField
                                    labelText="Password"
                                    type="password"
                                    placeholder="password123"
                                    value={passwordOne}
                                    onChange={(e) => {
                                        setPasswordOne(e.target.value);
                                        setError(null); // Reset the error state on input change
                                    }}
                                />
                            </div>
                            <div className="form-control">
                                <InputField
                                    labelText="Confirm Password"
                                    type="password"
                                    placeholder="password123"
                                    value={passwordTwo}
                                    onChange={(e) => {
                                        setPasswordTwo(e.target.value);
                                        setError(null); // Reset the error state on input change
                                    }}
                                />
                            </div>
                            {error && <span className="error-text py-2 text-red-500">{error}</span>}
                            <div className={`form-control ${error ? 'mt-2' : 'mt-6'}`}>
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
    )
}

export default SignUp;