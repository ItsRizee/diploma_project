const Collapse = ({ id, categoryName, content }) => {
    return (
        <div tabIndex={id} className="collapse collapse-arrow border border-base-300 bg-base-200 dark:bg-gray-800">
            <div className="collapse-title text-xl font-medium">
                { categoryName }
            </div>
            <div className="collapse-content overflow-x-auto overflow-y-hidden -ml-5">
                { content }
            </div>
        </div>
    );
}

export default Collapse;