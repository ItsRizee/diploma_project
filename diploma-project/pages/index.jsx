import dynamic from 'next/dynamic';
import {ItemsScroll, StandardLayout} from '../components'
import { trending, discoverProducts } from "../public/constants";
import {useEffect, useState} from "react";
import {getAllCraftsman} from "../services/user";
import AvatarIcon from "../components/AvatarIcon";

const DynamicCarousel = dynamic(() => import('../components/TrendingCarousel'), {
    ssr: false, // This disables server-side rendering
    // need server-side rendering to be disabled to find if screen is touch or not in TrendingCarousel.jsx
});

const Home = () => {
    const [newProducts, setNewProducts] = useState(null);

    useEffect(() => {
        getAllCraftsman().then((usersData) => {
            let products = [];

            usersData.map((user, index) => {
                    products.push(<AvatarIcon key={index} img={user.photoURL} username={user.name} catalogHref={`/catalog/${user.uid}`}/>);
            });

            setNewProducts(products);
        });
    }, []);

    return (
        <div className="overflow-x-hidden">
            <StandardLayout title="Home page" page_content={ newProducts &&
                    <main className="flex flex-col flex-1 pb-20 pt-5 space-y-10 lg:mx-36 xl:mx-72">
                        <ItemsScroll categoryName="New products" listOfItems={newProducts}/>
                        <DynamicCarousel categoryName="Trending" listOfItems={trending}/>
                        <ItemsScroll categoryName="Discover products" listOfItems={discoverProducts}/>
                    </main>
            }/>
        </div>
    )
}

export default Home;
