import Image from "next/future/image";
import {default_profile_picture, errorToast} from "../public/constants";
import {useEffect, useState} from "react";
import {getUserById, User} from "../services/user";
import {updateLikesOfProduct} from "../services/product";
import {Timestamp} from "firebase/firestore";
import Link from "next/link";
import {useUserStore} from "../store/userStorage";

const ProductCard = ({product, inCatalog = false, productId}) => {
    const { currentUser, setCurrentUser } = useUserStore((state) => ({currentUser: state.user, setCurrentUser: state.setUser}));
    const [isNew, setIsNew] = useState(false);
    const [owner, setOwner] = useState(new User());
    const [isLiked, setIsLiked] = useState(product.likes.includes(currentUser.uid));

    const onLike = () => {
        let interests;

        if(isLiked){
            product.likes = product.likes.filter(uid => uid !== currentUser.uid);
            interests = currentUser.interests.filter(id => id !== productId);
        } else {
            product.likes.push(currentUser.uid);
            interests = [...currentUser.interests, productId];
        }

        updateLikesOfProduct(productId, product.likes)
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
        const timeDifference = Timestamp.now().toMillis() - (typeof product.createdDate === 'number' ? product.createdDate : product.createdDate.toMillis());
        if (timeDifference < 24 * 60 * 60 * 1000) {
            setIsNew(true);
        }
    }, [product.createdDate]);

    useEffect(() => {
        getUserById(product.owner).then((user) => {
            setOwner(user);
        });
    }, [product.owner]);

    return (
        <article className="card card-bordered border-b-gray-400 w-60 lg:w-80 h-full bg-base-100 shadow-md">
            <figure className="relative h-60">
                <p className="badge rounded-badge badge-lg absolute bottom-3 left-3 text-xl bg-base-100">
                    {product.price} €
                </p>
                {isNew && <div className="badge badge-secondary badge-lg font-bold text-white absolute right-3 bottom-3">NEW</div>}
                <Image src={product.displayImageURL} alt="Silver ring" className="h-full w-full object-cover" layout="responsive" width={350} height={233}/>
            </figure>
            <div className="card-body">
                <h3 className="absolute card-title justify-between w-4/5 pr-10">
                    <p className="text-start">
                        {product.title}
                    </p>
                    { currentUser.uid && currentUser.uid !== product.owner &&
                        <button className="transition-transform transform hover:scale-110 absolute top-0.5 right-0" onClick={onLike}>
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
                </h3>
                <div className="h-full justify-start flex-wrap mt-20">
                    {product.tags.map((item, index) => (
                        <div key={index} className="badge badge-outline whitespace-nowrap mb-3 mr-3 p-3">
                            {item}
                        </div>
                    ))}
                    {product.tags.length === 0 &&
                        <p className="flex-1 opacity-60">
                            There are no tags for this product.
                        </p>
                    }
                </div>
                {!inCatalog &&
                    <div className="flex items-center mt-4 space-x-4">
                        <Link tabIndex={0} href={`/catalog/${owner.uid}`}>
                            <figure className="relative btn btn-ghost btn-circle avatar rounded-full">
                                <Image src={owner.photoURL ? owner.photoURL : default_profile_picture} className="rounded-full" alt="avatar icon" width={40} height={40}/>
                            </figure>
                        </Link>
                        <p className="font-normal normal-case">{owner.name}</p>
                    </div>
                }
                <div className="card-actions justify-end">
                    <Link href={`/product/${product.id}`}>
                        <button className="btn btn-sm btn-primary">
                            More
                        </button>
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default ProductCard;
