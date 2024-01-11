const Timeline = ({timeline}) => {
    return (

        <ol className="relative border-s border-base-300">
            {timeline.map((item, index) => (
                <li key={index} className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-base-300 rounded-full mt-1.5 -start-1.5 border border-base-300"></div>
                    <time className="mb-1 text-sm font-normal leading-none">
                        {item.date}
                    </time>
                    <h3 className="text-lg font-semibold">
                        {item.heading}
                    </h3>
                    <p className="mb-4 text-base font-normal">
                        {item.description}
                    </p>
                </li>
            ))}
        </ol>
    );
}

export default Timeline;