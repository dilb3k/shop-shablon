import { Loader } from 'lucide-react';

// Loading animatsiyasi komponenti
export default function LoadingSpinner() {
    // Zarhal rang
    const goldColor = '#d4af37';

    return (
        <div className="flex items-center justify-center w-full h-full min-h-32 ">
            <div className="relative">
                <div
                    className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin"
                    style={{ borderTopColor: goldColor }}
                ></div>
                <div
                    className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping"
                    style={{ borderTopColor: goldColor, animationDuration: '1.5s' }}
                ></div>
                <Loader
                    className="absolute top-0 left-0 w-12 h-12 text-gray-500 animate-pulse"
                    style={{ color: goldColor }}
                />
            </div>
        </div>
    );
}