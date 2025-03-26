import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./components/Page/NotFound/NotFound";
import Header from "./components/Componients/Header/Header";
import Home from "./components/Page/Home/Home";
import ProductCard from "./components/Page/ProductCard/ProductCard";
import Navbar from "./components/Page/Navbar/Navbar";
import { TopBar } from "./components/Componients/Header/HeaderComponents/TopBar";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(
    JSON.parse(localStorage.getItem("selectedCategory")) || { id: 0, name: "all" }
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedCategory({ id: 0, name: "all" });
      localStorage.setItem("selectedCategory", JSON.stringify({ id: 0, name: "all" }));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedSubcategory({ id: 0, name: "all" });
      localStorage.setItem("selectedSubcategory", JSON.stringify({ id: 0, name: "all" }));
    }
  }, [location.pathname]);

  const handleCategorySelect = (category, subcategory = null) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    localStorage.setItem("selectedCategory", JSON.stringify(category));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar  />

      <Header onSearchChange={setSearchValue} />
      <Navbar onCategorySelect={handleCategorySelect} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/category/:categorySlug"
            element={
              <ProductCard
                category={selectedCategory}
                searchValue={searchValue}
              />
            }
          />
          <Route
            path="/category/:categorySlug/:subcategorySlug"
            element={
              <ProductCard
                category={selectedCategory}
                subcategory={selectedSubcategory}
                searchValue={searchValue}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
