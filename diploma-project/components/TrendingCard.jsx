import Image from "next/future/image";
import Link from "next/link";

const TrendingCard = ({product}) => {
    return (
        <article className="card sm:card-side bg-base-100 border-b-2 sm:border-b-0 border-gray-400 w-full h-full flex">
            <figure className="relative h-72 sm:h-full sm:w-96">
                <Image src={product.displayImageURL} alt="Trending card" className="h-full w-full object-cover" layout="responsive" width={360} height={288}/>
            </figure>
            <div className="card-body sm:w-fit">
                <h2 className="card-title">{product.title}</h2>
                <p className="sm:pr-10">{product.description}</p>
                <div className="card-actions justify-end">
                    <Link href={`/product/${product.id}`}>
                        <button className="btn btn-primary">More</button>
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default TrendingCard;
