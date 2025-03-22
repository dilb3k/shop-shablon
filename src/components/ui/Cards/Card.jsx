import React from "react";

const Card = ({ image, title, price, category, rating, onClick }) => {
    const displayRating = rating || 4.5;

    return (
        <div
            className=" flex flex-col rounded-2xl overflow-hidden shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white max-w-xs w-full"
            onClick={onClick}
        >
            <div className="h-48 overflow-hidden bg-amber-100 flex items-center justify-center">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-amber-800 font-semibold">Rasm mavjud emas</span>
                )}
            </div>
            <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium">
                {category || "To‘y jihozi"}
            </div>
            <div className="p-4 flex-grow border-t border-amber-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
                <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(displayRating) ? "text-amber-500" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="text-xs text-gray-600 ml-1">({displayRating})</span>
                </div>
                <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold text-amber-800 text-lg">{price}</span>
                    <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm transition-colors duration-200">
                        Xarid qilish
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ProductGrid = ({ products, onProductClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {products.map((product) => (
                <Card
                    key={product.id}
                    image={product.image}
                    title={product.name}
                    price={product.price}
                    category={product.category}
                    rating={product.rating}
                    onClick={() => onProductClick(product.id)}
                />
            ))}
        </div>
    );
};

export default Card;