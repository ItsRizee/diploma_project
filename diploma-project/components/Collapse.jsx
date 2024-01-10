const Collapse = ({ id, categoryName, content, titleSize = "text-xl", bgColor = "bg-base-200 dark:bg-gray-800" }) => {
    return (
        <details tabIndex={id} className={`collapse collapse-arrow border border-base-300 ${bgColor} transition-all duration-500`}>
            <summary className={`collapse-title ${titleSize} font-medium cursor-pointer`}>
                { categoryName }
            </summary>
            <div className="collapse-content overflow-x-auto overflow-y-hidden -ml-5">
                { content }
            </div>
        </details>
    );
}

export default Collapse;