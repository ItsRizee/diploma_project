import {useEffect, useState} from "react";
import {UpdateProfilePicture} from "../services/user";
import {auth} from "../firebase";

const UploadImageModal = () => {
    const [isTouchEnabled, setIsTouchEnabled] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const onImageChange = () => {
        const fileInput = document.getElementById('dropzone-file');
        setIsUploading(true);
        UpdateProfilePicture(fileInput.files[0], auth.currentUser.uid).then(() => {
            document.getElementById('my_modal_3').close();
            setIsUploading(false);
        });
    }

    useEffect(() => {
        setIsTouchEnabled(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    return (
        <div>
            <button className="btn btn-ghost btn-sm btn-circle absolute right-12 -bottom-1 bg-zinc-300 hover:bg-zinc-500 opacity-80 z-20" onClick={()=>document.getElementById('my_modal_3').showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-8 h-8 p-1.5">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
            </button>
            <dialog id="my_modal_3" className="modal">
                {/*  UploadImageModal's content  */}
                <div className="modal-box flex items-center justify-center w-4/5 md:w-full p-0">
                    {
                        isTouchEnabled ?
                            <div/> :
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                    }
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-neutral hover:bg-neutral-focus">
                        {
                            isUploading ?
                                <span className="loading loading-spinner loading-lg"></span> :
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPEG (MAX. 800x400px)</p>
                                </div>
                        }
                        <input id="dropzone-file" type="file" accept="image/png, image/jpeg" onChange={onImageChange} className="hidden"/>
                    </label>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}

export default UploadImageModal;