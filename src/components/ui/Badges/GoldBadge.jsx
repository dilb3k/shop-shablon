export const GoldBadge = ({ count }) => (
    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-300 to-amber-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md border border-white">
        {count > 9 ? "+9" : count}

    </span>
);
