import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Componients/Header/Navbar";
import Home from "./components/Componients/Main/Home";
import NotFound from "./components/Page/NotFound/NotFound";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;