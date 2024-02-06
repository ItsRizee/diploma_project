    import {ItemsScroll, ProductCard, StandardLayout, TrendingCard, TrendingCarousel} from '../components'
    import {useEffect, useState} from "react";
    import {getNewProducts, getTrendingProducts, getDiscoverProducts} from "../services/product";
    import AvatarIcon from "../components/AvatarIcon";

    const Home = ({trending, discover}) => {
        const [newProducts, setNewProducts] = useState(null);
        const [trendingProducts, setTrendingProducts] = useState(null);
        const [discoverProducts, setDiscoverProducts] = useState(null);
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

        useEffect(() => {
            let products = [];

            discover.map((product, index) => {
                products.push(<ProductCard key={index} product={product} productId={product.id} inCatalog={false}/>);
            });

            setDiscoverProducts(products);
        }, []);

        return (
            <div className="overflow-x-hidden">
                <StandardLayout title="Home page" toggleDrawerContent={toggleDrawerContent} setToggleDrawerContent={setToggleDrawerContent} page_content={newProducts && trendingProducts ?
                    <main className="flex flex-col flex-1 pb-20 pt-5 space-y-10 lg:mx-36 xl:mx-72">
                        <ItemsScroll categoryName="New products" listOfItems={newProducts} message="There aren&apos;t any new products."/>
                        <TrendingCarousel categoryName="Trending" listOfItems={trendingProducts}/>
                        <ItemsScroll categoryName="Discover products" listOfItems={discoverProducts} message="There aren&apos;t any products to discover."/>
                    </main> :
                    <div className="flex h-screen justify-center items-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                }/>
            </div>
        )
    }

    export async function getServerSideProps() {
        return Promise.all([getTrendingProducts(), getDiscoverProducts()]).then(([trendingProducts, discoverProducts]) => {

            const top5TrendingProducts = trendingProducts.sort((a, b) => b.likes.length - a.likes.length).slice(0, 5);

            return {
                props: {
                    trending: top5TrendingProducts,
                    discover: discoverProducts,
                }
            }
        });
    }

    export default Home;
