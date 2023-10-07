import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import loginWithEmailAndPassword from '../services/logInWithEmailAndPassword';
import InputField from "../components/InputField";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();

        setError(null);

        const errorMessage = await loginWithEmailAndPassword(email, password);

        if (errorMessage === null) {
            // Login was successful, navigate to the index page
            await router.push('/');
        } else {
            // Login failed, set the error message
            setError(errorMessage);
        }
    };

    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Sign in</title>
            </Head>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left px-10">
                        <h1 className="text-5xl font-bold">New here?</h1>
                        <p className="py-10">Sign up and discover a great amount of new crafts and opportunities</p>
                        <div className="form-control">
                            <Link className="btn btn-neutral normal-case text-xl" href="/signup">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={onSubmit}>
                            <h1 className="text-3xl font-bold">Login to Your Account</h1>
                            {/* Use the InputField component */}
                            <InputField
                                labelText="Email"
                                type="email"
                                placeholder="email@gmail.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError(null); // Reset the error state on input change
                                }}
                                error={error}
                            />
                            <InputField
                                labelText="Password"
                                type="password"
                                placeholder="password123"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(null); // Reset the error state on input change
                                }}
                                error={error}
                            />
                            {error && <span className="error-text py-2 text-red-500">{error}</span>}
                            <div className={`form-control ${error ? 'mt-2' : 'mt-6'}`}>
                                <button className="btn btn-primary" type="submit">
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
