import { useState, useEffect } from "react";
import Cards from "../components/Cards";
import Carrusell from "../components/Carrusell";
import CarrusellBanderas from "../components/CarrusellBanderas";
import Hero from "../components/Hero";
import EasyRecipes from "../components/EasyRecipes";

function Home({
  searchPrincipal,
  selectedCategory,
  selectedArea,
  setSelectedCategory,
  setSelectedArea,
  resetFilters,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 20; // ✅ Límite de 20 cards por página

  // ✅ Resetear a página 1 cuando cambien los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchPrincipal, selectedCategory, selectedArea]);

  // ✅ Función para cambiar de página
  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll suave hacia las cards
    setTimeout(() => {
      const cardsSection = document.getElementById("cards-section");
      if (cardsSection) {
        cardsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div>
      <Hero />
      <Carrusell
        setSelectedCategory={setSelectedCategory}
        resetFilters={resetFilters}
      />
      <CarrusellBanderas
        setSelectedArea={setSelectedArea}
        resetFilters={resetFilters}
      />

      {/* ✅ Cards con paginación */}
      <Cards
        searchPrincipal={searchPrincipal}
        selectedCategory={selectedCategory}
        selectedArea={selectedArea}
        currentPage={currentPage}
        mealsPerPage={mealsPerPage}
        onPageChange={goToPage}
      />

      <EasyRecipes />
    </div>
  );
}

export default Home;
