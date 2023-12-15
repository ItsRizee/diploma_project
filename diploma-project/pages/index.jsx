import dynamic from 'next/dynamic';
import {ItemsScroll, StandardLayout} from '../components'
import { newProducts, trending, discoverProducts } from "../public/constants";

const DynamicCarousel = dynamic(() => import('../components/TrendingCarousel'), {
    ssr: false, // This disables server-side rendering
    // need server-side rendering to be disabled to find if screen is touch or not in TrendingCarousel.jsx
});

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <StandardLayout page_content={
                    <main className="flex flex-col flex-1 pb-20 pt-5 space-y-10 lg:mx-36 xl:mx-72">
                        <ItemsScroll categoryName="New products" listOfItems={newProducts}/>
                        <DynamicCarousel categoryName="Trending" listOfItems={trending}/>
                        <ItemsScroll categoryName="Discover products" listOfItems={discoverProducts}/>
                        {/*<ItemsScroll categoryName="Discover crafts" listOfItems={[]}/>*/}
                    </main>
            }/>
        </div>
    )
}

export default Home;
