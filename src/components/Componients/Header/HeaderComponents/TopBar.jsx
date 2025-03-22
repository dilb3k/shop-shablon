import { ElegantButton } from "./Elegant";

export const TopBar = ({ currency, setCurrency ,openModal}) => (
    

    <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 py-2 px-8 flex justify-between items-center text-xs border-b border-amber-200">
        <style>
            {`
                    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&display=swap');
                    
                    .font-cormorant {
                        font-family: 'Cormorant Garamond', serif;
                    }
                    
                    .font-greatvibes {
                        font-family: 'Great Vibes', cursive;
                    }
                    
                    .nav-gradient {
                        background: linear-gradient(to right, #f5f5f5, #ffffff, #f5f5f5);
                        border-bottom: 1px solid #d4af37;
                    }
                    
                    .gold-text {
                        color: #d4af37;
                    }
                    
                    .gold-border {
                        border-color: #d4af37;
                    }
                    
                    .gold-bg {
                        background-color: #d4af37;
                    }
                    
                    .category-card {
                        border: 1px solid #f5f5f5;
                        transition: all 0.3s ease;
                    }
                    
                    .category-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
                        border-color: #d4af37;
                    }
                    
                    .gold-hover:hover {
                        color: #d4af37 !important;
                    }
                    
                    .menu-item-hover:hover {
                        background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
                    }
                    
                    .gold-shadow {
                        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15);
                    }
                `}
        </style>
        <div className="flex items-center space-x-6 text-amber-700">
            <div className="flex items-center group">
                <svg className="h-4 w-4 text-amber-400 mr-1 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-serif font-medium tracking-wider">+998 90 123 45 67</span>
            </div>
            <div className="flex items-center group">
                <svg className="h-4 w-4 text-amber-400 mr-1 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-serif font-medium tracking-wider">info@wedding.uz</span>
            </div>
            <div className="flex items-center group">
                <svg className="h-4 w-4 text-amber-400 mr-1 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-serif font-medium tracking-wider">Ish vaqti: 9:00 - 18:00</span>
            </div>
        </div>

        <div className="flex items-center space-x-4">
    
       

            <div className="flex items-center space-x-2">
                <select className="bg-white border border-amber-200 relative overflow-hidden bg-amber-300 text-amber-800 py-1 px-5 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ">
                    <option value="uz">UZ</option>
                    <option value="ru">RU</option>
                    <option value="en">EN</option>
                </select>
            </div>
            <ElegantButton onClick={openModal} className="ml-2">
                <div className="flex items-center space-x-2 font-serif">
                    <svg className="h-4 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            </ElegantButton>
        </div>
    </div>
);
