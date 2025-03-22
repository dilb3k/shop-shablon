import React from 'react'
import { getProduct } from '../../../api/products/router';

function ProductImport() {
    const products = getProduct();
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {products.map((product) => (
                    <p>
                        {product.title}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default ProductImport