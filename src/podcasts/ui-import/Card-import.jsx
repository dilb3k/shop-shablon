import React from 'react'
import { getProduct } from '../../api/products/router';
import Card from '../../components/ui/Cards/Card';

function Cardimport() {
    const products = getProduct();
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        image={product.image}
                        title={product.name}
                        price={product.price}
                        category={product.category}
                        rating={product.rating}
                        onClick={() => console.log(product.name)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Cardimport