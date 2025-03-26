import { getProduct } from '../products/router.js';
import { getPromotion } from './router.js';

function applyPromotions() {
    const products = getProduct();
    const promotions = getPromotion();

    // Get current date to check active promotions
    const currentDate = new Date();

    // Find active promotions
    const activePromotions = promotions.filter(promo => {
        const startDate = new Date(promo.startDate);
        const endDate = new Date(promo.endDate);
        return currentDate >= startDate && currentDate <= endDate;
    });

    // If no active promotions, return original products
    if (activePromotions.length == 0) {
        return products.map(product => ({
            ...product,
            originalPrice: product.price,
            discountedPrice: product.price,
            hasDiscount: false
        }));
    }

    // Apply all active promotions to products
    return products.map(product => {
        let discountedPrice = product.price;
        let hasDiscount = false;

        // Check if product is in any promotion
        for (const promo of activePromotions) {
            if (promo.productId.includes(product.id)) {
                discountedPrice = product.price * (1 - promo.discount / 100);
                hasDiscount = true;
                break; // Assuming one product can only be in one promotion at a time
            }
        }

        return {
            ...product,
            originalPrice: product.price,
            discountedPrice: Math.round(discountedPrice),
            hasDiscount,
            discountPercentage: hasDiscount ? activePromotions.find(p => p.productId.includes(product.id)).discount : 0
        };
    });
}

// Example router implementation
const router = {
    getProducts: () => {
        return applyPromotions();
    },

    getProductById: (id) => {
        const products = applyPromotions();
        return products.find(p => p.id == id);
    }
};

export default router;