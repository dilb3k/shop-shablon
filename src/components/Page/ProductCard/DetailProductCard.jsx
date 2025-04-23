import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

import CustomImage from '../../ui/image/CustomImage';
import LoadingSpinner from '../../ui/Loading/Loading';
import { getProductDetail } from '../../../api/products/router';
import { getLikedProducts } from '../../../api/like/router';
import LikeCard from '../../ui/Likes/LikeCard';
import { addToCart } from '../../../api/cart/router';

const DetailProductCard = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isLiked, setIsLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        // Get user from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }

        const fetchProductData = async () => {
            try {
                setIsLoading(true);
                const productData = await getProductDetail(productId);
                setProduct(productData);

                // Fetch comments for this product
                const response = await axios.get(`http://localhost:8000/comment/product/${productId}`);
                setComments(response.data);
            } catch (err) {
                console.error('Error fetching product data:', err);
                setError('Failed to load product. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductData();
    }, [productId]);

    const nextImage = () => {
        setCurrentImageIndex(prev =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex(prev =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    const handleAddToCart = async () => {
        try {
            if (!product) return;
            await addToCart(product.id, quantity, product.price);
            // Add a visual feedback for the user
            alert('Maxsulot savatga qo\'shildi!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
        }
    };

    const handleLike = async () => {
        try {
            const newLikeStatus = await getLikedProducts(productId);
            setIsLiked(newLikeStatus);
        } catch (err) {
            console.error('Error updating like:', err);
        }
    };

    const handleRatingChange = (rating) => {
        setUserRating(rating);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        try {
            const response = await axios.post(
                'http://localhost:8000/comment/comment/',
                {
                    product_id: productId,
                    text: comment.trim(),
                    user_id: user?.id,
                    rating: userRating // Include the user's rating
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            setComments([...comments, response.data]);
            setComment('');
            setUserRating(0);
        } catch (err) {
            console.error('Error submitting comment:', err);
            alert('Izoh qoldirishda xatolik yuz berdi. Qaytadan urinib ko\'ring.');
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200 max-w-2xl mx-auto mt-10">
                <p className="text-lg">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
                >
                    Qaytadan yuklash
                </button>
            </div>
        );
    }

    if (!product) {
        return <div className="text-center mt-10">Mahsulot topilmadi</div>;
    }

    // Calculate pagination range
    const totalImages = product.images?.length || 0;
    const maxVisibleThumbs = 5;
    let startIndex = 0;
    let endIndex = Math.min(totalImages, maxVisibleThumbs);

    if (totalImages > maxVisibleThumbs) {
        const halfVisible = Math.floor(maxVisibleThumbs / 2);
        if (currentImageIndex > halfVisible) {
            startIndex = Math.min(currentImageIndex - halfVisible, totalImages - maxVisibleThumbs);
            endIndex = startIndex + maxVisibleThumbs;
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-amber-600 mb-6 hover:text-amber-700 transition-colors"
            >
                <ChevronLeft className="mr-1" /> Maxsulotlarga qaytish
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Images with Improved Pagination */}
                <div className="relative">
                    <div className="relative h-96 overflow-hidden rounded-lg bg-gray-100">
                        <CustomImage
                            src={product.images?.[currentImageIndex]?.image || '/default-product.png'}
                            alt={product.name}
                            className="w-full h-full object-contain"
                        />

                        {product.images?.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                                    style={{ color: '#d4af37' }}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                                    style={{ color: '#d4af37' }}
                                >
                                    <ChevronRight size={20} />
                                </button>
                                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                                    {product.images.map((_, idx) => (
                                        <button
                                            key={`dot-${idx}`}
                                            onClick={() => goToImage(idx)}
                                            className={`w-2 h-2 rounded-full ${currentImageIndex === idx ? 'bg-amber-600' : 'bg-gray-300'
                                                }`}
                                            style={{ backgroundColor: currentImageIndex === idx ? '#d4af37' : undefined }}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex mt-4 space-x-2 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-amber-600">
                        {product.images?.slice(startIndex, endIndex).map((img, slicedIndex) => {
                            const actualIndex = startIndex + slicedIndex;
                            return (
                                <button
                                    key={actualIndex}
                                    onClick={() => setCurrentImageIndex(actualIndex)}
                                    className={`w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 ${currentImageIndex === actualIndex ? 'border-amber-500' : 'border-transparent'
                                        }`}
                                    style={{ borderColor: currentImageIndex === actualIndex ? '#d4af37' : 'transparent' }}
                                >
                                    <CustomImage
                                        src={img.image}
                                        alt={`Thumbnail ${actualIndex + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            );
                        })}

                        {totalImages > maxVisibleThumbs && (
                            <div className="flex items-center">
                                {startIndex > 0 && (
                                    <button
                                        onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - maxVisibleThumbs))}
                                        className="w-8 h-16 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                )}

                                {endIndex < totalImages && (
                                    <button
                                        onClick={() => setCurrentImageIndex(Math.min(totalImages - 1, currentImageIndex + maxVisibleThumbs))}
                                        className="w-8 h-16 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 ml-2"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                    <div className="flex items-center mb-4">
                        <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    className={i < product.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                                    style={{ fill: i < product.rating ? '#d4af37' : undefined, color: i < product.rating ? '#d4af37' : undefined }}
                                />
                            ))}
                        </div>
                        <span className="text-gray-600">{product.rating}/5</span>
                    </div>

                    <p className="text-2xl font-semibold mb-4" style={{ color: '#d4af37' }}>
                        {parseInt(product.price).toLocaleString()} sum
                    </p>

                    <p className="text-gray-700 mb-6">{product.description}</p>

                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <span className="mr-2">Miqdori:</span>
                            <div className="flex items-center border rounded-md">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-3 py-1 text-lg"
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 border-x">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="px-3 py-1 text-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 text-white py-3 px-6 rounded-md flex items-center justify-center transition-colors"
                                style={{ backgroundColor: '#d4af37', borderColor: '#d4af37' }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b8941e'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#d4af37'}
                            >
                                <ShoppingCart className="mr-2" />
                                Savatga qo'shish
                            </button>
                            <button
                                onClick={handleLike}
                                className={`p-3 rounded-md ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 bg-gray-50 hover:bg-gray-100'}`}
                            >
                                <LikeCard productId={productId} />
                            </button>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold mb-4">Mahsulot tafsilotlari</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-gray-600">Kategoriya</h3>
                                <p>{product.category_name}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-600">Subkategoriya</h3>
                                <p>{product.subcategory_name || 'Mavjud emas'}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-600">Ombordagi soni</h3>
                                <p>{product.inStock > 0 ? `${product.inStock} dona mavjud` : 'Tugagan'}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-600">Qo'shilgan sana</h3>
                                <p>{new Date(product.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section with Rating */}
            <div className="mt-12 border-t pt-8">
                <h2 className="text-2xl font-semibold mb-6">Mijozlar sharhlari</h2>

                {user && (
                    <form onSubmit={handleCommentSubmit} className="mb-8">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Baholash:</label>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <Star
                                        key={rating}
                                        size={24}
                                        className={`cursor-pointer ${rating <= (hoverRating || userRating)
                                            ? "fill-amber-400 text-amber-400"
                                            : "text-gray-300"
                                            }`}
                                        style={{
                                            fill: rating <= (hoverRating || userRating) ? '#d4af37' : undefined,
                                            color: rating <= (hoverRating || userRating) ? '#d4af37' : undefined
                                        }}
                                        onClick={() => handleRatingChange(rating)}
                                        onMouseEnter={() => setHoverRating(rating)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Sharh yozing..."
                                className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                style={{ borderColor: '#d4af37' }}
                            />
                            <button
                                type="submit"
                                className="text-white px-6 py-2 rounded-md transition-colors"
                                style={{ backgroundColor: '#d4af37' }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b8941e'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#d4af37'}
                            >
                                Yuborish
                            </button>
                        </div>
                    </form>
                )}

                <div className="space-y-6">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className="border-b pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium">{comment.user?.username || 'Noma\'lum foydalanuvchi'}</h3>
                                    <span className="text-sm text-gray-500">
                                        {new Date(comment.data).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-700">{comment.text}</p>
                                {comment.rating && (
                                    <div className="flex mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < comment.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                                                style={{
                                                    fill: i < comment.rating ? '#d4af37' : undefined,
                                                    color: i < comment.rating ? '#d4af37' : undefined
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Hali sharhlar yo'q. Birinchi sharh qoldiruvchi bo'ling!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailProductCard;