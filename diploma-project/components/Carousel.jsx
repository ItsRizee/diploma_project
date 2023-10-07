import React from "react";
import ProductCard from "./ProductCard";

const Carousel = ({categoryName}) => {
    return (
        <div className="m-10 space-y-5">
            <h2 className="font-bold text-3xl my-5">{categoryName}</h2>
            <div className="carousel carousel-center w-screen space-x-5 rounded-box">
                <div className="carousel-item">
                    <ProductCard className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <ProductCard className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <ProductCard className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <ProductCard className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <ProductCard className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <ProductCard className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <ProductCard className="rounded-box" />
                </div>
            </div>
        </div>
    )
}

export default Carousel;