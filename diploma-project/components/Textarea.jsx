const Textarea = ({ labelText, type, placeholder, value, onChange }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{labelText}</span>
            </label>
            <textarea
                placeholder={placeholder}
                value={value}
                className="textarea textarea-bordered w-full h-44 resize-none"
                required
                onChange={onChange}
            />
        </div>
    );
}

export default Textarea;