import React from "react";
import Head from 'next/head';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

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
                <Navbar/>
            </header>
            <main className="pb-20">
                <Carousel categoryName="Suggested"/>
                <Carousel categoryName="Other crafts"/>
            </main>
            <Footer/>
        </div>
    )
}

export default Home;