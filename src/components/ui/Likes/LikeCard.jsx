import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { getLikedProducts, likeProduct, unlikeProduct } from '../../../api/like/router';

const LikeCard = ({ productId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(false);

    const checkLikeStatus = async () => {
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            // For authenticated users
            try {
                const likedProducts = await getLikedProducts();
                setIsLiked(likedProducts.some(product => product.id === parseInt(productId)));
            } catch (error) {
                console.error("Error checking like status:", error);
            }
        }
        // For guest users, isLiked will be whatever is in the component state
        // No need to fetch from localStorage anymore
    };

    useEffect(() => {
        checkLikeStatus();
    }, [productId]);

    const handleLikeClick = async () => {
        if (loading) return;

        setLoading(true);
        setAnimating(true);

        try {
            const accessToken = localStorage.getItem('access_token');

            if (!accessToken) {
                // Guest user case - simply toggle the state
                // No localStorage usage as requested
                setIsLiked(!isLiked);
            } else {
                // Handle authenticated user case
                if (isLiked) {
                    await unlikeProduct(productId);
                } else {
                    await likeProduct(productId);
                }
                // Re-check like status after change
                await checkLikeStatus();
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        } finally {
            setLoading(false);
            setTimeout(() => setAnimating(false), 300); // Animation duration
        }
    };

    return (
        <button
            onClick={handleLikeClick}
            disabled={loading}
            className="relative focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isLiked ? "Unlike product" : "Like product"}
        >
            <Heart
                size={24}
                className={`
                    transition-all duration-300 ease-in-out
                    ${animating ? 'scale-125' : 'scale-100'}
                    ${isLiked
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }
                `}
            />
            {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></span>
                </span>
            )}
        </button>
    );
};

export default LikeCard;