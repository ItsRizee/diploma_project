const ItemsScroll = ({categoryName, listOfItems}) => {
    return (
        <div className="ml-5 space-y-5 w-auto">
            <h2 className="font-bold text-xl sm:text-2xl my-5">{categoryName}</h2>
            <div className="overflow-x-auto no-scrollbar w-auto py-2">
                <div className="flex space-x-5">
                    {listOfItems.map((item) => (
                        item
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ItemsScroll;