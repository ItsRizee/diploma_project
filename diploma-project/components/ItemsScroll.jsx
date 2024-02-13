import {useUserStore} from "../store/userStorage";
import ItemsScrollWithArrows from "./ItemsScrollWithArrows";

const ItemsScroll = ({categoryName = "", listOfItems, message = ""}) => {
    const { isTouchEnabled } = useUserStore((state) => ({isTouchEnabled: state.isTouchEnabled}));

    return (
        isTouchEnabled === true ? (
            <section className="ml-5 mr-5 space-y-5 w-auto">
                <h2 className="font-bold text-xl sm:text-2xl my-5">{categoryName}</h2>
                {listOfItems.length > 0 ?
                    <div className="overflow-x-auto no-scrollbar w-auto py-2">
                        <div className="flex space-x-5 pt-2">
                            {listOfItems.map((item) => (
                                <div key={`item-${item.key}}`}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div> :
                    <div className="flex items-center">
                        <p className="text-xl opacity-60">{message}</p>
                    </div>
                }
            </section>
            ) : (
            <ItemsScrollWithArrows listOfItems={listOfItems} categoryName={categoryName} message={message}/>
        )
    )
}
export default ItemsScroll;