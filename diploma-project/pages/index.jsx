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
                <Carousel categoryName="New crafts" listOfItems={[<AvatarIcon/>, <AvatarIcon/>, <AvatarIcon/>, <AvatarIcon/>, <AvatarIcon/>, <AvatarIcon/>, <AvatarIcon/>, <AvatarIcon/>]}/>
                <Carousel categoryName="Other crafts" listOfItems={[<ProductCard/>, <ProductCard/>, <ProductCard/>, <ProductCard/>, <ProductCard/>, <ProductCard/>, <ProductCard/>]}/>
            </main>
            <Footer/>
        </div>
    )
}

export default Home;
