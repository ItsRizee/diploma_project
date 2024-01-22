import {useEffect, useState} from "react";
import Image from "next/future/image";
import {UpdateProfileToCraftsman} from "../services/user";
import {ItemsScroll, Collapse, UploadImageModal, StandardLayout, ProductCard, RequestCard} from '../components';
import {default_profile_picture} from "../public/constants";
import {useRouter} from "next/router";
import {useUserStore} from "../store/userStorage";
import {getInterests} from "../services/product";
import {getOrders, getRequests} from "../services/request";

const Profile = () => {
    const { currentUser } = useUserStore((state) => ({currentUser: state.user}));
    const [interests, setInterests] = useState([]);
    const [requests, setRequests] = useState([]);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    const BecomeCraftsman = () => {
        UpdateProfileToCraftsman("woodcarver")
            .then()
            .catch((error) => {
                setError(error);
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
        getInterests(currentUser.email).then((products) => {
            let interestsList = [];

            products.map((product, index) => {
                interestsList.push(<ProductCard key={index} product={product} productId={currentUser.interests[index]} inCatalog={false} />);
            });

            setInterests(interestsList);
        });
    }, [currentUser.interests]);

    useEffect(() => {
        getRequests(currentUser.email).then((products) => {
            let requestsList = [];

            products.map((product, index) => {
                requestsList.push(<RequestCard key={index} request={product} requestID={currentUser.requests[index]} index={"a" + index}/>);
            });

            setRequests(requestsList);
        });
    }, [currentUser.requests]);

    useEffect(() => {
        if(currentUser.craft) {
            getOrders(currentUser.email).then((products) => {
                let ordersList = [];

                products.map((product, index) => {
                    ordersList.push(<RequestCard key={index} request={product} requestID={currentUser.orders[index]} index={index}/>);
                });

                setOrders(ordersList);
            });
        }
    }, [currentUser.orders]);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <StandardLayout title="Profile page" page_content={ currentUser.uid ?
                <main className="flex flex-col flex-1 my-10 space-y-5 mx-5 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-52 2xl:mx-72 justify-center items-center">
                    <div className="flex justify-center items-center mb-5 mt-10">
                        <div>
                            <figure className="static rounded-full flex justify-center mb-5">
                                <div className="relative w-24">
                                    <UploadImageModal />
                                    <div className="absolute -right-1 -bottom-2 z-[1] h-10 w-10 bg-base-100 rounded-full"/>
                                    <Image src={currentUser.photoURL ? currentUser.photoURL : default_profile_picture} alt="avatar icon" width={96} height={96}/>
                                </div>
                            </figure>
                            <div className="pb-5">
                                <div className="text-lg text-center mt-5">{currentUser.name}</div>
                                <div className="font-medium text-center">{currentUser.email}</div>
                            </div>
                            {!currentUser.craft && <button className="btn bg-base-300 flex justify-center normal-case text-lg" onClick={BecomeCraftsman}>Become Craftsman</button>}
                            {error && <span className="error-text py-2 text-error">{error}</span>}
                        </div>
                    </div>
                    <Collapse id={1} categoryName="My interests" content={ interests.length > 0 ?
                        <ItemsScroll listOfItems={interests} categoryName=""/> :
                        <div className="flex items-center justify-center h-20">
                            <p className="text-xl opacity-70">You haven't liked any products yet.</p>
                        </div>
                    }/>
                    <Collapse id={2} categoryName="My Requests" content={requests.length > 0 ?
                        <ItemsScroll listOfItems={requests} categoryName=""/> :
                        <div className="flex items-center justify-center h-20">
                            <p className="text-xl opacity-70">You haven't made any requests yet.</p>
                        </div>
                    }/>
                    {currentUser.craft &&
                        <Collapse id={3} categoryName="Received orders" content={orders.length > 0 ?
                            <ItemsScroll listOfItems={orders} categoryName=""/> :
                            <div className="flex items-center justify-center h-20">
                                <p className="text-xl opacity-70">You haven't received any orders yet.</p>
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