import {StandardLayout} from "../../components";
import {useEffect} from "react";
import {getProduct} from "../../services/product";
import {useRouter} from "next/router";

const Product = ({product}) => {
    const router = useRouter();

    useEffect(() => {

    }, []);

    if(router.isFallback) {
        return (
            <div className="flex h-screen justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <StandardLayout title="Product page" page_content={
                <main>

                </main>
            }/>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    return getProduct(params.id).then((product) => {
        // if product doesn't exist return notFound - 404 page
        if(product !== null) {
            const jsonProduct = {
                title: product.title,
                description: product.description,
                displayImageURL: product.displayImageURL,
                owner: product.owner
            }

            return {
                props: {
                    product: jsonProduct,
                }
            }
        } else {
            return {
                notFound: true,
            }
        }
    });
}


export default Product;