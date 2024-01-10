import {useCallback, useEffect, useRef, useState} from "react";
import {ChevronLeft, ChevronRight} from "react-feather";

const CarouselWithArrows = ({ categoryName, listOfItems, autoSlide = false, autoSlideInterval = 3000 }) => {
    const [curr, setCurr] = useState(0);
    const containerRef = useRef(null);
    const cardWidthRef = useRef(0);

    const prev = useCallback(() => setCurr((curr) => (curr === 0 ? listOfItems.length - 1 : curr - 1)), [listOfItems.length]);
    const next = useCallback(() => setCurr((curr) => (curr === listOfItems.length - 1 ? 0 : curr + 1)), [listOfItems.length]);

    const resetToFirst = () => setCurr(0);

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [autoSlide, autoSlideInterval, next]);

    useEffect(() => {
        const updateCardWidth = () => {
            if (containerRef.current) {
                cardWidthRef.current = containerRef.current.querySelector(".carousel-item").getBoundingClientRect().width;
                resetToFirst(); // Reset to the first element on window resize
            }
        };

        // Initial update
        updateCardWidth();

        // Listen for window resize and update card width
        window.addEventListener("resize", updateCardWidth);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", updateCardWidth);
        };
    }, []);

    const calculateTranslation = () => {
        const spacingInPixels = 8; // Assuming a constant spacing of 8 pixels
        return curr * (cardWidthRef.current + spacingInPixels);
    };

    return (
        <section className="ml-5 mr-5 space-y-5 w-auto">
            <h2 className="font-bold text-xl sm:text-2xl my-5">{categoryName}</h2>
            <div className="overflow-hidden relative shadow-2xl rounded-box" ref={containerRef}>
                <div
                    className="flex w-full h-full transition-transform ease-out duration-500 space-x-2"
                    style={{ transform: `translateX(-${calculateTranslation()}px)` }}
                >
                    {listOfItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full h-full carousel-item"
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-between p-4">
                    <button onClick={prev} className="p-1 rounded-full shadow-xl bg-white/80 text-gray-800 hover-bg-white">
                        <ChevronLeft size={40} />
                    </button>
                    <button onClick={next} className="p-1 rounded-full shadow-xl bg-white/80 text-gray-800 hover-bg-white">
                        <ChevronRight size={40} />
                    </button>
                </div>
                <div className="absolute bottom-4 right-0 left-0">
                    <div className="flex items-center justify-center gap-2">
                        {listOfItems.map((_, i) => (
                            <div key={i} className={`transition-all w-3 h-3 bg-slate-500 dark:bg-white rounded-full ${curr === i ? "p-2" : "bg-opacity-50"}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CarouselWithArrows;
