import React from "react";

const carouselItem = (item) => {
    return (
        <div className="carousel-item">
            <button className="btn-none w-full h-full">
                {item}
            </button>
        </div>
    )
}

const Carousel = ({categoryName, listOfItems}) => {

    return (
        <div className="m-10 space-y-5">
            <h2 className="font-bold text-3xl my-5">{categoryName}</h2>
            <div className="carousel carousel-center w-screen space-x-5 rounded-box">
                {listOfItems.map((item) => carouselItem(item))}
            </div>
        </div>
    )
}

export default Carousel;