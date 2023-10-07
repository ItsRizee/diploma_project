import React from 'react';

const InputField = ({ labelText, type, placeholder, value, onChange, error }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{labelText}</span>
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                className="input input-bordered"
                required
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;
