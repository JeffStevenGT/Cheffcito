import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import DetailFood from "./components/DetailFood";
import Footer from "./components/Footer";
import Header from "./components/Header";

// Componente para hacer scroll al top al cambiar de ruta
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [searchPrincipal, setSearchPrincipal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedArea("");
    setSearchPrincipal("");
  };

  return (
    <div>
      <ScrollToTop />
      <Header
        searchPrincipal={searchPrincipal}
        setSearchPrincipal={setSearchPrincipal}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchPrincipal={searchPrincipal}
              selectedCategory={selectedCategory}
              selectedArea={selectedArea}
              setSelectedCategory={setSelectedCategory}
              setSelectedArea={setSelectedArea}
              resetFilters={resetFilters}
            />
          }
        />
        <Route path="/meal/:id" element={<DetailFood />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
