import { GoldBadge } from "../../../ui/Badges/GoldBadge";
import CartDropDown from "./CartDropDown";
import { ElegantButton } from "./Elegant";
import { FavoritesDropdown } from "./FavoritesDropDown";

export const UserTools = ({ openModal }) => (
    <div className="flex items-center space-x-6">
        <FavoritesDropdown />



        <CartDropDown />


    </div>
);