import Image from "next/future/image";
import {default_profile_picture} from "../public/constants";

const ProductCard = ({title, description, tags, isNew, profile_picture = default_profile_picture, inCatalog = false}) => {
    return (
        <div className="card card-bordered border-b-gray-400 w-60 h-full bg-base-100 shadow-md">
            <figure className="relative">
                <Image src="/ring.jpg" alt="Silver ring" width={240} height={240}/>
            </figure>
            <div className="card-body">
                <h3 className="card-title">
                    {title}
                    {isNew && <div className="badge badge-secondary">NEW</div>}
                </h3>
                <p>{description}</p>
                <div className="card-actions justify-start">
                    {tags.map((item, index) => (
                        <div key={index} className="badge badge-outline">
                            {item}
                        </div>
                    ))}
                </div>
                {!inCatalog && <div className="card-actions justify-end">
                    <div className="flex flex-col items-center mt-4 space-y-4">
                        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <figure className="relative rounded-full">
                                <Image src={profile_picture ? profile_picture : default_profile_picture} alt="avatar icon" width={40} height={40}/>
                            </figure>
                        </div>
                        <p className="font-normal normal-case">Nikola Petrov</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default ProductCard;
