import { Carousel, CarouselWithArrows} from "../components"
import {useUserStore} from "../store/userStorage";

export default function TrendingCarousel({categoryName, listOfItems}) {
    const { isTouchEnabled } = useUserStore((state) => ({isTouchEnabled: state.isTouchEnabled}));

    if(listOfItems.length === 0) {
        return (
            <div className="h-full w-full">
                <section className="ml-5 mr-5 space-y-5 w-auto">
                    <h2 className="font-bold text-xl sm:text-2xl my-5">{categoryName}</h2>
                    <div className="flex items-center">
                        <p className="text-xl opacity-60">There are no items to display.</p>
                    </div>
                </section>
            </div>
    );
    }

    return (
        <div className="h-full w-full">
            {isTouchEnabled ?
                <Carousel categoryName={categoryName} listOfItems={listOfItems}/> :
                <CarouselWithArrows categoryName={categoryName} listOfItems={listOfItems}/>
            }
        </div>
    );
}