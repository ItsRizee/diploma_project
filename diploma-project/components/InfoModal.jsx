import {useUserStore} from "../store/userStorage";
import Link from "next/link";
import Image from "next/future/image";
import {default_profile_picture} from "../public/constants";
import {getRequest, updateRequest, updateStatus} from "../services/request";
import {useState, useRef} from "react";
import {InputField, Textarea} from "./index";
import {successToast, errorToast} from "../public/constants";
import {toast} from "react-toastify";

const InfoModal = ({request, setRequest, user, craftsman}) => {
    const { currentUser, isTouchEnabled } = useUserStore((state) => ({currentUser: state.user, isTouchEnabled: state.isTouchEnabled}));
    const [title, setTitle] = useState(request.title);
    const [description, setDescription] = useState(request.description);
    const [editMode, setEditMode] = useState(false);
    const toastId = useRef(null);
    const modalRef = useRef(null);

    const handleAccept = () => {
        getRequest(request.id).then((requestData) => {
            // the craftsman and user can't be changed so check only for title, description and status
            if(request.title === requestData.title && request.description === requestData.description  && request.status === requestData.status) {
                updateStatus(request.id, "accepted")
                    .then(() => {
                        setRequest({
                            title: request.title,
                            description: request.description,
                            user: request.user,
                            craftsman: request.craftsman,
                            status: "accepted",
                        });
                        modalRef.current.close();
                    })
                    .catch(() => {
                        errorToast("Can't accept request. Please reload the page and try again!");
                });
            } else {
                errorToast("Can't accept request. Please reload the page and try again!");
            }
        });
    }

    const handleDeny = () => {
        getRequest(request.id).then((requestData) => {
            // the craftsman and user can't be changed so check only for title, description and status
            if(request.title === requestData.title && request.description === requestData.description && request.status === requestData.status) {
                updateStatus(request.id, "denied")
                    .then(() => {
                        setRequest({
                            title: request.title,
                            description: request.description,
                            user: request.user,
                            craftsman: request.craftsman,
                            status: "denied",
                        });
                        modalRef.current.close();
                    })
                    .catch(() => {
                        errorToast("Can't deny request. Please reload the page and try again!");
                });
            } else {
                errorToast("Can't deny request. Please reload the page and try again!");
            }
        });
    }

    const handleEdit = () => {
        getRequest(request.id).then((requestData) => {
            // check if request was accepted or denied before editing
            if(request.status === requestData.status) {
                setEditMode(true);
            } else {
                errorToast("Can't edit request. Please reload the page and try again!");
            }
        });
    }

    const handleSave = () => {
        getRequest(request.id).then((requestData) => {
            // check if request was accepted or denied before editing
            if(request.status === requestData.status) {
                setRequest({
                    ...request,
                    title: title,
                    description: description,
                })
                setEditMode(false);
                updateRequest(request.id, title, description)
                    .then(() => {
                        successToast("Successfully updated request's content!");
                    })
                    .catch(() => {
                        errorToast("Can't save request. Please reload the page and try again!");
                    });
            } else {
                errorToast("Can't save request. Please reload the page and try again!");
            }
        });
    }

    const handleCancel = () => {
        getRequest(request.id).then((requestData) => {
            // check if request was accepted or denied before editing
            if(request.status === requestData.status) {
                updateStatus(request.id, "canceled")
                    .then(() => {
                        setRequest({
                            title: request.title,
                            description: request.description,
                            user: request.user,
                            craftsman: request.craftsman,
                            status: "canceled",
                        });
                        modalRef.current.close();
                    })
                    .catch(() => {
                        errorToast("Can't cancel request. Please reload the page and try again!");
                });
            } else {
                errorToast("Can't cancel request. Please reload the page and try again!");
            }
        });
    }

    return (
        <div>
            <div className="card-actions">
                <div className="flex flex-col space-y-3">
                    <p>Status:
                        <span
                            className={`${request.status === "waiting" ? "text-warning" : (request.status === "accepted" ? "text-success" : "text-error")}`}>
                        {` ${request.status}`}
                    </span>
                    </p>
                    <button className="btn btn-primary" onClick={() => modalRef.current.showModal()}>
                        More info
                    </button>
                </div>
            </div>
            <dialog className="modal overflow-y-auto" ref={modalRef}>
                <div className="modal-box w-4/5 md:w-full p-0">
                    {
                        !isTouchEnabled &&
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    }
                    <article className="p-5 md:p-10 space-y-5 h-full w-full">
                        {editMode === false ?
                            <h2 className="text-xl font-bold">{request.title}</h2> :
                            <InputField
                                id="input-field-title"
                                value={title}
                                labelText="Title"
                                type="text"
                                placeholder=""
                                onChange={(e) => {
                                    const requestTitle = e.target.value;

                                    if(requestTitle.length > 20) {
                                        if(!toast.isActive(toastId.current)) {
                                            toastId.current = errorToast("Error: Title can't be more than 20 characters!");
                                        }
                                    } else {
                                        setTitle(requestTitle);
                                    }
                                }}
                            />
                        }
                        {editMode === false ?
                            <p className="text-justify">{request.description}</p> :
                            <Textarea
                                id="textarea-description"
                                value={description}
                                labelText="Description"
                                placeholder=""
                                height="h-56"
                                onChange={(e) => {
                                    const requestDescription = e.target.value;

                                    if(requestDescription.length > 500) {
                                        if(!toast.isActive(toastId.current)) {
                                            toastId.current = errorToast("Error: Description can't be more than 500 characters!");
                                        }
                                    } else {
                                        setDescription(requestDescription);

                                    }
                                }}
                            />
                        }
                        {currentUser.uid === request.craftsman ?
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
                        {request.craftsman === currentUser.uid && request.status === "waiting" && <div className="flex justify-center space-x-2">
                            <button className="btn btn-success w-20" type="button" onClick={handleAccept}>
                                Accept
                            </button>
                            <button className="btn btn-error w-20" type="button" onClick={handleDeny}>
                                Deny
                            </button>
                        </div>}
                        {request.user === currentUser.uid && request.status === "waiting" && editMode === false &&
                            <div className="flex justify-center space-x-2">
                                <button className="btn btn-info w-20" type="button" onClick={handleEdit}>
                                    Edit
                                </button>
                                <button className="btn btn-error w-20" type="button" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        }
                        {request.user === currentUser.uid && request.status === "waiting" && editMode === true &&
                            <div className="flex justify-center space-x-2">
                                <button className="btn btn-info w-20" type="button" onClick={handleSave}>
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