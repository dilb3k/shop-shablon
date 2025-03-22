
export const DropdownMenuItem = ({ title, items }) => (
    <div className="group relative">
        <a href={`/${title.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center space-x-1 hover:text-amber-500 transition-colors duration-300">
            <span>{title}</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </a>
        <div className="absolute left-0 z-50 mt-1 hidden group-hover:block transform transition-transform duration-300 origin-top-left">
            <div className="w-64 bg-white rounded-lg shadow-lg border border-amber-100 py-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 to-amber-400"></div>
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        className="block px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 hover:text-amber-500 font-serif"
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </div>
    </div>
);
