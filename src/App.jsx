import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Page Components
import NotFound from "./components/Page/NotFound/NotFound";
import Home from "./components/Page/Home/Home";
import ProductCard from "./components/Page/ProductCard/ProductCard";

// Layout Components
import Navbar from "./components/Page/Navbar/Navbar";
import Header from "./components/Componients/Header/Header";
import { TopBar } from "./components/Componients/Header/HeaderComponents/TopBar";
import Login from "./components/Componients/Login/Login";
import DetailProductCard from "./components/Page/ProductCard/DetailProductCard";
import ChatApp from "./components/Componients/Message/ChatApp";
import CartDetail from "./components/Componients/Cart/CartDetail";
import OrderPost from "./components/Componients/Header/Order";

function Layout({ children, openLoginModal, currency, setCurrency }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ChatApp />
      <TopBar currency={currency} setCurrency={setCurrency} />
      <Header openLoginModal={openLoginModal} />
      <Navbar openLoginModal={openLoginModal} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedCategory")) || { id: 0, name: "all" };
  });

  const [selectedSubcategory, setSelectedSubcategory] = useState(() => {
    const storedSubcategory = JSON.parse(localStorage.getItem("selectedSubcategory"));
    return storedSubcategory !== null ? storedSubcategory : { id: 0, name: "all" };
  });

  const [selectedSaleCategory, setSelectedSaleCategory] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedSaleCategory")) || { id: "all", name: "Barcha chegirmalar" };
  });

  const [searchValue, setSearchValue] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currency, setCurrency] = useState("UZS");

  const handleCategorySelect = (category, subcategory = { id: 0, name: "all" }) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    localStorage.setItem("selectedCategory", JSON.stringify(category));
    localStorage.setItem("selectedSubcategory", JSON.stringify(subcategory));
  };

  const handleSaleCategorySelect = (saleCategory) => {
    setSelectedSaleCategory(saleCategory);
    localStorage.setItem("selectedSaleCategory", JSON.stringify(saleCategory));
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      const defaultUser = {
        id: 999999,
        username: "guest",
        email: "guest@example.com",
        phone: "+998900000000",
        isGuest: true
      };

      localStorage.setItem("user", JSON.stringify(defaultUser));
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedCategory({ id: 0, name: "all" });
      setSelectedSubcategory({ id: 0, name: "all" });
      localStorage.setItem("selectedCategory", JSON.stringify({ id: 0, name: "all" }));
      localStorage.setItem("selectedSubcategory", JSON.stringify({ id: 0, name: "all" }));
    }
  }, [location.pathname]);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  return (
    <>
      <Layout openLoginModal={openLoginModal} currency={currency} setCurrency={setCurrency}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categorySlug" element={<ProductCard />} />
          <Route path="/cart/:id" element={<CartDetail />} />
          <Route path="/cart" element={<CartDetail />} />
          <Route path="/category/:categorySlug/:subcategorySlug" element={<ProductCard />} />
          <Route path="/products/:productId" element={<DetailProductCard />} />
          <Route path="/sale" element={<ProductCard saleCategory={selectedSaleCategory} />} />
          <Route path="/sale/:saleSlug" element={<ProductCard saleCategory={selectedSaleCategory} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Login isOpen={isLoginOpen} onClose={closeLoginModal} />
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}