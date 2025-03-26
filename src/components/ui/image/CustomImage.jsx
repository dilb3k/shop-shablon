import { useState, useEffect } from 'react';
import LoadingSpinner from '../Loading/Loading';
import ImageErrorFallback from './ImagesError';

export default function CustomImage({ src, alt, className = "", style = {} }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [imgSrc, setImgSrc] = useState(src);

    // Rasmni qayta yuklash
    const handleRetry = () => {
        setLoading(true);
        setError(false);
        // Rasmni qayta yuklashni ishonchli qilish uchun timestamp qo'shamiz
        setImgSrc(`${src}?retry=${new Date().getTime()}`);
    };

    // src o'zgarganda qayta yuklash
    useEffect(() => {
        setImgSrc(src);
        setLoading(true);
        setError(false);
    }, [src]);

    return (
        <div className="relative overflow-hidden bg-gray-100 rounded-lg w-full h-full">
            {loading && <LoadingSpinner />}

            {error ? (
                <ImageErrorFallback onRetry={handleRetry} />
            ) : (
                <img
                    src={imgSrc}
                    alt={alt}
                    className={`w-full h-full object-cover ${className}`}
                    style={style}
                    onLoad={() => setLoading(false)}
                    onError={() => {
                        setError(true);
                        setLoading(false);
                    }}
                />
            )}
        </div>
    );
}