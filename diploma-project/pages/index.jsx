import React from "react";
import Head from 'next/head';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import AvatarIcon from "../components/AvatarIcon";
import ItemsScroll from "../components/ItemsScroll";
import TrendingCarousel from "../components/TrendingCarousel";
import TrendingCard from "../components/TrendingCard";

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
            <main className="pb-20 pt-5 space-y-10 xl:mx-52">
                <ItemsScroll categoryName="New products" listOfItems={[<AvatarIcon key="1" img="/profile_picture.png" username="Ivan"/>, <AvatarIcon key="2" img="/profile_picture.png" username="Tihomir"/>, <AvatarIcon key="3" img="/profile_picture.png" username="Martin"/>, <AvatarIcon key="4" img="/profile_picture.png" username="Galena"/>, <AvatarIcon key="5" img="/profile_picture.png" username="Raya"/>, <AvatarIcon key="6" img="/profile_picture.png" username="Plamen"/>, <AvatarIcon key="7" img="/profile_picture.png" username="Lachezar"/>, <AvatarIcon key="8" img="/profile_picture.png" username="Kiril"/>, <AvatarIcon key="9" img="/profile_picture.png" username="Ivan"/>, <AvatarIcon key="10" img="/profile_picture.png" username="Tihomir"/>, <AvatarIcon key="11" img="/profile_picture.png" username="Martin"/>, <AvatarIcon key="12" img="/profile_picture.png" username="Galena"/>, <AvatarIcon key="13" img="/profile_picture.png" username="Raya"/>, <AvatarIcon key="14" img="/profile_picture.png" username="Plamen"/>, <AvatarIcon key="15" img="/profile_picture.png" username="Lachezar"/>, <AvatarIcon key="16" img="/profile_picture.png" username="Kiril"/>]}/>
                <TrendingCarousel categoryName="Trending" listOfItems={[<TrendingCard key="1"/>, <TrendingCard key="2"/>, <TrendingCard key="3"/>]}/>
                <ItemsScroll categoryName="Discover products" listOfItems={[<ProductCard key="0"/>, <ProductCard key="1"/>, <ProductCard key="2"/>, <ProductCard key="3"/>, <ProductCard key="4"/>, <ProductCard key="5"/>, <ProductCard key="6"/>, <ProductCard key="7"/>, <ProductCard key="8"/>, <ProductCard key="9"/>]}/>
                {/*<ItemsScroll categoryName="Discover crafts" listOfItems={[]}/>*/}
            </main>
            <Footer/>
        </div>
    )
}

export default Home;
