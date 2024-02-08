import {useCallback, useEffect, useRef, useState} from "react";
import {ChevronLeft, ChevronRight} from "react-feather";

const ItemsScrollWithArrows = ({categoryName = "", listOfItems, message = ""}) => {
    const [curr, setCurr] = useState(0);
    const [translation, setTranslation] = useState(null);
    const [timesToScroll, setTimesToScroll] = useState(null);
    const containerRef = useRef(null);
    const cardWidthRef = useRef(0);
    const spacingInPixels = 20;

    const prev = useCallback(() => setCurr((curr) => (curr === 0 ? 0 : curr - 1)), []);
    const next = useCallback(() => setCurr((curr) => (curr === listOfItems.length - 1 ? listOfItems.length - 1  : curr + 1)), [listOfItems.length]);

    const resetToFirst = () => setCurr(0);

    useEffect(() => {
        const updateCardWidth = () => {
            if (containerRef.current) {
                cardWidthRef.current = containerRef.current.querySelector(".carousel-item").getBoundingClientRect().width;
                let itemScrollWidth = listOfItems.length * cardWidthRef.current + (listOfItems.length - 1) * spacingInPixels - containerRef.current.offsetWidth;
                if(itemScrollWidth > 0) {
                    const temp = Math.ceil(itemScrollWidth / 680);
                    setTimesToScroll(temp);
                    setTranslation(itemScrollWidth / temp);
                }
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
        return curr * translation;
    };

    return (
        <section className="ml-5 mr-5 space-y-5 w-auto">
            <h2 className="font-bold text-xl sm:text-2xl my-5">{categoryName}</h2>
            { listOfItems.length > 0 ?
                <div className="relative overflow-x-hidden no-scrollbar w-auto py-2" ref={containerRef}>
                    <div className="flex space-x-5 pt-2 transition-transform ease-out duration-500" style={{ transform: `translateX(-${calculateTranslation()}px)` }}>
                        {listOfItems.map((item) => (
                            <div key={item.key} className="carousel-item">
                                {item}
                            </div>
                        ))}
                    </div>
                    { translation !== null &&
                        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                            <button className={`p-1 rounded-full shadow-xl text-gray-800 ${curr === 0 ? "bg-base-content/30" : "bg-base-content pointer-events-auto"}`}
                                    onClick={() => {
                                        if(curr !== 0) {
                                            prev();
                                        }
                                    }}>
                                <ChevronLeft className="text-base-100" size={40}/>
                            </button>
                            <button
                                className={`p-1 rounded-full shadow-xl text-gray-800 ${curr === timesToScroll ? "bg-base-content/30" : "bg-base-content pointer-events-auto"}`}
                                onClick={() => {
                                    if (curr !== timesToScroll) {
                                        next();
                                    }
                                }}>
                                <ChevronRight className="text-base-100" size={40}/>
                            </button>
                        </div>
                    }
                </div> :
                <div className="flex items-center">
                    <p className="text-xl opacity-60">{message}</p>
                </div>
            }
        </section>
    )
}
export default ItemsScrollWithArrows;