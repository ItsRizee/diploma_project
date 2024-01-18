const InputField = ({ id, labelText, type, placeholder, value, onChange }) => {
    return (
        <div className="form-control">
            <label htmlFor={id} className="label">
                <span className="label-text">{labelText}</span>
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                className="input input-bordered w-full"
                required
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;
