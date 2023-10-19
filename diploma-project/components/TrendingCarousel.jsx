import React from "react";
import Carousel from "./Carousel";
import CarouselWithArrows from "./CarouselWithArrows";

export default function TrendingCarousel({categoryName, listOfItems}) {

    // const isTouchDevice = () => {
    //     return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    // }

    const isTouchDevice = () => {
        return true;
    }

    return (
        <div className="h-full w-full">
            {isTouchDevice() ?
                <Carousel categoryName={categoryName} listOfItems={listOfItems}/> :
                <CarouselWithArrows categoryName={categoryName} listOfItems={listOfItems}/>
            }
        </div>
    );
}