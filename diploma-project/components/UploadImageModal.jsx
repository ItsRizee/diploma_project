import {useEffect, useState} from "react";
import {UpdateProfilePicture} from "../services/user";
import DropFileZone from "./DropFileZone";
import {useUserStore} from "../store/userStorage";

const UploadImageModal = () => {
    const { currentUser } = useUserStore((state) => ({currentUser: state.user}));
    const [isTouchEnabled, setIsTouchEnabled] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const onImageChange = (file) => {
        setIsUploading(true);
        UpdateProfilePicture(file, currentUser.uid).then(() => {
            document.getElementById('my_modal').close();
            setIsUploading(false);
        });
    }

    useEffect(() => {
        setIsTouchEnabled(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    return (
        <div>
            <button className="btn btn-ghost btn-sm btn-circle absolute right-0 -bottom-1 bg-zinc-300 hover:bg-zinc-500 opacity-80 z-[2]" onClick={()=>document.getElementById('my_modal').showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-8 h-8 p-1.5">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
            </button>
            <dialog id="my_modal" className="modal">
                {/*  UploadImageModal's content  */}
                <div className="modal-box flex items-center justify-center w-4/5 md:w-full p-0">
                    {
                        isTouchEnabled ?
                            <div/> :
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                    }
                    <DropFileZone isUploading={isUploading} onImageChange={onImageChange}/>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}

export default UploadImageModal;