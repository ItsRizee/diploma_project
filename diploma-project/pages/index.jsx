import React from "react";
import Head from 'next/head';
import Navbar from "../components/navbar";

const Home = () => {
    return (
        <div className="">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Home page</title>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>
            <header>
                <Navbar></Navbar>
            </header>
        </div>
    )
}

export default Home;