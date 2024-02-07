import {StandardLayout} from "../../components";
import {getProduct} from "../../services/product";
import {useRouter} from "next/router";
import Image from "next/image";
import {default_profile_picture} from "../../public/constants";
import {getUserById, User} from "../../services/user";
import {useEffect, useState} from "react";
import {Timeline} from "../../components";
import Link from "next/link";

const Product = ({product}) => {
    const [owner, setOwner] = useState(new User());
    const [toggleDrawerContent, setToggleDrawerContent] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getUserById(product.owner).then((user) => {
            setOwner(user);
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
            <StandardLayout title="Product page" toggleDrawerContent={toggleDrawerContent} setToggleDrawerContent={setToggleDrawerContent} page_content={
                <main className="flex flex-col flex-1 justify-center pb-20 pt-5 space-y-20">
                    <section className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:space-x-10">
                        <figure className="w-4/5 md:w-3/6 xl:w-1/3 shadow-2xl rounded-xl">
                            <Image src={product.displayImageURL} className="h-full w-full object-cover rounded-xl" alt="This is the display picture" layout="responsive" width={350} height={233} />
                        </figure>
                        <div className="flex flex-col space-y-10 w-2/3 md:w-2/6">
                            <h1 className="text-2xl font-bold">{product.title}</h1>
                            <p>{product.description}</p>
                            <div className="flex flex-wrap">
                                {product.tags.map((item, index) => (
                                    <div key={index} className="badge badge-outline whitespace-nowrap mb-3 mr-3 p-3">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <p className="flex items-center text-xl sm:text-3xl font-bold">{product.price} €</p>
                                <div className="flex items-center space-x-1 sm:space-x-4">
                                    <Link tabIndex={0} href={`/catalog/${owner.uid}`}>
                                        <figure className="relative btn btn-ghost btn-circle avatar rounded-full">
                                            <Image src={owner.photoURL ? owner.photoURL : default_profile_picture} className="rounded-full" alt="avatar icon" width={40} height={40}/>
                                        </figure>
                                    </Link>
                                    <p className="font-normal normal-case">{owner.name}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="flex justify-center w-full">
                        <div className="flex justify-center w-2/3">
                            <Timeline timeline={product.timeline} />
                        </div>
                    </section>
                </main>
            }/>
        </div>
    );
}

export async function getServerSideProps({params}) {
    return getProduct(params.id).then((product) => {
        // if product doesn't exist return notFound - 404 page
        if (product !== null) {
            const jsonProduct = {
                title: product.title,
                description: product.description,
                displayImageURL: product.displayImageURL,
                price: product.price,
                owner: product.owner,
                tags: product.tags,
                timeline: product.timeline,
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