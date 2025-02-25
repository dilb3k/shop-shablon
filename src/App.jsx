import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fastkart.azamovdev.uz/api/v1/product/")
      .then((response) => {
        if (response.data.status) {
          setProducts(response.data.data.results);
        }
      })
      .catch((error) => {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Mahsulotlar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <img
              src={product.product_thumbnail?.original_url}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-500">{product.short_description}</p>
            <p className="text-lg font-bold text-orange-500 mt-2">{product.price} so'm</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
