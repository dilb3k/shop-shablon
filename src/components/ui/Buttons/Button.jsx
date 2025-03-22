// components/UI/Button/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    className = '',
    ...props
}) => {
    const baseStyles = "font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300";

    const variantStyles = {
        primary: "bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white shadow-md hover:shadow-lg focus:ring-offset-2",
        secondary: "bg-white hover:bg-gray-50 text-amber-700 border border-amber-300 hover:border-amber-400 shadow-sm hover:shadow",
        outline: "bg-transparent hover:bg-amber-50 text-amber-700 border border-amber-300 hover:border-amber-400",
        text: "bg-transparent hover:bg-amber-50 text-amber-700 hover:text-amber-800"
    };

    const sizeStyles = {
        small: "py-1 px-3 text-sm",
        medium: "py-2 px-4",
        large: "py-3 px-6 text-lg"
    };

    const disabledStyles = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
    const widthStyles = fullWidth ? "w-full" : "";

    const buttonClasses = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${disabledStyles} 
    ${widthStyles} 
    ${className}
  `;

    return (
        <button
            type={type}
            className={buttonClasses.trim()}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string
};

export default Button;