import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import loginWithEmailAndPassword from '../services/logInWithEmailAndPassword';
import { InputField } from "../components";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();

        setError(null);

        loginWithEmailAndPassword(email, password)
            .then(() => {
                // Login is successful
                void router.push('/');
            })
            .catch((error) => {
                // Login failed, set the error message
                setError(error.message);
            });
    };

    return (
        <div className="overflow-x-hidden">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Sign in</title>
                {/*<link rel="icon" href="/images/favicon.ico"/>*/}
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
                <link rel="manifest" href="/images/site.webmanifest"/>
            </Head>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="flex-shrink-0 w-full max-w-sm text-center lg:text-left px-5 lg:px-10">
                        <h1 className="text-3xl lg:text-5xl font-bold">New here?</h1>
                        <p className="py-5 lg:py-10">Sign up and discover a great amount of new crafts and opportunities</p>
                        <div className="form-control">
                            <Link className="btn btn-neutral normal-case text-lg lg:text-xl" href="/signup">
                                <a className="btn btn-neutral normal-case text-lg lg:text-xl"> Sign Up </a>
                            </Link>
                        </div>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={onSubmit}>
                            <h1 className="text-xl lg:text-3xl text-center font-bold">Login to Your Account</h1>
                            {/* Use the InputField component */}
                            <InputField
                                id="email-input"
                                labelText="Email"
                                type="email"
                                placeholder="email@gmail.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError(null); // Reset the error state on input change
                                }}
                            />
                            <InputField
                                id="password-input"
                                labelText="Password"
                                type="password"
                                placeholder="password123"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(null); // Reset the error state on input change
                                }}
                            />
                            {error && <span className="error-text py-2 text-error">{error}</span>}
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
