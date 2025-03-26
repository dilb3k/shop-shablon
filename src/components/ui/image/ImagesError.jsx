import { ImageOff } from 'lucide-react';

// Rasm chiqmaganda ko'rsatiladigan komponent
export default function ImageErrorFallback({ onRetry }) {
    // Zarhal rang
    const goldColor = '#d4af37';

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-gray-50">
            <ImageOff size={48} style={{ color: goldColor }} className="mb-2" />
            <p className="text-center font-medium" style={{ color: goldColor }}>
                Rasmni yuklab bo'lmadi
            </p>
        
        </div>
    );
}