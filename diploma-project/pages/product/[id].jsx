import {StandardLayout} from "../../components";
import {getProduct, updateLikesOfProduct} from "../../services/product";
import {useRouter} from "next/router";
import Image from "next/image";
import {default_profile_picture, errorToast} from "../../public/constants";
import {getUserById, User} from "../../services/user";
import {useEffect, useState} from "react";
import {Timeline} from "../../components";
import Link from "next/link";
import {useUserStore} from "../../store/userStorage";

const Product = ({product}) => {
    const { currentUser, setCurrentUser } = useUserStore((state) => ({currentUser: state.user, setCurrentUser: state.setUser}));
    const [isLiked, setIsLiked] = useState(null);
    const [owner, setOwner] = useState(new User());
    const [toggleDrawerContent, setToggleDrawerContent] = useState(true);
    const router = useRouter();

    const onLike = () => {
        let interests;

        if(isLiked){
            product.likes = product.likes.filter(uid => uid !== currentUser.uid);
            interests = currentUser.interests.filter(id => id !== product.id);
        } else {
            product.likes.push(currentUser.uid);
            interests = [...currentUser.interests, product.id];
        }

        updateLikesOfProduct(product.id, product.likes)
            .then(() => {
                setCurrentUser({
                    name: currentUser.name,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    uid: currentUser.uid,
                    interests: interests,
                    requests: currentUser.requests,
                    craft: currentUser.craft,
                    orders : currentUser.orders,
                    catalog: currentUser.catalog,
                    followers: currentUser.followers,
                });
                setIsLiked(() => !isLiked);
            })
            .catch((error) => {
                errorToast(error.message);
            });
    };

    useEffect(() => {
        setIsLiked(product.likes.includes(currentUser.uid));
    }, [currentUser]);

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
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-bold">{product.title}</h1>
                                { currentUser.uid &&
                                    <button className="transition-transform transform hover:scale-110" onClick={onLike}>
                                        {isLiked ?
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                 className="w-6 h-6 text-red-600">
                                                <path
                                                    d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                                            </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                 stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                                            </svg>
                                        }
                                    </button>
                                }
                            </div>
                            <p>{product.description}</p>
                            <div className="flex flex-wrap justify-center">
                                {product.tags.map((item, index) => (
                                    <div key={index} className="badge badge-outline whitespace-nowrap mb-3 mr-3 p-3">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-10 sm:space-y-0">
                                <p className="flex items-center text-3xl font-bold">{product.price} €</p>
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
                likes: product.likes,
                id: params.id,
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