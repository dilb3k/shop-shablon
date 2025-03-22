// components/UI/Select/Select.jsx
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Select = forwardRef(({
    label,
    options = [],
    value,
    onChange,
    name,
    id,
    error,
    helperText,
    disabled = false,
    required = false,
    fullWidth = true,
    placeholder = 'Tanlang...',
    className = '',
    ...props
}, ref) => {

    const selectId = id || name;

    const baseSelectStyles = `
    px-4 py-2 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-2 
    focus:ring-amber-300 transition-all duration-300 pr-10
  `;

    const errorStyles = error
        ? "border-red-300 focus:border-red-300 focus:ring-red-100"
        : "border-gray-200 focus:border-amber-300";

    const disabledStyles = disabled
        ? "bg-gray-50 cursor-not-allowed text-gray-500"
        : "bg-white";

    const widthStyles = fullWidth ? "w-full" : "";

    const selectClasses = `
    ${baseSelectStyles}
    ${errorStyles}
    ${disabledStyles}
    ${widthStyles}
    ${className}
  `;

    return (
        <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
            {label && (
                <label
                    htmlFor={selectId}
                    className={`block mb-2 font-medium text-sm ${error ? 'text-red-600' : 'text-gray-700'}`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                <select
                    ref={ref}
                    id={selectId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={selectClasses.trim()}
                    {...props}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-amber-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>

            {(error && helperText) && (
                <p className="mt-1 text-sm text-red-600">{helperText}</p>
            )}

            {(!error && helperText) && (
                <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

Select.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string
};

export default Select;