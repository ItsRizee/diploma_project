import {useUserStore} from "../store/userStorage";
import {useEffect, useState} from "react";
import {getUserById} from "../services/user";
import Link from "next/link";
import Image from "next/future/image";
import {default_profile_picture} from "../public/constants";
import {InfoModal} from "./index";
import {deleteRequest} from "../services/request";

const RequestCard = ({request, requestID, index}) => {
    const {currentUser} = useUserStore((state) => ({currentUser: state.user}));
    const [craftsman, setCraftsman] = useState(null);
    const [user, setUser] = useState(null);
    const [stateRequest, setStateRequest] = useState(request);
    const [error, setError] = useState("");

    const handleDelete = () => {
        getUserById(stateRequest.craftsman).then((craftsmanData) => {
            getUserById(stateRequest.user).then((userData) => {
                if(user.requests.join() === userData.requests.join() && craftsman.orders.join() === craftsmanData.orders.join()){
                    deleteRequest(requestID, user, setUser, craftsman, setCraftsman).catch((error) => {
                        setError(error);
                    });
                } else {
                    setError("Can't delete because there is mismatch in the information. Please reload the page and try again!");
                }
            });
        });
    };

    useEffect(() => {
        getUserById(stateRequest.craftsman).then((craftsmanData) => {
            setCraftsman(craftsmanData);
        });

        getUserById(stateRequest.user).then((userData) => {
            setUser(userData);
        });
    }, [craftsman, user]);

    if(!user || !craftsman) {
        return (
            <div className="flex flex-col gap-4 w-52">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        );
    }

    return (
        <article className="card bg-base-100 w-72">
            <div className="card-body items-center text-center space-y-3">
                <h2 className="card-title">{stateRequest.title} {requestID}</h2>
                {currentUser.uid === craftsman.uid ?
                    <div className="flex flex-col items-center space-y-1">
                        <Link tabIndex={0} href={`/catalog/${user.uid}`}>
                            <figure className="relative btn btn-ghost btn-circle avatar rounded-full">
                                <Image src={user.photoURL ? user.photoURL : default_profile_picture} alt="avatar icon"
                                       width={40} height={40}/>
                            </figure>
                        </Link>
                        <p className="font-normal normal-case">{user.name}</p>
                    </div> :
                    <div className="flex flex-col items-center space-y-1">
                        <Link tabIndex={0} href={`/catalog/${craftsman.uid}`}>
                            <figure className="relative btn btn-ghost btn-circle avatar rounded-full">
                                <Image src={craftsman.photoURL ? craftsman.photoURL : default_profile_picture}
                                       alt="avatar icon"
                                       width={40} height={40}/>
                            </figure>
                        </Link>
                        <p className="font-normal normal-case">{craftsman.name}</p>
                    </div>
                }
                <p>Status: <span
                    className={`${stateRequest.status === "waiting" ? "text-warning" : (stateRequest.status === "accepted" ? "text-success" : "text-error")}`}>{stateRequest.status}</span>
                </p>
                <InfoModal request={stateRequest} setRequest={setStateRequest} user={user} craftsman={craftsman}
                           requestID={requestID} index={index} error={error} setError={setError}/>
            </div>
            {(stateRequest.status === "denied" || stateRequest.status === "canceled") &&
                <button className="flex absolute -top-3.5 -right-3.5 transition-transform transform hover:scale-110" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="w-8 h-8 text-red-600">
                        <path fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            }
        </article>
    );
}

export default RequestCard;