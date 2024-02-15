import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import loginWithEmailAndPassword from '../services/logInWithEmailAndPassword';
import { InputField } from "../components";
import { errorToast } from "../public/constants"

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fetchingToken, setFetchingToken] = useState(true);
    const router = useRouter();

    const onSubmit = (event) => {
        event.preventDefault();

        loginWithEmailAndPassword(email, password)
            .then(() => {
                // Login is successful
                void router.push('/');
            })
            .catch((error) => {
                // Login failed, set the error message
                errorToast(error.message);
            });
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
                            <InputField
                                id="password-input"
                                labelText="Password"
                                type="password"
                                placeholder="password123"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <div className="form-control">
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
