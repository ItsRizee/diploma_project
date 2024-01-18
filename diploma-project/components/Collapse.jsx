const Collapse = ({ id, categoryName, content, titleSize = "text-xl" }) => {
    return (
        <details tabIndex={id} className="collapse collapse-arrow border border-base-300 bg-base-300 transition-all duration-500">
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