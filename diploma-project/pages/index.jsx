import React from "react";
import Head from 'next/head';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import AvatarIcon from "../components/AvatarIcon";

const Home = () => {
    return (
        <div className="overflow-x-hidden">
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
                <Carousel categoryName="New crafts" listOfItems={[<AvatarIcon key="1"/>, <AvatarIcon key="2"/>, <AvatarIcon key="3"/>, <AvatarIcon key="4"/>, <AvatarIcon key="5"/>, <AvatarIcon key="6"/>, <AvatarIcon key="7"/>, <AvatarIcon key="8"/>]}/>
                <Carousel categoryName="Other crafts" listOfItems={[<ProductCard key="1"/>, <ProductCard key="2"/>, <ProductCard key="3"/>, <ProductCard key="4"/>, <ProductCard key="5"/>, <ProductCard key="6"/>, <ProductCard key="7"/>]}/>
            </main>
            <Footer/>
        </div>
    )
}

export default Home;
