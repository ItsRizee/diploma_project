import { Carousel, CarouselWithArrows} from "../components"
import {useUserStore} from "../store/userStorage";

export default function TrendingCarousel({categoryName, listOfItems}) {
    const { isTouchEnabled } = useUserStore((state) => ({isTouchEnabled: state.isTouchEnabled}));


    return (
        <div className="h-full w-full">
            {isTouchEnabled ?
                <Carousel categoryName={categoryName} listOfItems={listOfItems}/> :
                <CarouselWithArrows categoryName={categoryName} listOfItems={listOfItems}/>
            }
        </div>
    );
}