import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Navbar, Footer, ItemsScroll } from '../components'
import { newProducts, trending, discoverProducts } from "../public/constants";

const DynamicCarousel = dynamic(() => import('../components/TrendingCarousel'), {
    ssr: false, // This disables server-side rendering
    // need server-side rendering to be disabled to find if screen is touch or not in TrendingCarousel.jsx
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
            <main className="pb-20 pt-5 space-y-10 lg:mx-36 xl:mx-72">
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
