// components/UI/Input/Input.jsx
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    name,
    id,
    error,
    helperText,
    disabled = false,
    required = false,
    fullWidth = true,
    className = '',
    icon,
    ...props
}, ref) => {

    const inputId = id || name;

    const baseInputStyles = `
    px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 
    transition-all duration-300 placeholder:text-gray-400
  `;

    const errorStyles = error
        ? "border-red-300 focus:border-red-300 focus:ring-red-100"
        : "border-gray-200 focus:border-amber-300";

    const disabledStyles = disabled
        ? "bg-gray-50 cursor-not-allowed text-gray-500"
        : "bg-white";

    const widthStyles = fullWidth ? "w-full" : "";

    const iconStyles = icon ? "pl-10" : "";

    const inputClasses = `
    ${baseInputStyles}
    ${errorStyles}
    ${disabledStyles}
    ${widthStyles}
    ${iconStyles}
    ${className}
  `;

    return (
        <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className={`block mb-2 font-medium text-sm ${error ? 'text-red-600' : 'text-gray-700'}`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-amber-600">
                        {icon}
                    </div>
                )}

                <input
                    ref={ref}
                    type={type}
                    id={inputId}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={inputClasses.trim()}
                    {...props}
                />
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

Input.displayName = 'Input';

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.node
};

export default Input;