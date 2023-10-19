import React from "react";
import Image from "next/legacy/image";

const ProductCard = () => {
    return (
        <div className="card card-bordered border-b-gray-400 w-48 sm:w-96 bg-base-100 shadow-lg">
            <figure className="relative" style={{ width: "100%", paddingTop:"100%" }}>
                <Image src="/ring.jpg" alt="Silver ring" layout="fill" objectFit="cover" />
            </figure>
            <div className="card-body">
                <h3 className="card-title">
                    Silver ring
                    <div className="badge badge-secondary">NEW</div>
                </h3>
                <p>Crafted by the best master in the city</p>
                <div className="card-actions justify-start">
                    <div className="badge badge-outline">Silver craft</div>
                    <div className="badge badge-outline">Master</div>
                </div>
                <div className="card-actions justify-end">
                    <div className="flex flex-col items-center"> {/* Use flex and flex-col to stack vertically */}
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <figure className="relative rounded-full" style={{ width: "40px", height: "40px" }}>
                                    <Image src="/profile_picture.png" alt="avatar icon" layout="fill" objectFit="contain"/>
                                </figure>
                            </div>
                        </label>
                        <h2 className="mt-2">Nikola Petrov</h2> {/* Add margin-top to separate the avatar and name */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
