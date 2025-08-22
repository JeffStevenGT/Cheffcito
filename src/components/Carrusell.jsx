import React, { useState, useRef, useEffect } from "react";
import useApi from "../useApi";

const Carrusell = ({ setSelectedCategory, resetFilters }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  const {
    data: categories,
    loading,
    error,
  } = useApi(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    "categories"
  );

  useEffect(() => {
    if (!categories || categories.length === 0 || isDragging) return;

    const carousel = carouselRef.current;
    let animationFrameId;
    let autoScrollSpeed = 0.5;

    const animateScroll = () => {
      if (carousel) {
        carousel.scrollLeft += autoScrollSpeed;

        if (
          carousel.scrollLeft >=
          carousel.scrollWidth - carousel.clientWidth
        ) {
          carousel.scrollLeft = 0;
        }

        animationFrameId = requestAnimationFrame(animateScroll);
      }
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [categories, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    e.preventDefault();
    carouselRef.current.style.userSelect = "none";
    carouselRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      carouselRef.current.style.cursor = "grab";
      carouselRef.current.style.userSelect = "auto";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current.style.cursor = "grab";
    carouselRef.current.style.userSelect = "auto";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCategoryClick = (categoryName) => {
    resetFilters();
    setSelectedCategory(categoryName);
    setTimeout(() => {
      const cardsSection = document.getElementById("cards-section");
      if (cardsSection) {
        // Scroll más suave y preciso
        cardsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  if (error) {
    return (
      <div className="w-full px-4 pt-8 bg-gray-50">
        <h2 className="text-2xl font-bold text-start my-6 pl-15 text-gray-800">
          Categorías
        </h2>
        <div className="text-center text-red-500">
          Error al cargar las categorías. Inténtalo de nuevo más tarde.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full px-4 pt-8 bg-gray-50">
        <h2 className="text-3xl font-bold my-6 text-start text-gray-800 pl-15">
          Categorías
        </h2>
        <div className="flex overflow-x-hidden space-x-4 md:space-x-6 py-4 px-2">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-36 md:w-48 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-28 md:h-40 bg-gray-200 animate-pulse"></div>
              <div className="p-3 md:p-4">
                <div className="h-5 md:h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="w-full px-4 pt-8 bg-gray-50">
        <h2 className="text-3xl font-bold  my-6 text-start text-gray-800 pl-15">
          Categorías
        </h2>
        <div className="text-center text-gray-500">
          No se encontraron categorías.
        </div>
      </div>
    );
  }

  const duplicatedCategories = [...categories, ...categories, ...categories];

  return (
    <div className="w-full bg-gray-50">
      <h2 className="text-xl md:text-3xl font-bold text-start my-4 md:mb-6 text-gray-800 pl-15">
        Categorías
      </h2>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-4 md:space-x-6 py-4 px-2 cursor-grab scrollbar-hide select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {duplicatedCategories.map((category, index) => (
          <div
            key={`${category.idCategory}-${index}`}
            className="flex-shrink-0 w-36 md:w-48 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg select-none cursor-pointer"
            onClick={() => handleCategoryClick(category.strCategory)}
          >
            <div className="h-28 md:h-40 overflow-hidden flex items-center justify-center bg-gray-100">
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="max-h-full max-w-full object-contain p-2 select-none"
                draggable="false"
              />
            </div>
            <div className="p-3 md:p-4">
              <h3 className="font-semibold text-sm md:text-lg text-center text-gray-800 select-none">
                {category.strCategory}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrusell;
