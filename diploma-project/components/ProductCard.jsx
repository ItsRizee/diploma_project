import Image from "next/future/image";
import {default_profile_picture} from "../public/constants";
import {useEffect, useState} from "react";
import {getUserById, User} from "../services/user";
import {Timestamp} from "firebase/firestore";
import {useRouter} from "next/router";

const ProductCard = ({product, inCatalog = false, productId}) => {
    const [isNew, setIsNew] = useState(false);
    const [owner, setOwner] = useState(new User());
    const router = useRouter();

    useEffect(() => {
        getUserById(product.owner).then((user) => {
            setOwner(user);
        });

        const timeDifference = Timestamp.now().toMillis() - product.createdDate.toMillis();
        if(timeDifference < 24 * 60 * 60 * 1000) {
            setIsNew(true);
        }
    }, []);

    const onClick = () => {
        void router.push(`/product/${productId}`);
    };

    return (
        <button className="card card-bordered border-b-gray-400 w-60 h-full bg-base-100 shadow-md hover:brightness-90 dark:hover:brightness-125" onClick={onClick}>
            <figure className="relative">
                <Image src="/ring.jpg" alt="Silver ring" width={240} height={240}/>
            </figure>
            <div className="card-body">
                <h3 className="card-title">
                    {product.title}
                    {isNew && <div className="badge badge-secondary">NEW</div>}
                </h3>
                <p>{product.description}</p>
                <div className="card-actions justify-start">
                    {product.tags.map((item, index) => (
                        <div key={index} className="badge badge-outline">
                            {item}
                        </div>
                    ))}
                </div>
                {!inCatalog && <div className="card-actions justify-center">
                    <div className="flex items-center mt-4 space-x-4">
                        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <figure className="relative rounded-full">
                                <Image src={owner.photoURL ? owner.photoURL : default_profile_picture} alt="avatar icon" width={40} height={40}/>
                            </figure>
                        </div>
                        <p className="font-normal normal-case">{owner.name}</p>
                    </div>
                </div>}
            </div>
        </button>
    )
}

export default ProductCard;
