import { AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

const NotFound = () => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = countdown > 0 && setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-300 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-amber-100 rounded-full opacity-10 blur-xl"></div>
            </div>

            {/* Wedding-themed floral border */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `
          radial-gradient(circle at 5% 5%, rgba(251, 191, 36, 0.05) 3%, transparent 3%),
          radial-gradient(circle at 95% 5%, rgba(251, 191, 36, 0.05) 3%, transparent 3%),
          radial-gradient(circle at 5% 95%, rgba(251, 191, 36, 0.05) 3%, transparent 3%),
          radial-gradient(circle at 95% 95%, rgba(251, 191, 36, 0.05) 3%, transparent 3%)
        `,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}></div>

            <div className="relative w-full max-w-xl z-10">
                {/* Content container */}
                <div className="relative p-8 rounded-2xl border-2 border-amber-200 shadow-xl bg-white">
                    {/* Gold decorative header */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200"></div>

                    {/* Error icon */}
                    <div className="flex items-center justify-center mb-8 mt-4">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                                <AlertTriangle size={60} className="text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    {/* Main content with gold and red accents */}
                    <div className="text-center mb-8">
                        <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-300 text-transparent bg-clip-text">404</h1>
                        <h2 className="text-2xl font-bold mb-4 text-red-500">Sahifa topilmadi</h2>
                        <p className="text-lg text-gray-600 mb-6 mx-auto max-w-md">
                            Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan.
                        </p>
                    </div>

                    {/* Gold buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="/" className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 text-center shadow-md">
                            Bosh sahifaga
                        </a>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-amber-700 font-medium py-3 px-8 rounded-lg transition-all duration-300 border border-amber-300 shadow-sm"
                        >
                            Orqaga ({countdown})
                        </button>
                    </div>

                    {/* Wedding-themed footer */}
                    <div className="mt-8 pt-6 border-t border-amber-100 text-center">
                        <p className="text-amber-700 italic font-serif">"Agar boshqa muommo bo'lsa bizga xabar bering!"</p>
                    </div>

                    {/* Decorative footer */}
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;