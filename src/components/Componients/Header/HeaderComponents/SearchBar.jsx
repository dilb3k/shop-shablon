import "../../../../index.css";

export const SearchBar = ({ searchValue, setSearchValue }) => (
    <div className="flex-1 mx-8 max-w-2xl relative">
        <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Mahsulotlarni qidiring..."
            className="search-input"
        />
        <span className="search-icon">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </span>
    </div>
);
