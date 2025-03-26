import React, { useEffect, useState } from 'react';
import { getBlog } from '../../../api/blog/router';

const AnimatedWeddingBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBlog();
            setProducts(data);
        };

        fetchData();

        const bannerClosed = localStorage.getItem('bannerClosed');
        if (bannerClosed === 'true') setIsVisible(false);

        setTimeout(() => setIsLoaded(true), 100);
    }, []);


    const closeBanner = () => {
        setIsVisible(false);
        localStorage.setItem('bannerClosed', 'true');
    };

    // Sahifa yangilanganda bannerni qayta ko'rsatish
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('bannerClosed');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Keyingi mahsulotga o'tish
    const nextProduct = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    // Oldingi mahsulotga qaytish
    const prevProduct = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    if (!isVisible || products.length === 0) return null;

    const currentProduct = products[currentIndex];

    return (
        <div className="flex justify-center my-8">
            <div
                className={`relative w-11/12 h-96 rounded-lg overflow-hidden shadow-xl transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{
                    maxWidth: '90%',
                    background: 'white',
                    boxShadow: '0 10px 30px rgba(212, 175, 55, 0.2)'
                }}
                onMouseEnter={() => setShowDetails(true)}
                onMouseLeave={() => setShowDetails(false)}
            >
                {/* Banner yopish tugmasi */}
                <button
                    onClick={closeBanner}
                    className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-90"
                    style={{
                        color: '#d4af37',
                        background: 'rgba(255, 255, 255, 0.7)',
                    }}
                >
                    <span className="text-2xl font-bold">×</span>
                </button>

                {/* Asosiy rasm */}
                <div className="absolute inset-0 w-full h-full">
                    <div
                        className="w-full h-full bg-cover bg-center transition-all duration-500"
                        style={{
                            backgroundImage: `url(${currentProduct.image})`,
                            filter: showDetails ? 'blur(5px) brightness(0.7)' : 'none',
                        }}
                    ></div>
                </div>

                {/* Animatsiyali ornament background (rasm ustida) */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'transparent',
                        backgroundImage: `
                            radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0) 20%),
                            radial-gradient(circle at 80% 30%, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0) 20%),
                            radial-gradient(circle at 40% 70%, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0) 25%),
                            radial-gradient(circle at 70% 80%, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0) 25%)
                        `,
                        opacity: showDetails ? 1 : 0.4,
                        transition: 'opacity 0.5s ease'
                    }}
                />

                {/* Banner asosiy qismi (hover bo'lganda ko'rinadi) */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${showDetails ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Animatsiyali bezaklar */}
                    <div
                        className="absolute w-full h-full transition-all duration-1500 ease-out opacity-50"
                        style={{
                            background: 'transparent',
                            border: '1px solid #d4af37',
                            transform: 'scale(0.95)',
                            animation: 'pulseFrame 6s infinite ease-in-out'
                        }}
                    />

                    <div
                        className="absolute w-full h-full transition-all duration-1500 delay-300 ease-out opacity-30"
                        style={{
                            background: 'transparent',
                            border: '1px solid #d4af37',
                            transform: 'scale(0.98)',
                            animation: 'pulseFrame 6s infinite ease-in-out 1s'
                        }}
                    />

                    {/* Markaziy qism */}
                    <div className="relative z-10 px-8 py-6 text-center transition-all duration-1000 ease-out opacity-100 scale-100">
                        {/* Yuqori bezak */}
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-px mr-2" style={{ backgroundColor: '#d4af37' }}></div>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#d4af37' }}></div>
                            <div className="w-16 h-px ml-2" style={{ backgroundColor: '#d4af37' }}></div>
                        </div>

                        {/* Sarlavha */}
                        <h1
                            className="text-3xl md:text-5xl mb-4 transition-all duration-1000 opacity-100 translate-y-0"
                            style={{
                                fontFamily: "'Great Vibes', cursive",
                                color: '#ffffff',
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                            }}
                        >
                            {currentProduct.title}
                        </h1>

                        {/* Ma'lumot */}
                        <p
                            className="text-lg mb-6 max-w-lg mx-auto transition-all duration-1000 opacity-100 translate-y-0"
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontWeight: 500,
                                color: '#ffffff',
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                lineHeight: 1.6
                            }}
                        >
                            {currentProduct.content}
                        </p>

                    

                        {/* Pastki bezak */}
                        <div className="flex items-center justify-center mt-6">
                            <div className="w-16 h-px mr-2" style={{ backgroundColor: '#d4af37' }}></div>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#d4af37' }}></div>
                            <div className="w-16 h-px ml-2" style={{ backgroundColor: '#d4af37' }}></div>
                        </div>
                    </div>
                </div>

                {/* Banner sarlavhasi (hover bo'lmaganda ko'rinadi) */}
                <div
                    className={`absolute bottom-4 left-0 right-0 top-2 text-center transition-all duration-500 ${showDetails ? 'opacity-0' : 'opacity-100'}`}
                >
                    <h2
                        className="text-2xl md:text-3xl px-4 py-2"
                        style={{
                            fontFamily: "'Great Vibes', cursive",
                            color: '#ffffff',
                            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            display: 'inline-block',
                            padding: '5px 15px',
                            borderRadius: '4px'
                        }}
                    >
                        {currentProduct.title}
                    </h2>
                </div>

                {/* Bezakli burchaklar (animatsiyali) */}
                <div
                    className="absolute top-0 left-0 w-16 h-16 transition-all duration-1000 opacity-100"
                    style={{
                        borderTop: '2px solid #d4af37',
                        borderLeft: '2px solid #d4af37'
                    }}
                ></div>
                <div
                    className="absolute top-0 right-0 w-16 h-16 transition-all duration-1000 opacity-100"
                    style={{
                        borderTop: '2px solid #d4af37',
                        borderRight: '2px solid #d4af37'
                    }}
                ></div>
                <div
                    className="absolute bottom-0 left-0 w-16 h-16 transition-all duration-1000 opacity-100"
                    style={{
                        borderBottom: '2px solid #d4af37',
                        borderLeft: '2px solid #d4af37'
                    }}
                ></div>
                <div
                    className="absolute bottom-0 right-0 w-16 h-16 transition-all duration-1000 opacity-100"
                    style={{
                        borderBottom: '2px solid #d4af37',
                        borderRight: '2px solid #d4af37'
                    }}
                ></div>

                {/* Paginatsiya tugmalari */}
                <div className="absolute bottom-4 w-full flex justify-center items-center z-20">
                    <button
                        onClick={prevProduct}
                        className="w-10 h-10 mx-2 rounded-full bg-white bg-opacity-50 flex items-center justify-center transition-all duration-300 hover:bg-opacity-80"
                        style={{ color: '#d4af37' }}
                    >
                        <span className="text-xl font-bold">←</span>
                    </button>

                    {/* Paginatsiya indikatorlari */}
                    <div className="flex space-x-2 mx-4">
                        {products.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-50'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextProduct}
                        className="w-10 h-10 mx-2 rounded-full bg-white bg-opacity-50 flex items-center justify-center transition-all duration-300 hover:bg-opacity-80"
                        style={{ color: '#d4af37' }}
                    >
                        <span className="text-xl font-bold">→</span>
                    </button>
                </div>
            </div>

            {/* Fontlarni ulab olish va animatsiyalar */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&display=swap');
                    
                    @keyframes pulseFrame {
                        0% { transform: scale(0.95); opacity: 0.5; }
                        50% { transform: scale(1); opacity: 0.3; }
                        100% { transform: scale(0.95); opacity: 0.5; }
                    }
                    
                    @keyframes pulseButton {
                        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
                        70% { transform: scale(1.03); box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
                        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
                    }
                `}
            </style>
        </div>
    );
};

export default AnimatedWeddingBanner;