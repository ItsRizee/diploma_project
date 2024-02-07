import {Bounce, toast} from "react-toastify";

export const app_name = "Wavary";

export const default_profile_picture = "https://firebasestorage.googleapis.com/v0/b/diploma-project-1ff8d.appspot.com/o/profile_pictures%2Fprofile_picture.png?alt=media&token=b8e2bb8c-6527-4ca8-aac3-7cbb5dacd4a3";

export const errorToast = (content) => toast.error(content, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    theme: "colored",
    transition: Bounce,
});

export const successToast = (content) => toast.success(content, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    theme: "colored",
    transition: Bounce,
});

export const infoToast = (content) => toast.info(content, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    theme: "colored",
    transition: Bounce,
});