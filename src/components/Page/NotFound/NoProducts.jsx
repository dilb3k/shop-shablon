import { AlertCircle } from 'lucide-react';

export default function NoProducts() {
    return (
        <div className="bg-white rounded-lg shadow-sm p-10 max-w-md mx-auto text-center">
            {/* More clear and elegant illustration */}
            <div className="mb-6 flex justify-center">
                <div className="relative">
                    <svg width="240" height="180" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
                        {/* Empty display box/shelf */}
                        <rect x="40" y="100" width="160" height="60" rx="2" fill="#f8f8f8" stroke="#e5e5e5" strokeWidth="2" />
                        <rect x="55" y="90" width="130" height="10" fill="#f0f0f0" stroke="#e5e5e5" strokeWidth="2" />
                        <rect x="70" y="80" width="100" height="10" fill="#f0f0f0" stroke="#e5e5e5" strokeWidth="2" />

                        {/* Gold decorative elements */}
                        <path d="M40 100H200" stroke="#d4af37" strokeWidth="1" />
                        <path d="M55 90H185" stroke="#d4af37" strokeWidth="1" />
                        <path d="M70 80H170" stroke="#d4af37" strokeWidth="1" />

                        {/* Empty sign - crossed display */}
                        <line x1="60" y1="110" x2="180" y2="150" stroke="#e0e0e0" strokeWidth="2" />
                        <line x1="60" y1="150" x2="180" y2="110" stroke="#e0e0e0" strokeWidth="2" />

                        {/* Wedding rings to show theme */}
                        <circle cx="100" cy="50" r="15" stroke="#d4af37" strokeWidth="2" fill="none" />
                        <circle cx="120" cy="50" r="15" stroke="#d4af37" strokeWidth="2" fill="none" />

                        {/* Hearts to show wedding theme */}
                        <path d="M50 40C50 40 45 30 40 30S30 35 30 40C30 45 35 50 50 60" fill="none" stroke="#d4af37" strokeWidth="1" />
                        <path d="M190 40C190 40 195 30 200 30S210 35 210 40C210 45 205 50 190 60" fill="none" stroke="#d4af37" strokeWidth="1" />

                        {/* Gift box icon */}
                        <rect x="120" cy="125" width="20" height="20" fill="#f0f0f0" stroke="#d4af37" strokeWidth="1" />
                        <line x1="120" y1="130" x2="140" y2="130" stroke="#d4af37" strokeWidth="1" />
                        <line x1="130" y1="125" x2="130" y2="145" stroke="#d4af37" strokeWidth="1" />
                    </svg>

                    {/* Alert circle */}
                    <div className="absolute top-0 right-0">
                        <AlertCircle size={48} className="text-gray-300" />
                    </div>
                </div>
            </div>

            {/* Improved text with better font */}
            <h2 className="text-2xl font-serif mb-3 gold-text">Mahsulotlar mavjud emas</h2>
            <p className="text-gray-600 mb-5 font-light">
                Afsuski, hozirda bu bo'limda mahsulotlar mavjud emas.
                Iltimos, boshqa kategoriyalarni ko'ring yoki keyinroq tashrif buyuring.
            </p>

            {/* Decorative separator */}
            <div className="flex items-center justify-center mb-5">
                <div className="h-px bg-gray-200 w-16"></div>
                <div className="mx-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 6L14 10H10L12 6Z" fill="#d4af37" />
                        <path d="M12 18L10 14H14L12 18Z" fill="#d4af37" />
                    </svg>
                </div>
                <div className="h-px bg-gray-200 w-16"></div>
            </div>

            {/* Clear call to action */}
         

            <style jsx>{`
        .gold-text {
          color: #d4af37;
          font-family: 'Playfair Display', serif;
        }
      `}</style>
        </div>
    );
}