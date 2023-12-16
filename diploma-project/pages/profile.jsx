import {useEffect, useState} from "react";
import Image from "next/future/image";
import {auth} from "../firebase";
import {UpdateProfileToCraftsman} from "../services/user";
import {ItemsScroll, Collapse, UploadImageModal, StandardLayout} from '../components';
import {default_profile_picture, discoverProducts} from "../public/constants";
import {useRouter} from "next/router";
import {useUserStore} from "../store/userStorage";

const Profile = () => {
    const { user } = useUserStore((state) => ({user: state.user}));
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

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <StandardLayout title="Profile page" page_content={ auth.currentUser && user.uid ?
                <main className="flex flex-col flex-1 my-10 space-y-5 mx-5 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-52 2xl:mx-72 justify-center items-center">
                    <div className="flex justify-center items-center mb-5 mt-10">
                        <div>
                            <figure className="relative rounded-full flex justify-center mb-5">
                                <UploadImageModal />
                                <div className="absolute right-11 -bottom-2 z-[1] h-10 w-10 bg-base-100 rounded-full"/>
                                <Image src={user.photoURL ? user.photoURL : default_profile_picture} alt="avatar icon" width={96} height={96}/>
                            </figure>
                            <div className="pb-5">
                                <div className="text-lg text-center mt-5">{user.name}</div>
                                <div className="font-medium text-center">{user.email}</div>
                            </div>
                            {!user.craft && <button className="btn btn-neutral flex justify-center normal-case text-lg" onClick={BecomeCraftsman}>Become Craftsman</button>}
                            {error && <span className="error-text py-2 text-red-500">{error}</span>}
                        </div>
                    </div>
                    {/*<ItemsScroll listOfItems={user.interests} categoryName="My interests"/>*/}
                    {/*<ItemsScroll listOfItems={user.requests} categoryName="My Requests"/>*/}
                    {/*<ItemsScroll listOfItems={user.orders} categoryName="Received orders"/>*/}
                    <Collapse id={1} categoryName="My interests" content={<ItemsScroll listOfItems={discoverProducts} categoryName=""/>}/>
                    <Collapse id={2} categoryName="My Requests" content={<ItemsScroll listOfItems={discoverProducts} categoryName=""/>}/>
                    <Collapse id={3} categoryName="Received orders" content={<ItemsScroll listOfItems={discoverProducts} categoryName=""/>}/>
                </main> :
                <div className="flex flex-1 justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }/>
        </div>
    );
}

export default Profile;