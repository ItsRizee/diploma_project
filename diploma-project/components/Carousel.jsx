import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import horizontalScrollHint from "../public/horizontal_scroll_hint.json";

const Carousel = ({ categoryName, listOfItems }) => {
    const [showLottie, setShowLottie] = useState(false);
    const [isSwiped, setIsSwiped] = useState(false);
    const isSwipedRef = useRef(isSwiped);
    isSwipedRef.current = isSwiped;
    const carouselRef = useRef(null);

    useEffect(() => {
        let timer;

        // Set a timer to show the Lottie animation after 15 seconds
        timer = setTimeout(() => {
            if (!isSwipedRef.current) setShowLottie(true);
        }, 15000);

        // Function to hide the Lottie animation
        const hideLottie = () => {
            if (carouselRef.current && !isSwipedRef.current) {
                setShowLottie(false);
                setIsSwiped(true);
                clearTimeout(timer);
            }
        };

        // Attach event listeners to the specific carousel element
        if (carouselRef.current) {
            carouselRef.current.addEventListener("click", hideLottie);
            carouselRef.current.addEventListener("touchstart", hideLottie);

            // Cleanup: Remove event listeners when the component unmounts
            return () => {
                if (carouselRef.current) {
                    carouselRef.current.removeEventListener("click", hideLottie);
                    carouselRef.current.removeEventListener("touchstart", hideLottie);
                }
            };
        }
    }, []);

    return (
        <div className="ml-5 mr-5 space-y-5 w-auto relative" ref={carouselRef}>
            <h2 className="font-bold text-xl sm:text-2xl my-5">{categoryName}</h2>
            <div className="w-full carousel rounded-box space-x-2 z-0">
                {listOfItems.map((item, index) => (
                    <div key={index} className="carousel-item w-full relative">
                        {item}
                    </div>
                ))}
            </div>

            {showLottie && (
                <div className="absolute -top-12 bottom-0 left-0 right-0 flex flex-col justify-center items-center z-10 pointer-events-none">
                    <div className="absolute top-12 inset-0 bg-black opacity-70 rounded-box mt-12 z-0"></div>
                    <Lottie animationData={horizontalScrollHint} />
                    <p className="mt-12 absolute top-1/2 transform -translate-y-1/2 font-bold text-2xl text-gray-600 dark:text-gray-100">Swipe left</p>
                </div>
            )}
        </div>
    );
};

export default Carousel;