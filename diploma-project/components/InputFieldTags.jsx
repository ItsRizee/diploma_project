import {useState} from "react";
import {errorToast} from "../public/constants";

const InputFieldTags = ({tags, setTags}) => {
    const [newTag, setNewTag] = useState("");

    const handleTagChange = (e) => {
        setNewTag(e.target.value);
    };

    const handleAddTag = (event) => {
         if(newTag && newTag.trim() && (event.type === "click" || event.code === "Enter")) {
            event.preventDefault()
            if(tags.length === 5){
                errorToast("Product's tags can't be more than 5!");
            } else {
                setTags([...tags, newTag.trim()]);
                setNewTag('');
            }
        }
    };

    const handleRemoveTag = (event, tagToRemove) => {
        event.preventDefault();
        // Filter out the tag to be removed from the current tags
        // Removes all tags that are the same because we don't need duplication
        const updatedTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(updatedTags);
    };

    return (
        <div className="form-control space-y-5">
            <label htmlFor="tag-input" className="label">
                <span className="label-text">Tags - <em>Not required</em></span>
            </label>
            <div>
                <input
                    id="tag-input"
                    type="text"
                    value={newTag}
                    onChange={handleTagChange}
                    className="input input-bordered w-full pr-24"
                    onKeyDown={handleAddTag}
                />
                <button type="button" className="btn btn-ghost absolute right-5" onClick={handleAddTag}>
                    Add Tag
                </button>
            </div>
            <ul className="flex flex-wrap h-24 overflow-y-auto bg-base-200 rounded-lg p-3">
                {tags.map((tag, index) => (
                    <li key={index}>
                        <div key={index} className="badge badge-outline whitespace-nowrap mb-3 mr-3 space-x-2 p-3">
                            <p>{tag}</p>
                            <button type="button" onClick={(event) => handleRemoveTag(event, tag)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="w-5 h-5">
                                    <path
                                        d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InputFieldTags;