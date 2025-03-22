export const MenuItem = ({ to, children, className = "" }) => (
    <a href={to} className={`cursor-pointer ${className}`}>
        {children}
    </a>
);
