export const ElegantButton = ({ children, onClick, className = "" }) => (
    <button
        onClick={onClick}
        className={`relative overflow-hidden bg-amber-300 text-amber-800 py-1 px-7 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${className}`}
    >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-400 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute -bottom-1 -right-1 w-12 h-12 bg-white rounded-full opacity-20"></span>
        <span className="absolute -top-1 -left-1 w-8 h-8 bg-white rounded-full opacity-20"></span>
    </button>
);