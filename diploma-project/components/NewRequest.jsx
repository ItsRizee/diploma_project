import {InputField, Textarea} from "./index";
import {useState} from "react";
import {addRequest} from "../services/request";
import {useUserStore} from "../store/userStorage";

const NewRequest = ({craftsman}) => {
    const {currentUser} = useUserStore((state) => ({currentUser: state.user}));
    const [requestTitle, setRequestTitle] = useState("");
    const [requestDescription, setRequestDescription] = useState("");
    const [error, setError] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();

        addRequest(requestTitle, requestDescription, currentUser, craftsman , "waiting")
            .then(() => {
                setRequestTitle("");
                setRequestDescription("");

                // reset the form
                event.target.reset();
            })
            .catch((errorMessage) => {
                setError(errorMessage);
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
                        value={requestTitle}
                        onChange={(e) => {
                            setRequestTitle(e.target.value);
                            setError(null); // Reset the error state on input change
                        }}
                    />
                    <Textarea
                        id="description-textarea"
                        type="text"
                        labelText="Description"
                        placeholder=""
                        value={requestDescription}
                        onChange={(e) => {
                            setRequestDescription(e.target.value);
                            setError(null); // Reset the error state on input change
                        }}
                    />
                    <div>
                        {error && <span className="error-text text-error py-2">{error}</span>}
                        <div className={`form-control ${error ? 'mt-2' : 'mt-6'}`}>
                            <button className="btn btn-primary" type="submit">
                                Add Request
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewRequest;