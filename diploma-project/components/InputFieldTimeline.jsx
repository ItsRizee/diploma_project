import {Collapse, InputField, Textarea} from "./index";

const InputFieldTimeline = ({timeline, setTimeline}) => {

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
                                        type="text"
                                        labelText="Title"
                                        placeholder=""
                                        value={section.heading}
                                        onChange={(e) => {
                                            setTimeline([...timeline.slice(0, index), {
                                                heading: e.target.value,
                                                description: section.description,
                                                date: section.date
                                            }, ...timeline.slice(index + 1, timeline.length)]);
                                        }}
                                    />
                                    <Textarea
                                        type="text"
                                        labelText="Description"
                                        placeholder=""
                                        value={section.description}
                                        onChange={(e) => {
                                            setTimeline([...timeline.slice(0, index), {
                                                heading: section.heading,
                                                description: e.target.value,
                                                date: section.date
                                            }, ...timeline.slice(index + 1, timeline.length)]);
                                        }}
                                    />
                                    <InputField
                                        labelText="Date"
                                        type="date"
                                        placeholder=""
                                        value={section.date}
                                        onChange={(e) => {
                                            setTimeline([...timeline.slice(0, index), {
                                                heading: section.heading,
                                                description: section.description,
                                                date: e.target.value
                                            }, ...timeline.slice(index + 1, timeline.length)]);
                                        }}
                                    />
                                </div>
                            )}/>
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