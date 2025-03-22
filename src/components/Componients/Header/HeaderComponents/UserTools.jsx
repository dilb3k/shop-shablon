import { GoldBadge } from "../../../ui/Badges/GoldBadge";
import CartDropDown from "./CartDropDown";
import { ElegantButton } from "./Elegant";
import { FavoritesDropdown } from "./FavoritesDropDown";

export const UserTools = ({ openModal }) => (
    <div className="flex items-center space-x-6">
        <FavoritesDropdown />

        <div className="relative group">
            <button className="flex flex-col items-center text-amber-500 hover:text-amber-400 transition-colors duration-300">
                <div className="relative">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <GoldBadge count="3" />
                </div>
                <span className="text-xs mt-1 font-serif">Solishtirish</span>
            </button>
        </div>

        <CartDropDown />


    </div>
);