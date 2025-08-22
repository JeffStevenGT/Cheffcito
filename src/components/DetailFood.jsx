import React, { useState, useEffect } from "react";
import useApi from "../useApi";
import { useParams, useNavigate } from "react-router-dom";
import RelatedRecipes from "./RelatedRecipes"; // ✅ Importar el nuevo componente

const DetailFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useApi(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    "meals"
  );
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Cargando receta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error al cargar la receta
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800">
            No se encontró la receta
          </h2>
          <p className="text-gray-600 mt-2">Intenta con otra búsqueda</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-[#83ba67] text-white rounded-md hover:bg-[#6da056] transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const recipe = data[0];

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center text-[#83ba67] hover:text-[#6da056] transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al inicio
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
              <div className="p-6 text-white w-full">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                  {recipe.strMeal}
                </h1>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-orange-500/90 text-white text-sm font-medium px-4 py-2 rounded-full">
                    {recipe.strCategory}
                  </span>
                  <span className="bg-emerald-600/90 text-white text-sm font-medium px-4 py-2 rounded-full">
                    {recipe.strArea}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="border-b border-gray-200 mb-8">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab("instructions")}
                      className={`py-4 px-1 text-lg font-semibold border-b-2 transition-all duration-300 cursor-pointer ${
                        activeTab === "instructions"
                          ? "border-orange-500 text-orange-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      📝 Instrucciones
                    </button>
                    <button
                      onClick={() => setActiveTab("ingredients")}
                      className={`py-4 px-1 text-lg font-semibold border-b-2 transition-all duration-300 cursor-pointer ${
                        activeTab === "ingredients"
                          ? "border-orange-500 text-orange-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      🛒 Ingredientes
                    </button>
                  </nav>
                </div>

                {activeTab === "instructions" && (
                  <div className="mb-8">
                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                      {recipe.strInstructions.split("\r\n").map(
                        (paragraph, index) =>
                          paragraph.trim() && (
                            <div key={index} className="flex items-start">
                              <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-4 mt-1 font-semibold">
                                {index + 1}
                              </span>
                              <p className="flex-1 text-gray-800 leading-relaxed">
                                {paragraph}
                              </p>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "ingredients" && (
                  <div className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {ingredients.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-300 border border-gray-100"
                        >
                          <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <span className="text-gray-800 font-medium">
                              {item.ingredient}
                            </span>
                            {item.measure && (
                              <span className="block text-sm text-orange-600 font-semibold mt-1">
                                {item.measure}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {recipe.strYoutube && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                      <span className="mr-2">🎥</span>
                      Video de la Receta
                    </h2>
                    <div className="bg-gray-200 rounded-xl overflow-hidden shadow-md">
                      <iframe
                        src={recipe.strYoutube.replace("watch?v=", "embed/")}
                        title={`Video de ${recipe.strMeal}`}
                        className="w-full h-64 sm:h-80 lg:h-96"
                        allowFullScreen
                        frameBorder="0"
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-6">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="mr-2">📋</span>
                      Información
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="block text-sm font-medium text-gray-600">
                          Categoría
                        </span>
                        <span className="text-lg font-semibold text-orange-600">
                          {recipe.strCategory}
                        </span>
                      </div>

                      <div>
                        <span className="block text-sm font-medium text-gray-600">
                          Cocina
                        </span>
                        <span className="text-lg font-semibold text-emerald-600">
                          {recipe.strArea}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="mr-2">🛒</span>
                      Resumen de Ingredientes
                    </h3>
                    <div className="space-y-2">
                      {ingredients.slice(0, 5).map((item, index) => (
                        <div key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                          <span className="text-sm text-gray-700">
                            {item.measure && `${item.measure} `}
                            {item.ingredient}
                          </span>
                        </div>
                      ))}
                      {ingredients.length > 5 && (
                        <p className="text-sm text-gray-500 mt-2">
                          +{ingredients.length - 5} ingredientes más...
                        </p>
                      )}
                    </div>
                  </div>

                  {recipe.strYoutube && (
                    <a
                      href={recipe.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center mb-4"
                    >
                      <span className="mr-2">🎥</span>
                      Ver en YouTube
                    </a>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      📊 Detalles
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">ID:</span> {recipe.idMeal}
                      </p>
                      <p>
                        <span className="font-medium">Ingredientes:</span>{" "}
                        {ingredients.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Componente de Recetas Similares */}
        <RelatedRecipes currentRecipe={recipe} />
      </div>
    </div>
  );
};

export default DetailFood;
