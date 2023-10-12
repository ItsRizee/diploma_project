import React from "react";

const AvatarIcon = () => {
    return (
        <div className="avatar">
            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="/profile_picture.png" alt="profile picture" />
            </div>
        </div>
    )
}

export default AvatarIcon;