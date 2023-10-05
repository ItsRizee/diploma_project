import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
import Head from "next/head";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState(null);

    const onSubmit = event => {
        setError(null)
        //check if passwords match. If they do, create user in Firebase
        // and redirect to your logged in page.
        createUserWithEmailAndPassword(auth, email, password)
            .then(authUser => {
                router.push("/");
            })
            .catch(error => {
                // An error occurred. Set error message to be displayed to user
                setError(error.message)
            });

        event.preventDefault();
    };

    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Sign in</title>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left px-10">
                        <h1 className="text-5xl font-bold">New here?</h1>
                        <p className="py-10">Sign up and discover a great amount of new crafts and opportunities</p>
                        <div className="form-control">
                            <a className="btn btn-neutral normal-case text-xl" href="/signup">Sign Up</a>
                        </div>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={onSubmit}>
                            <h1 className="text-3xl font-bold">Login to Your Account</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;