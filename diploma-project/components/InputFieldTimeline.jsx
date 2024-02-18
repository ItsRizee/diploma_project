import { Collapse, InputField, Textarea } from "./index";
import {errorToast} from "../public/constants";
import {useRef} from "react";
import {toast} from "react-toastify";

const InputFieldTimeline = ({ timeline, setTimeline }) => {
    const toastId = useRef(null);

    const handleAddSection = () => {
        setTimeline([...timeline, {
            heading: "",
            description: "",
            date: ""
        }]);
    };

    const handleRemoveSection = () => {
        setTimeline([...timeline.slice(0, timeline.length - 1)]);
    };

    const check = (index, property, value) => {
        switch (property) {
            case "heading":
                if(value.length > 40) {
                    if(!toast.isActive(toastId.current)) {
                        toastId.current = errorToast(`Section ${index + 1}'s heading can't be more than 40 characters!`);
                    }
                    return false;
                }
                return true;
            case "description":
                if(value.length > 300) {
                    if(!toast.isActive(toastId.current)) {
                        toastId.current = errorToast(`Section ${index + 1}'s description can't be more than 300 characters!`);
                    }
                    return false;
                }
                return true;
            case "date":
                const today = new Date();
                const selectedDate = new Date(value);

                if(selectedDate > today) {
                    if(!toast.isActive(toastId.current)) {
                        toastId.current = errorToast(`Section ${index + 1}'s date can't be in the future!`);
                    }
                    return false;
                }
                return true;
            default:
                return false;
        }
    }

    const handleInputChange = (index, property, value) => {
        if(check(index, property, value)) {
            setTimeline([...timeline.slice(0, index), {
                ...timeline[index],
                [property]: value
            }, ...timeline.slice(index + 1, timeline.length)]);
        }
    };

    return (
        <div className="form-control space-y-5">
            <span className="label-text">Timeline</span>
            <ul className="space-y-3">
                {
                    timeline.map((section, index) => (
                        <li key={index} className="relative">
                            <Collapse id={1} categoryName={`Section ${index + 1}`} titleSize="text-lg" content={(
                                <div className="pl-5">
                                    <InputField
                                        id="title-input"
                                        type="text"
                                        labelText="Title"
                                        placeholder=""
                                        value={section.heading}
                                        onChange={(e) => handleInputChange(index, "heading", e.target.value)}
                                    />
                                    <Textarea
                                        id="description-input"
                                        type="text"
                                        labelText="Description"
                                        placeholder=""
                                        value={section.description}
                                        onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                    />
                                    <InputField
                                        id="date-input"
                                        labelText="Date"
                                        type="date"
                                        placeholder=""
                                        value={section.date}
                                        onChange={(e) => handleInputChange(index, "date", e.target.value)}
                                    />
                                </div>
                            )} />
                            {index === timeline.length - 1 && <button className="absolute -top-2 -right-2 btn btn-xs btn-circle bg-base-300 hover:bg-base-200 hover:border-base-200" onClick={handleRemoveSection}>✕</button>}
                        </li>
                    ))
                }
                <li>
                    <button type="button" className="btn btn-neutral border-base-300 w-full" onClick={handleAddSection}>Add section</button>
                </li>
            </ul>
        </div>
    );
}

export default InputFieldTimeline;