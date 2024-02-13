import {InputField, Textarea} from "./index";
import {useRef, useState} from "react";
import {addRequest} from "../services/request";
import {useUserStore} from "../store/userStorage";
import {errorToast, successToast} from "../public/constants";
import {toast} from "react-toastify";

const NewRequest = ({craftsman}) => {
    const { currentUser } = useUserStore((state) => ({currentUser: state.user}));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const toastId = useRef(null);

    const onSubmit = (event) => {
        event.preventDefault();

        setSubmitting(true);

        addRequest(title, description, currentUser, craftsman.uid, "waiting")
            .then(() => {
                setTitle("");
                setDescription("");

                successToast("Successfully added new request!");
                setSubmitting(false);

                // reset the form
                event.target.reset();
            })
            .catch((errorMessage) => {
                errorToast(errorMessage);
            });
    }

    return (
        <div className="flex flex-col bg-base-100 text-base-content">
            <div className="flex flex-col justify-center items-center p-5">
                <h2 className="font-bold text-xl mb-5">New Request</h2>
                <form className="space-y-5 w-full" onSubmit={onSubmit}>
                    <InputField
                        id="title-input"
                        type="text"
                        labelText="Title"
                        placeholder=""
                        value={title}
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
                    <Textarea
                        id="description-textarea"
                        type="text"
                        labelText="Description"
                        placeholder=""
                        value={description}
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
                    <div>
                        <div className="form-control">
                            {submitting ?
                                <button className="btn btn-primary btn-disabled" type="submit">
                                    <span className="loading loading-spinner loading-lg"></span>
                                </button> :
                                <button className="btn btn-primary" type="submit">
                                    Add Request
                                </button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewRequest;