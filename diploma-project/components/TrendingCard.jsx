import Image from "next/future/image";
import {useRouter} from "next/router";

const TrendingCard = ({product}) => {
    const router = useRouter();

    const onClick = () => {
        void router.push(`/product/${product.id}`);
    };

    return (
        <article className="card sm:card-side bg-base-100 border-b-2 sm:border-b-0 border-gray-400 w-full h-full flex">
            <figure className="relative h-72 sm:w-full">
                <Image src={product.displayImageURL} alt="Trending ring" className="object-cover object-center" fill />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p className="sm:pr-10">{product.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={onClick}>More</button>
                </div>
            </div>
        </article>
    );
}

export default TrendingCard;
