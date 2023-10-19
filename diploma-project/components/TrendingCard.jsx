import React from "react";

const TrendingCard = () => {
    return (
        <div className="card sm:card-side bg-base-100 shadow-2xl border-b-2 sm:border-b-0 border-gray-400 w-full h-full">
            <figure className="overflow-hidden w-full sm:w-auto sm:h-full">
                <img src="/recommended_ring.jpg" alt="Album" className="w-full sm:h-full"/>
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