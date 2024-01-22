const Textarea = ({ id, labelText, placeholder, value, onChange, height = "h-44" }) => {
    return (
        <div className="form-control">
            <label htmlFor={id} className="label">
                <span className="label-text">{labelText}</span>
            </label>
            <textarea
                id={id}
                placeholder={placeholder}
                value={value}
                className={`textarea textarea-bordered w-full ${height} resize-none`}
                required
                onChange={onChange}
            />
        </div>
    );
}

export default Textarea;