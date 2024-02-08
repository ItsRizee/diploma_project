import {useEffect, useState} from "react";
import Image from "next/future/image";
import {UpdateProfileToCraftsman} from "../services/user";
import {ItemsScroll, Collapse, UploadImageModal, StandardLayout, ProductCard, RequestCard} from '../components';
import {default_profile_picture} from "../public/constants";
import {useRouter} from "next/router";
import {useUserStore} from "../store/userStorage";
import {getInterests} from "../services/product";
import {getOrders, getRequests} from "../services/request";
import {successToast, errorToast} from "../public/constants";

const Profile = () => {
    const { currentUser, setCurrentUser } = useUserStore((state) => ({currentUser: state.user, setCurrentUser: state.setUser}));
    const [toggleDrawerContent, setToggleDrawerContent] = useState(true);
    const [firstRender, setFirstRender] = useState(true);
    const [interests, setInterests] = useState([]);
    const [requests, setRequests] = useState([]);
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    const BecomeCraftsman = () => {
        UpdateProfileToCraftsman("woodcarver")
            .then(() => {
                successToast("Successfully became a craftsman!");
            })
            .catch(() => {
                errorToast("Error: Couldn't become a craftsman! Refresh the page and try again!");
        });
    };

    useEffect(() => {
        // redirect if user is not authenticated
        let accessToken = sessionStorage.getItem("accessToken");
        if(!accessToken && currentUser.uid){
            void router.replace("/");
        }

        if(currentUser.uid !== null && firstRender) {
            Promise.all([getInterests(currentUser), getRequests(currentUser), getOrders(currentUser)]).then(([interestsData, requestsData, ordersData]) => {
                const tmp = {
                    name: currentUser.name,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    uid: currentUser.uid,
                    interests: interestsData,
                    requests: requestsData,
                    craft: currentUser.craft,
                    orders : ordersData,
                    catalog: currentUser.catalog
                };
                console.log("Profile:");
                console.log(tmp);
                setCurrentUser(tmp);
            });

            setFirstRender(false);
        }
    }, [currentUser]);

    useEffect(() => {
        if(currentUser.uid !== null) {
            getInterests(currentUser).then((products) => {
                let interestsList = [];

                products.map((product) => {
                    interestsList.push(<ProductCard key={product.id} product={product}
                                                    productId={product.id} inCatalog={false}/>);
                });

                setInterests(interestsList);
            });
        }
    }, [currentUser.interests]);

    useEffect(() => {
        if(currentUser.requests && currentUser.requests.length === 0) {
            setRequests([]);
        } else if(currentUser.uid !== null) {
            getRequests(currentUser).then((products) => {
                let requestsList = [];

                products.map((product) => {
                    requestsList.push(<RequestCard key={product.id} request={product} index={product.id}/>);
                });

                setRequests(requestsList);
            });
        }
    }, [currentUser.requests]);

    useEffect(() => {
        if(currentUser.orders && currentUser.orders.length === 0) {
            setOrders([]);
        } else if(currentUser.uid !== null && currentUser.craft !== null) {
            getOrders(currentUser).then((products) => {
                let ordersList = [];

                products.map((product) => {
                    ordersList.push(<RequestCard key={product.id} request={product} index={product.id}/>);
                });

                setOrders(ordersList);
            });
        }
    }, [currentUser.orders]);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <StandardLayout title="Profile page" toggleDrawerContent={toggleDrawerContent} setToggleDrawerContent={setToggleDrawerContent} page_content={ currentUser.uid ?
                <main className="flex flex-col flex-1 my-10 space-y-5 mx-5 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-52 2xl:mx-72 justify-center items-center">
                    <div className="flex justify-center items-center mb-5 mt-10">
                        <div>
                            <figure className="static rounded-full flex justify-center mb-5">
                                <div className="relative w-24">
                                    <UploadImageModal/>
                                    <div
                                        className="absolute -right-1 -bottom-2 z-[1] h-10 w-10 bg-base-100 rounded-full"/>
                                    <figure className="h-24 w-24">
                                        <Image
                                            src={currentUser.photoURL ? currentUser.photoURL : default_profile_picture}
                                            alt="avatar icon"
                                            className="h-full w-full object-cover rounded-full" layout="responsive"
                                            width={96} height={96}/>
                                    </figure>
                                </div>
                            </figure>
                            <div className="pb-5">
                                <div className="text-lg text-center mt-5">{currentUser.name}</div>
                                <div className="font-medium text-center">{currentUser.email}</div>
                            </div>
                            {!currentUser.craft &&
                                <div className="flex justify-center w-full">
                                    <button className="btn bg-base-300 normal-case text-lg" onClick={BecomeCraftsman}>
                                        Become Craftsman
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    <Collapse id={1} categoryName="My interests" content={ interests.length > 0 ?
                        <ItemsScroll listOfItems={interests}/> :
                        <div className="flex items-center justify-center ml-5 mr-5 h-20">
                            <p className="text-xl opacity-60">You haven&apos;t liked any products yet.</p>
                        </div>
                    }/>
                    <Collapse id={2} categoryName="My Requests" content={requests.length > 0 ?
                        <ItemsScroll listOfItems={requests}/> :
                        <div className="flex items-center justify-center ml-5 mr-5 h-20">
                            <p className="text-xl opacity-60">You haven&apos;t made any requests yet.</p>
                        </div>
                    }/>
                    {currentUser.craft &&
                        <Collapse id={3} categoryName="Received orders" content={orders.length > 0 ?
                            <ItemsScroll listOfItems={orders}/> :
                            <div className="flex items-center justify-center ml-5 mr-5 h-20">
                                <p className="text-xl opacity-60">You haven&apos;t received any orders yet.</p>
                            </div>
                        }/>
                    }
                </main> :
                <div className="flex flex-1 justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }/>
        </div>
    );
}

export default Profile;