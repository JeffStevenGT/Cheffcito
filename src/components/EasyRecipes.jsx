import React from "react";
import useApi from "../useApi";
import { useNavigate } from "react-router-dom";

const EasyRecipes = () => {
  const navigate = useNavigate();

  // Categorías que normalmente son fáciles de preparar
  const easyCategories = [
    "Dessert",
    "Breakfast",
    "Starter",
    "Vegetarian",
    "Pasta",
  ];

  // Obtener recetas de categorías fáciles
  const {
    data: meals,
    loading,
    error,
  } = useApi(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert",
    "meals"
  );

  const handleMealClick = (mealId) => {
    navigate(`/meal/${mealId}`);
    window.scrollTo(0, 0);
  };

  // Función para obtener una muestra aleatoria de recetas
  const getRandomEasyRecipes = () => {
    if (!meals || meals.length === 0) return [];

    // Mezclar y tomar 6 recetas
    const shuffled = [...meals].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  };

  const easyRecipes = getRandomEasyRecipes();

  if (loading) {
    return (
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            🍽️ Recetas Fáciles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-3 shadow-md animate-pulse"
              >
                <div className="bg-gray-200 h-32 rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || easyRecipes.length === 0) {
    return null; // No mostrar sección si hay error o no hay recetas
  }

  return (
    <div className="bg-gray-50 pb-12 pt-6  px-4">
      <div className="px-4 mt-16 md:px-15 md:mb-5 md:mt-1">
        {/* Header de la sección */}
        <div className="text-start mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Recetas Fáciles
          </h2>
        </div>

        {/* Grid de recetas fáciles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {easyRecipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-2xl p-3 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              onClick={() => handleMealClick(recipe.idMeal)}
            >
              {/* Imagen */}
              <div className="relative overflow-hidden rounded-xl mb-3">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  🟢 Fácil
                </div>
              </div>

              {/* Información */}
              <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1 group-hover:text-green-600 transition-colors">
                {recipe.strMeal}
              </h3>

              <div className="flex items-center text-xs text-gray-500">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Postre
                </span>
              </div>

              {/* Badge de fácil */}
              <div className="flex items-center mt-2">
                <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ideal para principiantes
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/?search=Dessert")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold cursor-pointer py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            <span className="mr-2">🍰</span>
            Ver más recetas fáciles
            <svg
              className="w-4 h-4 ml-2"
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
      </div>
    </div>
  );
};

export default EasyRecipes;
