import {StandardLayout} from "../../components";
import {default_profile_picture} from "../../public/constants";
import Image from "next/future/image";
import {useEffect, useState} from "react";
import {getCatalog, Product} from "../../services/product";
import {ProductCard} from "../../components";
import {useRouter} from "next/router";
import {getUserById} from "../../services/user";

const Catalog = ({user}) => {
    const [products, setProducts] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getCatalog(user.email).then((catalog) => {
            setProducts(
                catalog.map((product) => (
                    new Product(
                        product.title,
                        product.description,
                        product.displayImageURL,
                        product.owner,
                        product.createdDate,
                        product.tags
                    )
                ))
            );
        });
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
            <StandardLayout title="Catalog page" page_content={products ?
                <main
                    className="flex flex-col flex-1 my-10 space-y-5 mx-5 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-52 2xl:mx-72 justify-center items-center">
                    <div className="flex flex-col flex-1 mb-5 mt-10 space-y-10">
                        <div className="mb-5">
                            <figure className="relative rounded-full flex justify-center mb-2">
                                <Image src={user.photoURL ? user.photoURL : default_profile_picture} alt="avatar icon"
                                       width={96} height={96}/>
                            </figure>
                            <div className="text-xl text-center">{user.name}</div>
                        </div>
                        { products.length !== 0 ?
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-10">
                                {products.map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        product={product}
                                        inCatalog={true}
                                        productId={user.catalog[index]}
                                    />
                                ))}
                            </div> :
                            <div className="flex flex-col justify-center items-center space-y-5">
                                <Image className="opacity-60" src="/questionable_man.png" alt="Some craftsman thinking" width={221} height={242}/>
                                <p className="text-center opacity-60">This craftsman doesn&apos;t have any products</p>
                            </div>
                        }
                    </div>
                </main> :
                <div className="flex flex-1 justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }/>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    return getUserById(params.id).then((userData) => {
        // if user is not a craftsman return notFound - 404 page
        if(userData.catalog !== null) {
            const jsonUser = {
                name: userData.name,
                email: userData.email,
                photoURL: userData.photoURL,
                uid: userData.uid,
                interests: userData.interests,
                requests: userData.requests,
                craft: userData.craft,
                orders: userData.orders,
                catalog: userData.catalog
            }

            return {
                props: {
                    user: jsonUser,
                }
            }
        } else {
            return {
                notFound: true,
            }
        }
    });
}


export default Catalog;