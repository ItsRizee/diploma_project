const ItemsScroll = ({categoryName = "", listOfItems}) => {
    return (
        <section className="ml-5 mr-5 space-y-5 w-auto">
            <h2 className="font-bold text-xl sm:text-2xl my-5">{categoryName}</h2>
            <div className="overflow-x-auto no-scrollbar w-auto py-2">
                <div className="flex space-x-5 pt-2">
                    {listOfItems.map((item) => (
                        <div key={item.key}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default ItemsScroll;