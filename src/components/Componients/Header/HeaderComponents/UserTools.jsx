import { GoldBadge } from "../../../ui/Badges/GoldBadge";
import CartDropDown from "../../Cart/CartDropDown";
import ElegantButton from "./Elegant";
import FavoritesDropDown from "./FavoritesDropDown"

export const UserTools = ({ openLoginModal }) => (
    <div className="flex items-center space-x-6">
        <FavoritesDropDown />



        <CartDropDown />
        <ElegantButton openLoginModal={openLoginModal} className="ml-2">
            <div className="flex items-center space-x-2 font-serif">
                <svg className="h-4 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
        </ElegantButton>


    </div>
);