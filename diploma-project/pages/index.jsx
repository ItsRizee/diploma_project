import dynamic from 'next/dynamic';
import {ItemsScroll, StandardLayout, TrendingCard} from '../components'
import { discoverProducts } from "../public/constants";
import {useEffect, useState} from "react";
import {getNewProducts, getTrendingProducts} from "../services/product";
import AvatarIcon from "../components/AvatarIcon";

const DynamicCarousel = dynamic(() => import('../components/TrendingCarousel'), {
    ssr: false, // This disables server-side rendering
    // need server-side rendering to be disabled to find if screen is touch or not in TrendingCarousel.jsx
});

const Home = ({trending, discover}) => {
    const [newProducts, setNewProducts] = useState(null);
    const [trendingProducts, setTrendingProducts] = useState(null);
    const [toggleDrawerContent, setToggleDrawerContent] = useState(true);

    useEffect(() => {
        getNewProducts().then((newProductsData) => {
            let products = [];

            newProductsData.map((item, index) => {
                    products.push(<AvatarIcon key={index} img={item.photoURL} username={item.name} catalogHref={`/catalog/${item.userID}`} productHref={`/product/${item.productID}`}/>);
            });

            setNewProducts(products);
        });
    }, []);

    useEffect(() => {
        let products = [];

        trending.map((product, index) => {
            products.push(<TrendingCard key={index} product={product}/>);
        });

        setTrendingProducts(products);
    }, []);

    return (
        <div className="overflow-x-hidden">
            <StandardLayout title="Home page" toggleDrawerContent={toggleDrawerContent} setToggleDrawerContent={setToggleDrawerContent} page_content={newProducts && trendingProducts ?
                <main className="flex flex-col flex-1 pb-20 pt-5 space-y-10 lg:mx-36 xl:mx-72">
                    <ItemsScroll categoryName="New products" listOfItems={newProducts}/>
                    <DynamicCarousel categoryName="Trending" listOfItems={trendingProducts}/>
                    <ItemsScroll categoryName="Discover products" listOfItems={discoverProducts}/>
                </main> :
                <div className="flex h-screen justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }/>
        </div>
    )
}

export async function getServerSideProps() {
    return Promise.all([getTrendingProducts()]).then(([trendingProducts]) => {

        const top5TrendingProducts = trendingProducts.sort((a, b) => b.likes.length - a.likes.length).slice(0, 5);

        return {
            props: {
                trending: top5TrendingProducts,
                discover: []
            }
        }
    });

    // return {
    //     notFound: true,
    // }

    // return {
    //     props: {
    //         craftsman: jsonUser,
    //     }
    // }
}

export default Home;
