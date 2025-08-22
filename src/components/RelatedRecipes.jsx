import React, { useState, useEffect } from "react";
import useApi from "../useApi";
import { useNavigate } from "react-router-dom";

const RelatedRecipes = ({ currentRecipe }) => {
  const navigate = useNavigate();
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedRecipes = async () => {
      if (!currentRecipe) return;

      setLoading(true);

      try {
        // Buscar por categoría
        const categoryResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentRecipe.strCategory}`
        );
        const categoryData = await categoryResponse.json();

        // Buscar por área/región
        const areaResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${currentRecipe.strArea}`
        );
        const areaData = await areaResponse.json();

        // Combinar y filtrar resultados
        let combinedRecipes = [];

        // Agregar recetas de la misma categoría (excluyendo la actual)
        if (categoryData.meals) {
          const categoryRecipes = categoryData.meals
            .filter((meal) => meal.idMeal !== currentRecipe.idMeal)
            .slice(0, 6);
          combinedRecipes = [...combinedRecipes, ...categoryRecipes];
        }

        // Agregar recetas de la misma área (excluyendo duplicados y la actual)
        if (areaData.meals) {
          const areaRecipes = areaData.meals
            .filter(
              (meal) =>
                meal.idMeal !== currentRecipe.idMeal &&
                !combinedRecipes.some((r) => r.idMeal === meal.idMeal)
            )
            .slice(0, 6);
          combinedRecipes = [...combinedRecipes, ...areaRecipes];
        }

        // Mezclar y limitar a 4 recetas
        const shuffled = combinedRecipes
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        setRelatedRecipes(shuffled);
      } catch (error) {
        console.error("Error fetching related recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedRecipes();
  }, [currentRecipe]);

  const handleRecipeClick = (mealId) => {
    navigate(`/meal/${mealId}`);
    window.scrollTo(0, 0);
  };

  if (!currentRecipe) return null;

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">🍽️</span>
          Recetas Similares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-2xl p-4 shadow-md">
              <div className="bg-gray-200 h-40 rounded-xl mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedRecipes.length === 0) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">🍽️</span>
          Recetas Similares
        </h2>
        <div className="text-center py-8 bg-gray-50 rounded-2xl">
          <p className="text-gray-600">No se encontraron recetas similares.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <span className="mr-2">🍽️</span>
        Recetas Similares
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedRecipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            onClick={() => handleRecipeClick(recipe.idMeal)}
          >
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl"></div>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#83ba67] transition-colors">
              {recipe.strMeal}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <span className="bg-[#83ba67]/10 text-[#83ba67] px-2 py-1 rounded-full text-xs">
                {currentRecipe.strCategory}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedRecipes;
