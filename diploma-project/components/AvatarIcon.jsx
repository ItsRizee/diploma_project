import React from "react";
import Image from "next/legacy/image";

const AvatarIcon = ({ img, username }) => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="bg-gradient-to-tr from-secondary to-primary p-1 rounded-full">
                <a className="block bg-base-100 p-1.5 rounded-full" href="#">
                    <figure className="relative rounded-full" style={{ width: "80px", height: "80px" }}>
                        <Image src={img} alt="avatar icon" layout="fill" objectFit="contain"/>
                    </figure>
                </a>
            </div>
            <a href="#">{username}</a>
        </div>
    );
}

export default AvatarIcon;