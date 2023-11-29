import Image from "next/future/image";

const ProductCard = ({title, description}) => {
    return (
        <div className="card card-bordered border-b-gray-400 w-52 sm:w-64 bg-base-100 shadow-md">
            <figure className="relative w-48 sm:w-60 h-48 sm:h-60">
                <Image src="/ring.jpg" alt="Silver ring" fill="true"/>
            </figure>
            <div className="card-body">
                <h3 className="card-title">
                    {title}
                    <div className="badge badge-secondary">NEW</div>
                </h3>
                <p>{description}</p>
                <div className="card-actions justify-start">
                    <div className="badge badge-outline">Silver craft</div>
                    <div className="badge badge-outline">Master</div>
                </div>
                <div className="card-actions justify-end">
                    <div className="flex flex-col items-center mt-4 space-y-4">
                        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <figure className="relative rounded-full">
                                <Image src="/profile_picture.png" alt="avatar icon" width={40} height={40}/>
                            </figure>
                        </div>
                        <p className="font-normal normal-case">Nikola Petrov</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
