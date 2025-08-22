import useApi from "../useApi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Cards({
  searchPrincipal,
  selectedCategory,
  selectedArea,
  currentPage,
  mealsPerPage,
  onPageChange,
}) {
  const navigate = useNavigate();

  let apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  if (searchPrincipal) {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchPrincipal}`;
  } else if (selectedCategory) {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
  } else if (selectedArea) {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
  } else {
    apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  }

  const { data: meals, loading, error } = useApi(apiUrl, "meals");

  const handleMealClick = (mealId) => {
    window.scrollTo(0, 0);
    navigate(`/meal/${mealId}`);
  };

  // Calcular páginas
  const totalMeals = meals ? meals.length : 0;
  const totalPages = Math.ceil(totalMeals / mealsPerPage);

  // Obtener meals para la página actual
  const getCurrentPageMeals = () => {
    if (!meals) return [];
    const startIndex = (currentPage - 1) * mealsPerPage;
    const endIndex = startIndex + mealsPerPage;
    return meals.slice(startIndex, endIndex);
  };

  // Función para contar ingredientes
  const countIngredients = (meal) => {
    let count = 0;
    for (let i = 1; i <= 20; i++) {
      if (
        meal[`strIngredient${i}`] &&
        meal[`strIngredient${i}`].trim() !== ""
      ) {
        count++;
      }
    }
    return count;
  };

  // Función para estimar dificultad
  const estimateDifficulty = (instructions) => {
    if (!instructions) return "Media";
    const wordCount = instructions.split(" ").length;
    if (wordCount < 50) return "Fácil";
    if (wordCount < 100) return "Media";
    return "Difícil";
  };

  // Emojis para categorías
  const categoryEmojis = {
    Chicken: "🍗",
    Beef: "🥩",
    Seafood: "🐟",
    Vegetarian: "🥦",
    Vegan: "🌱",
    Dessert: "🍰",
    Pasta: "🍝",
    Breakfast: "🥞",
    Goat: "🐐",
    Lamb: "🐑",
    Pork: "🐖",
    Side: "🥗",
    Starter: "🍤",
    Miscellaneous: "🍽️",
  };

  if (loading) {
    return (
      <div id="cards-section" className="text-center py-10">
        Cargando comidas...
      </div>
    );
  }

  if (error) {
    return (
      <div id="cards-section" className="text-center py-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!meals || meals.length === 0) {
    return (
      <div id="cards-section" className="text-center py-10">
        No se encontraron comidas.
      </div>
    );
  }

  const currentMeals = getCurrentPageMeals();

  return (
    <div id="cards-section" className="bg-white md:pt-20">
      <div className="px-4 mt-7 md:px-15 md:mb-5 md:mt-1">
        {/* Header con información de paginación */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {searchPrincipal && `Resultados para: ${searchPrincipal}`}
            {selectedCategory &&
              !searchPrincipal &&
              `Categoría: ${selectedCategory}`}
            {selectedArea &&
              !searchPrincipal &&
              !selectedCategory &&
              `Cocina: ${selectedArea}`}
            {!searchPrincipal &&
              !selectedCategory &&
              !selectedArea &&
              "Todas las Recetas"}
          </h2>

          {/* PAGINACIÓN*/}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-4">
              {/* Botón Anterior */}
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Anterior
              </button>

              {/* Información de página */}
              <span className="text-xs md:text-xs text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                Página {currentPage} de {totalPages}
              </span>

              {/* Botón Siguiente */}
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center"
              >
                Siguiente
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            Página {currentPage} de {totalPages} • {currentMeals.length} de{" "}
            {totalMeals} recetas
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 mt-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {currentMeals.slice(0, 8).map((meal) => {
            const ingredientCount = countIngredients(meal);
            const difficulty = estimateDifficulty(meal.strInstructions);

            return (
              <div
                key={meal.idMeal}
                className="relative hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => handleMealClick(meal.idMeal)}
              >
                <div className="relative">
                  <img
                    src={
                      meal.strMealThumb ||
                      "https://c.tenor.com/YXS2BDyDWtwAAAAd/tenor.gif"
                    }
                    alt={meal.strMeal}
                    className="bg-cover rounded-2xl w-full h-48 object-cover group-hover:brightness-90 transition-all"
                  />

                  <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                    {categoryEmojis[meal.strCategory] || "🍽️"}{" "}
                    {meal.strCategory}
                  </div>

                  <h2 className="text-xl text-white p-2 px-4 bg-black/60 rounded-2xl absolute text-end bottom-4 m-4">
                    {meal.strMeal}
                  </h2>
                </div>

                <div className="mt-3 space-y-2"></div>

                {/* Información adicional */}
                <div className="mt-3 space-y-2">
                  {/* Línea de información */}
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      {ingredientCount} ingredientes
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {difficulty}
                    </div>
                  </div>

                  {/* País/Región */}
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {meal.strArea}
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 bg-[#83ba67] flex flex-col justify-center items-center text-white font-bold gap-4 p-4">
                  <h2 className="text-xl text-center">{meal.strMeal}</h2>
                  <div className="text-center">
                    <p className="text-sm">{meal.strArea}</p>
                    <p className="text-sm">{meal.strCategory}</p>
                  </div>
                  <button className="bg-white text-[#83ba67] px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-100 transition-colors">
                    Ver Receta
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINACIÓN*/}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-4">
            {/* Botón Anterior */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Anterior
            </button>

            {/* Información de página */}
            <span className="text-xs text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
              Página {currentPage} de {totalPages}
            </span>

            {/* Botón Siguiente */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center"
            >
              Siguiente
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
