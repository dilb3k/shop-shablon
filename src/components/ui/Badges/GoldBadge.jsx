export const GoldBadge = ({ count }) => (
    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#d4af37] to-[#f1c40f] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md border border-white">
        {count > 9 ? "+9" : count}
    </span>
);