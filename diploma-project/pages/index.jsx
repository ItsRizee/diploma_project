import React from "react";
import Head from 'next/head';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemsScroll from "../components/ItemsScroll";
import dynamic from 'next/dynamic';
import { newProducts, trending, discoverProducts } from "../public/constants";

const DynamicCarousel = dynamic(() => import('../components/TrendingCarousel'), {
    ssr: false, // This disables server-side rendering
});

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
            <main className="pb-20 pt-5 space-y-10 xl:mx-72">
                <ItemsScroll categoryName="New products" listOfItems={newProducts}/>
                <DynamicCarousel categoryName="Trending" listOfItems={trending}/>
                <ItemsScroll categoryName="Discover products" listOfItems={discoverProducts}/>
                {/*<ItemsScroll categoryName="Discover crafts" listOfItems={[]}/>*/}
            </main>
            <Footer/>
        </div>
    )
}

export default Home;
