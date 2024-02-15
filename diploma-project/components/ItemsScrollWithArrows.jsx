import {useCallback, useEffect, useRef, useState} from "react";
import {ChevronLeft, ChevronRight} from "react-feather";

const ItemsScrollWithArrows = ({categoryName = "", listOfItems, message = ""}) => {
    const [curr, setCurr] = useState(0);
    const [translation, setTranslation] = useState(null);
    const [timesToScroll, setTimesToScroll] = useState(null);
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const spacingInPixels = 20;

    const prev = useCallback(() => setCurr((curr) => (curr === 0 ? 0 : curr - 1)), []);
    const next = useCallback(() => setCurr((curr) => (curr === listOfItems.length - 1 ? listOfItems.length - 1  : curr + 1)), [listOfItems.length]);

    const resetToFirst = () => setCurr(0);

    useEffect(() => {
        const updateCardWidth = () => {
            if(listOfItems.length === 0) {
                setTranslation(null);
            } else if (containerRef.current) {
                const cardWidth = cardRef.current.getBoundingClientRect().width;
                if(cardWidth) {
                    let itemScrollWidth = listOfItems.length * cardWidth + (listOfItems.length - 1) * spacingInPixels - containerRef.current.offsetWidth;
                    if (itemScrollWidth > 0) {
                        const temp = Math.ceil(itemScrollWidth / 680);
                        setTimesToScroll(temp);
                        setTranslation(itemScrollWidth / temp);
                    } else {
                        setTranslation(null);
                    }
                    resetToFirst(); // Reset to the first element on window resize
                }
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
    }, [listOfItems]);

    const calculateTranslation = () => {
        if(translation === null) {
            return 0;
        }
        return curr * translation;
    };

    return (
        <section className="relative ml-5 mr-5 space-y-5 w-auto">
            <h2 className="font-bold text-xl sm:text-2xl my-5">{categoryName}</h2>
            { listOfItems.length > 0 ?
                <div className="relative overflow-x-hidden no-scrollbar w-auto py-2" ref={containerRef}>
                    <div className="flex space-x-5 pt-2 transition-transform ease-out duration-500" style={{ transform: `translateX(-${calculateTranslation()}px)` }}>
                        {listOfItems.map((item, index) => (
                            <div id={`item-${index}`} key={`item-${item.key}`} className="carousel-item" ref={index === 0 ? cardRef : null}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div> :
                <div className="flex items-center">
                    <p className="text-xl opacity-60">{message}</p>
                </div>
            }
            { listOfItems.length > 0 && translation !== null &&
                <div className="absolute -inset-10 flex items-center justify-between p-4 pointer-events-none">
                    <button className={`p-1 rounded-full shadow-xl text-gray-800 opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-80 ${curr === 0 ? "bg-base-content/30" : "bg-base-content pointer-events-auto"}`}
                            onClick={() => {
                                if(curr !== 0) {
                                    prev();
                                }
                            }}>
                        <ChevronLeft className="text-base-100" size={40}/>
                    </button>
                    <button
                        className={`p-1 rounded-full shadow-xl text-gray-800 opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-80 ${curr === timesToScroll ? "bg-base-content/30" : "bg-base-content pointer-events-auto"}`}
                        onClick={() => {
                            if (curr !== timesToScroll) {
                                next();
                            }
                        }}>
                        <ChevronRight className="text-base-100" size={40}/>
                    </button>
                </div>
            }
        </section>
    )
}
export default ItemsScrollWithArrows;