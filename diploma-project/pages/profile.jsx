import {useEffect, useState} from "react";
import Image from "next/future/image";
import {UpdateProfileToCraftsman} from "../services/user";
import {ItemsScroll, UploadImageModal, StandardLayout, ProductCard, RequestCard} from '../components';
import {default_profile_picture} from "../public/constants";
import {useRouter} from "next/router";
import {useUserStore} from "../store/userStorage";
import {getInterests} from "../services/product";
import {getOrders, getRequests} from "../services/request";
import {successToast, errorToast} from "../public/constants";

const Profile = () => {
    const { currentUser } = useUserStore((state) => ({currentUser: state.user}));
    const [toggleDrawerContent, setToggleDrawerContent] = useState(true);
    const [interests, setInterests] = useState([]);
    const [requests, setRequests] = useState([]);
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    const BecomeCraftsman = () => {
        UpdateProfileToCraftsman("craftsman")
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
        if(!accessToken){
            void router.replace("/");
        }
    }, []);

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
    }, [currentUser.uid, currentUser.interests]);

    useEffect(() => {
        if(currentUser.uid !== null) {
            getRequests(currentUser).then((products) => {
                let requestsList = [];

                products.map((product) => {
                    requestsList.push(<RequestCard key={product.id} request={product}/>);
                });

                setRequests(requestsList);
            });
        }
    }, [currentUser.uid, currentUser.requests]);

    useEffect(() => {
        if(currentUser.uid !== null && currentUser.craft !== null) {
            getOrders(currentUser).then((products) => {
                let ordersList = [];

                products.map((product) => {
                    ordersList.push(<RequestCard key={product.id} request={product}/>);
                });

                setOrders(ordersList);
            });
        }
    }, [currentUser.uid, currentUser.orders]);

    const PageContent = () => {
        if (currentUser.uid !== null) {
            return (
                <div className="flex flex-col flex-1 my-10 space-y-10 lg:mx-36 xl:mx-72">
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
                    <main>
                        <ItemsScroll categoryName="My interests" listOfItems={interests} message="You haven&apos;t liked any products yet."/>
                        <ItemsScroll categoryName="My Requests" listOfItems={requests} message="You haven&apos;t made any requests yet."/>
                        {currentUser.craft &&
                            <ItemsScroll categoryName="Received orders" listOfItems={orders} message="You haven&apos;t received any orders yet."/>
                        }
                    </main>
                </div>
            );
        } else {
            return (
                <div className="flex flex-1 justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            );
        }
    }

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <StandardLayout
                title="Profile page"
                toggleDrawerContent={toggleDrawerContent}
                setToggleDrawerContent={setToggleDrawerContent}
                page_content={PageContent()}
            />
        </div>
    );
}

export default Profile;