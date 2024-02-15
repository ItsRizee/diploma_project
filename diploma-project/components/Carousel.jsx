import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import horizontalScrollHint from "../public/horizontal_scroll_hint.json";

const Carousel = ({ categoryName, listOfItems }) => {
    const [showLottie, setShowLottie] = useState(false);
    const [isSwiped, setIsSwiped] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        let timer;
        let currentCarouselRef = carouselRef.current; // Create a variable to store carouselRef.current

        // Function to hide the Lottie animation
        const hideLottie = () => {
            if (currentCarouselRef && !isSwiped) {
                setShowLottie(false);
                setIsSwiped(true);
                clearTimeout(timer);
            }
        };

        // Attach event listeners to the specific carousel element
        if (currentCarouselRef) {
            let touchStartX;

            const handleTouchStart = (e) => {
                touchStartX = e.touches[0].clientX;
            };

            const handleTouchMove = (e) => {
                const touchEndX = e.touches[0].clientX;
                const deltaX = touchEndX - touchStartX;

                if (Math.abs(deltaX) > 40) { // Adjust this threshold as needed
                    hideLottie();
                }
            };

            currentCarouselRef.addEventListener("touchstart", handleTouchStart);
            currentCarouselRef.addEventListener("touchmove", handleTouchMove);

            // Set a timer to show the Lottie animation after 15 seconds
            timer = setTimeout(() => {
                if (!isSwiped) setShowLottie(true);
            }, 5000);

            // Cleanup: Remove event listeners when the component unmounts
            return () => {
                if (currentCarouselRef) {
                    currentCarouselRef.removeEventListener("touchstart", handleTouchStart);
                    currentCarouselRef.removeEventListener("touchmove", handleTouchMove);
                }
                clearTimeout(timer);
            };
        }
    }, [isSwiped, carouselRef]);

    return (
        <section className="ml-5 mr-5 space-y-5 w-auto relative">
            <h2 className="font-bold text-xl sm:text-2xl my-5">{categoryName}</h2>
            <div className="w-full h-full" ref={carouselRef}>
                <div className="w-full carousel space-x-4 z-0 rounded-box">
                    {listOfItems.map((item, index) => (
                        <div key={`trending-${index}`} className="carousel-item w-full relative">
                            {item}
                        </div>
                    ))}
                </div>

                {showLottie && (
                    <div className="absolute -top-12 bottom-0 left-0 right-0 flex flex-col justify-center items-center z-1 pointer-events-none">
                        <div className="absolute top-12 sm:top-1 sm:bottom-1.5 inset-0 bg-black opacity-70 rounded-box mt-12 sm:mt-24 z-0"></div>
                        <Lottie animationData={horizontalScrollHint} />
                        <p className="mt-12 absolute top-1/2 transform -translate-y-1/2 font-bold text-2xl text-gray-100">Swipe left</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Carousel;