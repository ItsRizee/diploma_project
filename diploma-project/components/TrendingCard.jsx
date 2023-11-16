import Image from "next/future/image";

const TrendingCard = () => {
    return (
        <div className="card sm:card-side bg-base-100 shadow-2xl border-b-2 sm:border-b-0 border-gray-400 w-full h-full flex">
            <figure className="relative h-72 sm:h-96 sm:w-96">
                <Image src="/recommended_ring.jpg" alt="Trending ring" className="object-cover object-center" fill />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Trending and popular!</h2>
                <p>Click the button to see this masterpiece.</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">More</button>
                </div>
            </div>
        </div>
    );
}

export default TrendingCard;
