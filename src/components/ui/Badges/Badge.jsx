// components/UI/Badge/Badge.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
    children,
    variant = 'gold',
    size = 'medium',
    rounded = 'full',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium';

    const variantStyles = {
        gold: 'bg-amber-100 text-amber-800',
        white: 'bg-white text-amber-700 border border-amber-200',
        outline: 'bg-transparent text-amber-700 border border-amber-300',
        elegant: 'bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-800'
    };

    const sizeStyles = {
        small: 'text-xs px-2 py-0.5',
        medium: 'text-sm px-2.5 py-1',
        large: 'text-base px-3 py-1.5'
    };

    const roundedStyles = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
    };

    const badgeClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${roundedStyles[rounded]}
    ${className}
  `;

    return (
        <span className={badgeClasses.trim()} {...props}>
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['gold', 'white', 'outline', 'elegant']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full']),
    className: PropTypes.string
};

export default Badge;