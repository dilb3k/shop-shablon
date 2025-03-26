import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { getProduct } from '../../../api/products/router';
import NoProducts from '../NotFound/NoProducts';
import CustomImage from '../../ui/image/CustomImage';
import LoadingSpinner from '../../ui/Loading/Loading';

const ProductCard = memo(({ searchValue = '' }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const params = useParams();

    useEffect(() => {
        const getLocalStorageData = () => {
            try {
                return {
                    category: JSON.parse(localStorage.getItem("selectedCategory")) || { id: 0, name: "all" },
                    subcategory: JSON.parse(localStorage.getItem("selectedSubcategory")) || null
                };
            } catch {
                return { category: { id: 0, name: "all" }, subcategory: null };
            }
        };

        const { category, subcategory } = getLocalStorageData();
        setCategoryData({ category, subcategory });
    }, [params.categorySlug, params.subcategorySlug]);

    const [categoryData, setCategoryData] = useState({
        category: { id: 0, name: "all" },
        subcategory: null
    });

    useEffect(() => {
        let isMounted = true;

        async function fetchProducts() {
            setIsLoading(true);
            try {
                const productData = await getProduct();
                if (isMounted) {
                    setProducts(productData);
                    setError(null);
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                if (isMounted) {
                    setError('Failed to load products. Please try again later.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, [params.categorySlug, params.subcategorySlug]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            if (!product.name) return false; // Skip products without names

            // Handle "All" category case (id === 0 means show all)
            const isAllCategory = categoryData.category?.id == 0;

            // Category matching logic
            const matchesCategory = isAllCategory
                ? true
                : categoryData.category?.id
                    ? product.category_id == categoryData.category.id
                    : true;

            // Subcategory matching logic
            const matchesSubcategory = isAllCategory
                ? true
                : categoryData.subcategory?.id
                    ? product.subcategory_id === categoryData.subcategory.id
                    : true;

            // Combine category filters
            const categoryMatch = matchesCategory && matchesSubcategory;

            // If no search value, just return category matches
            if (!searchValue.trim()) return categoryMatch;
                
            // Search matching logic
            const searchLower = searchValue.toLowerCase();
            
            const matchesSearch = (
                product.name.toLowerCase().includes(searchLower) ||
                (product.description?.toLowerCase().includes(searchLower) || false)
            );

            return categoryMatch && matchesSearch;
        });
    }, [products, categoryData, searchValue]);

    // ... rest of your component code remains the same ...
    const renderRating = useCallback((rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={14}
                className={i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                aria-hidden="true"
            />
        ));
    }, []);

    const handleRetry = useCallback(() => {
        setError(null);
        setIsLoading(true);
        getProduct()
            .then(setProducts)
            .catch(err => {
                console.error('Retry failed:', err);
                setError('Failed to load products. Please try again later.');
            })
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[300px]"><LoadingSpinner /></div>;
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200 max-w-2xl mx-auto">
                <p className="font-cormorant text-lg">{error}</p>
                <button
                    onClick={handleRetry}
                    className="mt-2 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
         
            <div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-4">
                <div className="text-center md:text-center">
                    {categoryData.category?.name !== "all" && (
                        <h1
                            className="text-4xl md:text-5xl font-playful font-bold mb-3"
                            style={{
                                color: '#d4af37',
                                textShadow: '2px 2px 4px rgba(212, 175, 55, 0.3)',
                                letterSpacing: '1px'
                            }}
                        >
                            {categoryData.category?.name || "O'yinchoqlar Dunyosi"}
                        </h1>
                    )}
                    {categoryData.subcategory && categoryData.subcategory.name !== "all" && (
                        <h2
                            className="text-2xl font-playful font-semibold"
                            style={{
                                color: '#8a6d3b',
                                opacity: 0.8,
                                letterSpacing: '0.5px'
                            }}
                        >
                            {categoryData.subcategory.name}
                        </h2>
                    )}
                </div>
            </div>
            {filteredProducts.length === 0 ? (
                <div className="container mx-auto p-6">
                    <NoProducts />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            hoveredProduct={hoveredProduct}
                            setHoveredProduct={setHoveredProduct}
                            renderRating={renderRating}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

const ProductItem = memo(({ product, hoveredProduct, setHoveredProduct, renderRating }) => {
    const isHovered = hoveredProduct === product.id;
    const priceText = typeof product.price === 'number'
        ? `${product.price.toLocaleString()} sum`
        : product.price;

    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
        >
            <div className="relative h-56 overflow-hidden">
                <CustomImage
                    src={product.image}
                    alt={product.name}
                    className="transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                />

                <div className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        className="bg-white text-amber-600 p-2 rounded-full hover:bg-amber-600 hover:text-white transition-colors shadow-sm"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={18} />
                    </button>
                    <button
                        className="bg-white text-amber-600 p-2 rounded-full hover:bg-amber-600 hover:text-white transition-colors shadow-sm"
                        aria-label={`Add ${product.name} to favorites`}
                    >
                        <Heart size={18} />
                    </button>
                </div>

                {product.inStock > 0 && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                        In Stock: {product.inStock}
                    </div>
                )}

                <div className="absolute top-2 right-2 bg-amber-600 text-white px-2 py-1 rounded text-sm font-semibold shadow-sm">
                    {priceText}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-xl font-greatvibes text-amber-600 mb-1 line-clamp-1">{product.name}</h3>

                {product.rating && (
                    <div className="flex items-center mb-2">
                        <div className="flex mr-1" aria-label={`Rating: ${product.rating} out of 5`}>
                            {renderRating(product.rating)}
                        </div>
                        <span className="text-xs text-gray-500">({product.rating}/5)</span>
                    </div>
                )}

                <p className="text-gray-600 font-cormorant text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500 font-cormorant">
                        {new Date(product.created_at).toLocaleDateString()}
                    </div>
                    <button
                        className="bg-amber-600 hover:bg-amber-700 text-white py-1 px-3 rounded text-sm transition-colors font-cormorant font-medium"
                        aria-label={`View details for ${product.name}`}
                    >
                        View
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ProductCard;