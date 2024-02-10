import {StandardLayout} from "../../components";
import {default_profile_picture, errorToast, successToast} from "../../public/constants";
import Image from "next/future/image";
import {useEffect, useState} from "react";
import {getCatalog} from "../../services/product";
import {ProductCard} from "../../components";
import {useRouter} from "next/router";
import {getUserById, UpdateFollowers} from "../../services/user";
import {useUserStore} from "../../store/userStorage";

const Catalog = ({craftsman}) => {
    const { currentUser } = useUserStore((state) => ({currentUser: state.user}));
    const [isLogged, setIsLogged] = useState(false);
    const [products, setProducts] = useState(null);
    const [toggleDrawerContent, setToggleDrawerContent] = useState(true);
    const [isFollower, setIsFollower] = useState(null);
    const router = useRouter();

    const onFollow = () => {
        let followers = [...craftsman.followers];
        if(isFollower) {
            followers = followers.filter((uid) => uid !== currentUser.uid);
        } else {
            followers.push(currentUser.uid);
        }

        UpdateFollowers(craftsman.uid, followers)
            .then(() => {
                successToast(`Successfully ${isFollower ? "unfollowed" : "followed"} ${craftsman.name}!`);
                setIsFollower(() => !isFollower);
            })
            .catch(() => {
                errorToast(`Error: Couldn't ${isFollower ? "unfollow" : "follow"} ${craftsman.name}! Refresh the page and try again!`);
        });
    }

    useEffect(() => {
        getCatalog(craftsman).then((catalog) => {
            setProducts(catalog);
        });
    }, []);

    useEffect(() => {
        setIsFollower(craftsman.followers.includes(currentUser.uid));
        let accessToken = sessionStorage.getItem("accessToken");
        if(accessToken !== ''){
            setIsLogged(true);
        }
    }, [currentUser]);

    if(router.isFallback) {
        return (
            <div className="flex h-screen justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <StandardLayout title="Catalog page" craftsman={craftsman} toggleDrawerContent={toggleDrawerContent} setToggleDrawerContent={setToggleDrawerContent} page_content={products ?
                <main
                    className="flex flex-col flex-1 my-10 space-y-5 mx-5 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-52 2xl:mx-72 justify-center items-center">
                    <div className="flex flex-col flex-1 mb-5 mt-10 space-y-10 items-center">
                        <div className="mb-5">
                            <div className="relative flex justify-center mb-2">
                                <figure className="h-24 w-24">
                                    <Image
                                        src={craftsman.photoURL ? craftsman.photoURL : default_profile_picture}
                                        alt="avatar icon"
                                        className="h-full w-full object-cover rounded-full" layout="responsive"
                                        width={96} height={96}/>
                                </figure>
                            </div>
                            <div className="text-xl text-center">{craftsman.name}</div>
                            <div className="text-lg text-center opacity-60">{craftsman.followers.length} followers</div>
                            {isLogged && craftsman.uid !== currentUser.uid &&
                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-x-3 sm:space-y-0 mt-5">
                                    <label htmlFor="my-drawer" className="drawer-button bg-base-300 btn btn-lg w-44"
                                           onClick={() => setToggleDrawerContent(false)}>
                                        New Request
                                    </label>
                                    <button className="btn btn-lg bg-base-300 w-44" onClick={onFollow}>
                                        {isFollower ? "Unfollow" : "Follow"}
                                    </button>
                                </div>
                            }
                        </div>
                        {products.length !== 0 ?
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 sm:gap-x-5 2xl:gap-x-16 gap-y-16">
                                {products.map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        product={product}
                                        inCatalog={true}
                                        productId={product.id}
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
        if(userData.craft !== null) {
            const jsonUser = {
                name: userData.name,
                email: userData.email,
                photoURL: userData.photoURL,
                uid: userData.uid,
                craft: userData.craft,
                followers: userData.followers,
                interests: [],
                requests: [],
                orders: [],
                catalog: [],
            }

            return {
                props: {
                    craftsman: jsonUser,
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