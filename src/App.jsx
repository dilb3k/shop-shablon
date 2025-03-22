import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './components/Page/catalog/Catalog.js';
import WeddingDresses from './components/Page/wedding/WeddingDresses.jsx';
import GroomSuits from './components/Page/groom/GroomSuits.jsx';
import WeddingAccessories from './components/Page/accessories/WeddingAccessories.jsx';
import WeddingShoes from './components/Page/shoes/WeddingShoes.jsx';
import WeddingDecor from './components/Page/decor/WeddingDecor.jsx';
import Sale from './components/Page/sale/Sale.jsx';
import ClassicWeddingDresses from './components/Page/wedding/ClassicWeddingDresses.jsx';
import MermaidWeddingDresses from './components/Page/wedding/MermaidWeddingDresses.jsx';
import BallGownWeddingDresses from './components/Page/wedding/BallGownWeddingDresses.jsx';
import BeachWeddingDresses from './components/Page/wedding/BeachWeddingDresses.jsx';
import LuxuryWeddingDresses from './components/Page/wedding/LuxuryWeddingDresses.jsx';
import ShortWeddingDresses from './components/Page/wedding/ShortWeddingDresses.jsx';
import ClassicGroomSuits from './components/Page/groom/ClassicGroomSuits.jsx';
import ModernGroomSuits from './components/Page/groom/ModernGroomSuits.jsx';
import TuxedoGroomSuits from './components/Page/groom/TuxedoGroomSuits.jsx';
import ThreePieceGroomSuits from './components/Page/groom/ThreePieceGroomSuits.jsx';
import SummerGroomSuits from './components/Page/groom/SummerGroomSuits.jsx';
import Veils from './components/Page/accessories/Veils.jsx';
import Jewelry from './components/Page/accessories/Jewelry.jsx';
import Belts from './components/Page/accessories/Belts.jsx';
import Gloves from './components/Page/accessories/Gloves.jsx';
import HairAccessories from './components/Page/accessories/HairAccessories.jsx';
import BrideShoes from './components/Page/shoes/BrideShoes.jsx';
import GroomShoes from './components/Page/shoes/GroomShoes.jsx';
import VenueDecor from './components/Page/decor/VenueDecor.jsx';
import SaleWeddingDresses from './components/Page/sale/SaleWeddingDresses.jsx';
import SaleGroomSuits from './components/Page/sale/SaleGroomSuits.jsx';
import SaleAccessories from './components/Page/sale/SaleAccessories.jsx';
import SaleShoes from './components/Page/sale/SaleShoes.jsx';
import NotFound from './components/Page/NotFound/NotFound.jsx';
import Header from './components/Componients/Header/Header.jsx';
import TableDecor from './components/Page/decor/TableDecor.jsx';
import { useLocation } from 'react-router-dom';
import Home from './components/Page/Home/Home.jsx';

const Layout = ({ children }) => {
  const location = useLocation();
  const isNotFoundPage = location.pathname !== '/' &&
    !location.pathname.startsWith('/catalog') &&
    !location.pathname.startsWith('/wedding-dresses') &&
    !location.pathname.startsWith('/groom-suits') &&
    !location.pathname.startsWith('/wedding-accessories') &&
    !location.pathname.startsWith('/wedding-shoes') &&
    !location.pathname.startsWith('/wedding-decor') &&
    !location.pathname.startsWith('/sale');

  return (
    <>
      {!isNotFoundPage && <Header />}
      {children}
    </>
  );
};

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/wedding-dresses" element={<WeddingDresses />} />
        <Route path="/groom-suits" element={<GroomSuits />} />
        <Route path="/wedding-accessories" element={<WeddingAccessories />} />
        <Route path="/wedding-shoes" element={<WeddingShoes />} />
        <Route path="/wedding-decor" element={<WeddingDecor />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/wedding-dresses/classic" element={<ClassicWeddingDresses />} />
        <Route path="/wedding-dresses/mermaid" element={<MermaidWeddingDresses />} />
        <Route path="/wedding-dresses/ball-gown" element={<BallGownWeddingDresses />} />
        <Route path="/wedding-dresses/beach" element={<BeachWeddingDresses />} />
        <Route path="/wedding-dresses/luxury" element={<LuxuryWeddingDresses />} />
        <Route path="/wedding-dresses/short" element={<ShortWeddingDresses />} />
        <Route path="/groom-suits/classic" element={<ClassicGroomSuits />} />
        <Route path="/groom-suits/modern" element={<ModernGroomSuits />} />
        <Route path="/groom-suits/tuxedo" element={<TuxedoGroomSuits />} />
        <Route path="/groom-suits/three-piece" element={<ThreePieceGroomSuits />} />
        <Route path="/groom-suits/summer" element={<SummerGroomSuits />} />
        <Route path="/wedding-accessories/veils" element={<Veils />} />
        <Route path="/wedding-accessories/jewelry" element={<Jewelry />} />
        <Route path="/wedding-accessories/belts" element={<Belts />} />
        <Route path="/wedding-decor/table-decor" element={<TableDecor />} />
        <Route path="/wedding-accessories/gloves" element={<Gloves />} />
        <Route path="/wedding-accessories/hair-accessories" element={<HairAccessories />} />
        <Route path="/wedding-shoes/bride" element={<BrideShoes />} />
        <Route path="/wedding-shoes/groom" element={<GroomShoes />} />
        <Route path="/wedding-decor/venue-decor" element={<VenueDecor />} />
        <Route path="/sale/wedding-dresses" element={<SaleWeddingDresses />} />
        <Route path="/sale/groom-suits" element={<SaleGroomSuits />} />
        <Route path="/sale/accessories" element={<SaleAccessories />} />
        <Route path="/sale/shoes" element={<SaleShoes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;