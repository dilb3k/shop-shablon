import React, { useState } from "react";

const OrderPost = () => {
    const [orderData, setOrderData] = useState({
        userId: "",
        productId: "",
        quantity: "",
        price: "",
        totalAmount: "",
        orderDate: "",
        status: "",
    });

    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const handlePostOrder = () => {
        const newOrder = {
            id: Date.now(), // Unikal ID generatsiya qilish uchun
            userId: Number(orderData.userId),
            products: [
                {
                    productId: Number(orderData.productId),
                    quantity: Number(orderData.quantity),
                    price: Number(orderData.price),
                },
            ],
            totalAmount: Number(orderData.totalAmount),
            orderDate: orderData.orderDate,
            status: orderData.status,
        };

        console.log("Post qilingan ma'lumot:", newOrder);
    };

    return (
        <div className="p-4 space-y-2">
            <input
                type="number"
                name="userId"
                placeholder="User ID"
                value={orderData.userId}
                onChange={handleChange}
                className="border p-2 w-full"
            />
            <input
                type="number"
                name="productId"
                placeholder="Product ID"
                value={orderData.productId}
                onChange={handleChange}
                className="border p-2 w-full"
            />
            <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={orderData.quantity}
                onChange={handleChange}
                className="border p-2 w-full"
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={orderData.price}
                onChange={handleChange}
                className="border p-2 w-full"
            />
            <input
                type="number"
                name="totalAmount"
                placeholder="Total Amount"
                value={orderData.totalAmount}
                onChange={handleChange}
                className="border p-2 w-full"
            />
            <input
                type="datetime-local"
                name="orderDate"
                value={orderData.orderDate}
                onChange={handleChange}
                className="border p-2 w-full"
            />
            <input
                type="text"
                name="status"
                placeholder="Status (Processing, Shipped...)"
                value={orderData.status}
                onChange={handleChange}
                className="border p-2 w-full"
            />

            <button
                onClick={handlePostOrder}
                className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
            >
                Buyurtmani Post Qilish
            </button>
        </div>
    );
};

export default OrderPost;
