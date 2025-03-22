export const Logo = () => (
    <div className="flex items-center space-x-3 group">
        <div className="relative overflow-hidden rounded-full transform transition-transform duration-500 group-hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50 opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>
            <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-md border border-amber-100">
                <span className="font-serif text-2xl text-amber-400 italic">WS</span>
            </div>
        </div>

        <div className="hidden sm:block">
            <h1 className="text-2xl font-serif font-black text-amber-700 tracking-widest">WEDDING <span className="text-amber-400">STYLE</span></h1>
            <p className="text-xs text-amber-300 tracking-wider font-medium">TO'Y LIBOSLARI SALONI</p>
        </div>
    </div>
);