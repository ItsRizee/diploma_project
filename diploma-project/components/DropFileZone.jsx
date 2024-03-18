import {useState} from "react";
import {useUserStore} from "../store/userStorage";

const DropFileZone = ({isUploading, onImageChange}) => {
    const { isTouchEnabled } = useUserStore((state) => ({isTouchEnabled: state.isTouchEnabled}));
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];

        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            // Handle the dropped file, e.g., call onImageChange
            if (onImageChange) {
                onImageChange(file);
            }
        }
    };

    const handleChange = (event) => {
        event.preventDefault();

        const file = event.target.files[0];

        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            // Handle the dropped file, e.g., call onImageChange
            if (onImageChange) {
                onImageChange(file);
            }
        }
    }

    return (
        <label
            htmlFor="dropzone-file"
            className={`flex flex-col items-center justify-center w-full h-64 rounded-xl cursor-pointer bg-base-100 ${
                isDragging ? 'brightness-90' : 'hover:brightness-90'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {
                isUploading ?
                    <span className="loading loading-spinner loading-lg"></span> :
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {
                            !isTouchEnabled &&
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                        }
                        <svg className="w-8 h-8 mb-4 text-base-100-content" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-base-100-content"><span className="font-semibold">Click to upload</span> or
                            drag and drop</p>
                        <p className="text-xs text-base-100-content">PNG or JPEG</p>
                    </div>
            }
            <input id="dropzone-file" type="file" accept="image/png, image/jpeg" onChange={handleChange}
                   className="hidden"/>
        </label>
    );
}

export default DropFileZone;