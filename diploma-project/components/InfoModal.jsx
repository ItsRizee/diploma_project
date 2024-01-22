import {useUserStore} from "../store/userStorage";
import Link from "next/link";
import Image from "next/future/image";
import {default_profile_picture} from "../public/constants";
import {getRequest, updateStatus} from "../services/request";
import {useState} from "react";
import {InputField, Textarea} from "./index";

const InfoModal = ({request, setRequest, user, craftsman, requestID, index, error, setError}) => {
    const { currentUser } = useUserStore((state) => ({currentUser: state.user}));
    const [editMode, setEditMode] = useState(false);

    const handleAccept = () => {
        getRequest(requestID).then((requestData) => {
            // the craftsman and user can't be changed so check only for title, description and status
            if(request.title === requestData.title && request.description === requestData.description  && request.status === requestData.status) {
                updateStatus(requestID, "accepted")
                    .then(() => {
                        setRequest({
                            title: request.title,
                            description: request.description,
                            user: request.user,
                            craftsman: request.craftsman,
                            status: "accepted",
                        });
                        document.getElementById(`my_modal_${index}`).close();
                    })
                    .catch((error) => {
                        setError(error);
                });
            } else {
                setError("Can't accept request because it was edited or its status has changed. Please reload the page to see the changes!");
            }
        });
    }

    const handleDeny = () => {
        getRequest(requestID).then((requestData) => {
            // the craftsman and user can't be changed so check only for title, description and status
            if(request.title === requestData.title && request.description === requestData.description && request.status === requestData.status) {
                updateStatus(requestID, "denied")
                    .then(() => {
                        setRequest({
                            title: request.title,
                            description: request.description,
                            user: request.user,
                            craftsman: request.craftsman,
                            status: "denied",
                        });
                        document.getElementById(`my_modal_${index}`).close();
                    })
                    .catch((error) => {
                        console.log(error);
                });
            } else {
                setError("Can't deny request because it was edited or its status has changed. Please reload the page to see the changes!");
            }
        });
    }

    const handleEdit = () => {
        getRequest(requestID).then((requestData) => {
            // check if request was accepted or denied before editing
            if(request.status === requestData.status) {
                setEditMode(true);
            } else {
                setError("Can't edit request because it's status has changed. Please reload the page to see the new status!");
            }
        });
    }

    const handleSave = () => {
        getRequest(requestID).then((requestData) => {
            // check if request was accepted or denied before editing
            if(request.status === requestData.status) {
                setEditMode(false);
            } else {
                setError("Can't save request because it's status has changed. Please reload the page to see the new status!");
            }
        });
    }

    const handleCancel = () => {
        getRequest(requestID).then((requestData) => {
            // check if request was accepted or denied before editing
            if(request.status === requestData.status) {
                updateStatus(requestID, "canceled")
                    .then(() => {
                        setRequest({
                            title: request.title,
                            description: request.description,
                            user: request.user,
                            craftsman: request.craftsman,
                            status: "canceled",
                        });
                        document.getElementById(`my_modal_${index}`).close();
                    })
                    .catch((error) => {
                        console.log(error);
                });
            } else {
                setError("Can't cancel request because it's status has changed. Please reload the page to see the new status!");
            }
        });
    }

    return (
        <div>
            <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => document.getElementById(`my_modal_${index}`).showModal()}>
                    More info
                </button>
            </div>
            <dialog id={`my_modal_${index}`} className="modal">
                {/*  UploadImageModal's content  */}
                <div className="modal-box flex items-center justify-center w-4/5 md:w-full p-0">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <article className="p-10 space-y-5 w-full">
                        {editMode === false ?
                            <h2 className="text-xl font-bold">{request.title}</h2> :
                            <InputField
                                id="input-field-title"
                                value={request.title}
                                labelText="Title"
                                type="text"
                                placeholder=""
                                onChange={() => setRequest({
                                    title: request.title,
                                    description: request.description,
                                    user: request.user,
                                    craftsman: request.craftsman,
                                    status: request.status,
                                })}
                            />
                        }
                        {editMode === false ?
                            <p className="text-justify">{request.description}</p> :
                            <Textarea
                                id="textarea-description"
                                value={request.description}
                                labelText="Description"
                                placeholder=""
                                height="h-56"
                                onChange={() => setRequest({
                                    title: request.title,
                                    description: request.description,
                                    user: request.user,
                                    craftsman: request.craftsman,
                                    status: request.status,
                                })}
                            />
                        }
                        {currentUser.uid === craftsman.uid ?
                            <div className="flex flex-col items-center space-y-1">
                                <Link tabIndex={0} href={`/catalog/${user.uid}`}>
                                    <figure className="relative btn btn-ghost btn-circle avatar rounded-full">
                                        <Image src={user.photoURL ? user.photoURL : default_profile_picture}
                                               alt="avatar icon"
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
                        <p>Status: <span className={`${request.status === "waiting" ? "text-warning" : (request.status === "accepted" ? "text-success" : "text-error")}`}>{request.status}</span></p>
                        {craftsman.uid === currentUser.uid && request.status === "waiting" && <div className="flex justify-center space-x-2">
                            <button className="btn btn-success w-20" onClick={handleAccept}>
                                Accept
                            </button>
                            <button className="btn btn-error w-20" onClick={handleDeny}>
                                Deny
                            </button>
                        </div>}
                        {user.uid === currentUser.uid && request.status === "waiting" && editMode === false &&
                            <div className="flex justify-center space-x-2">
                                <button className="btn btn-info w-20" onClick={handleEdit}>
                                    Edit
                                </button>
                                <button className="btn btn-error w-20" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        }
                        {user.uid === currentUser.uid && request.status === "waiting" && editMode === true &&
                            <div className="flex justify-center space-x-2">
                                <button className="btn btn-info w-20" onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                        }
                    </article>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}

export default InfoModal;