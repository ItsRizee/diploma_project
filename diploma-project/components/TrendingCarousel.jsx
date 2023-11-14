import Carousel from "./Carousel";
import CarouselWithArrows from "./CarouselWithArrows";

export default function TrendingCarousel({categoryName, listOfItems}) {

    const isTouchEnabled = window.matchMedia("(pointer: coarse)").matches;

    return (
        <div className="h-full w-full">
            {isTouchEnabled ?
                <Carousel categoryName={categoryName} listOfItems={listOfItems}/> :
                <CarouselWithArrows categoryName={categoryName} listOfItems={listOfItems}/>
            }
        </div>
    );
}