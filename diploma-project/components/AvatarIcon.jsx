import React from "react";
import Image from "next/image";

const AvatarIcon = ({ img, username }) => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="bg-gradient-to-tr from-secondary to-primary p-1 rounded-full">
                <a className="block bg-base-100 p-1.5 rounded-full" href="#">
                    <figure className="relative rounded-full w-20 h-20">
                        <Image src={img} alt="avatar icon" fill="true"/>
                    </figure>
                </a>
            </div>
            <a href="#">{username}</a>
        </div>
    );
}

export default AvatarIcon;