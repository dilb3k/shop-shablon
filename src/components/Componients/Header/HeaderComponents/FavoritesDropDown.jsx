import { GoldBadge } from "../../../ui/Badges/GoldBadge";

export const FavoritesDropdown = () => (
    <div className="relative group">
        <button className="flex flex-col items-center text-amber-500 hover:text-amber-400 transition-colors duration-300">
            <div className="relative">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <GoldBadge count="2" />
            </div>
            <span className="text-xs mt-1 font-serif">Saralanganlar</span>
        </button>
        <div className="absolute right-0 z-10 mt-2 w-72 hidden group-hover:block">
            <div className="bg-white rounded-lg shadow-lg border border-amber-100 p-4 transform transition-all duration-300">
                <div className="flex justify-between items-center border-b border-amber-100 pb-2 mb-3">
                    <h3 className="font-semibold font-serif text-amber-700">Saralanganlar</h3>
                    <span className="text-xs bg-amber-50 text-amber-600 px-2 py-1 rounded-full font-serif">2 mahsulot</span>
                </div>
                <ul className="space-y-3">
                    <li className="flex space-x-3 hover:bg-amber-50 p-2 rounded-lg transition-colors duration-200">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-white rounded-lg flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full shadow-inner"></div>
                        </div>
                        <div className="text-xs font-serif">
                            <p className="font-semibold text-amber-800">Kelin libosi "Sofia"</p>
                            <p className="text-amber-500 font-bold mt-1">2,500,000 so'm</p>
                            <div className="flex space-x-1 mt-1">
                                <span className="bg-amber-50 text-amber-600 text-xs px-2 rounded-full">Premium</span>
                                <span className="bg-amber-50 text-amber-600 text-xs px-2 rounded-full">Yangi</span>
                            </div>
                        </div>
                    </li>
                    <li className="flex space-x-3 hover:bg-amber-50 p-2 rounded-lg transition-colors duration-200">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-white rounded-lg flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full shadow-inner"></div>
                        </div>
                        <div className="text-xs font-serif">
                            <p className="font-semibold text-amber-800">Kelin toji "Diana"</p>
                            <p className="text-amber-500 font-bold mt-1">450,000 so'm</p>
                            <div className="flex space-x-1 mt-1">
                                <span className="bg-amber-50 text-amber-600 text-xs px-2 rounded-full">Zumrad</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <button className="w-full mt-3 py-2 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-white text-sm rounded-lg transition-colors duration-300 shadow-md font-serif">
                    Ko'rish
                </button>
            </div>
        </div>
    </div>
);
