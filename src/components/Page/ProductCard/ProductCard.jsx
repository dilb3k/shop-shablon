import React from 'react';
import { getProduct } from '../../../api/products/router';

function ProductCard({ category, subcategory }) {
    // Fetch the products
    const products = getProduct();

    // Filter products based on category and subcategory
    const filteredProducts = products.filter(product => {
        const matchesCategory = category ? product.category_id === category.id : true;
        const matchesSubcategory = subcategory ? product.subcategory_id === subcategory.id : true;
        return matchesCategory && matchesSubcategory;
    });

    return (
        <div className="product-card">
            <h1>{category?.name}</h1>
            <p>sadsdbfd</p>
            {subcategory && <h2>{subcategory.name}</h2>}
            {/* Display filtered products */}
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-item">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <img src={product.image} alt={product.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductCard;