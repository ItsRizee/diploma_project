const Collapse = ({ id, categoryName, content }) => {
    return (
        <details tabIndex={id} className="collapse collapse-arrow border border-base-300 bg-base-200 dark:bg-gray-800 transition-all duration-500">
            <summary className="collapse-title text-xl font-medium cursor-pointer">
                { categoryName }
            </summary>
            <div className="collapse-content overflow-x-auto overflow-y-hidden -ml-5">
                { content }
            </div>
        </details>
    );
}

export default Collapse;