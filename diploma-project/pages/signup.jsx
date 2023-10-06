import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Link from 'next/link'
import registerWithEmailAndPassword from "../services/registerWithEmailAndPassword";

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const router = useRouter();
    const [error, setError] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();

        setError(null)

        if(passwordOne === passwordTwo) {
            const errorMessage = await registerWithEmailAndPassword(fullName, email, passwordOne);

            if (errorMessage === null) {
                // Register was successful, navigate to the signIn page
                await router.push("/signin");
            } else {
                // Register failed, set the error message
                setError(errorMessage);
            }
        } else {
            setError("Password do not match")
        }
    };

    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Sign up</title>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={onSubmit}>
                            <h1 className="text-3xl font-bold">Create Free Account</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="full name"
                                    value={fullName}
                                    className="input input-bordered"
                                    required
                                    onChange={(e) => {
                                        setFullName(e.target.value);
                                        setError(false); // Reset the error state on input change
                                    }}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    value={email}
                                    className="input input-bordered"
                                    required
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError(false); // Reset the error state on input change
                                    }}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    value={passwordOne}
                                    className="input input-bordered"
                                    required
                                    onChange={(e) => {
                                        setPasswordOne(e.target.value);
                                        setError(false); // Reset the error state on input change
                                    }}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="confirm password"
                                    value={passwordTwo}
                                    className="input input-bordered"
                                    required
                                    onChange={(e) => {
                                        setPasswordTwo(e.target.value);
                                        setError(false); // Reset the error state on input change
                                    }}
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <div className="text-center lg:text-left px-10">
                        <h1 className="text-5xl font-bold">One of us?</h1>
                        <p className="py-10">If you already have an account just sign in and discover a great amount of new crafts</p>
                        <div className="form-control">
                            <Link className="btn btn-neutral normal-case text-xl" href="/signin">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;