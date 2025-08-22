import { useState, useEffect } from "react";
import useApi from "../useApi";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  let url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";
  const { data, loading, error } = useApi(url, "meals");
  const navigate = useNavigate(); // Hook para navegación

  const [randomMeals, setRandomMeals] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setRandomMeals(shuffled.slice(0, 3));
  }, [data]);

  useEffect(() => {
    if (randomMeals.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % randomMeals.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [randomMeals]);

  // Función para manejar el clic en "Ver Receta"
  const handleViewRecipe = (mealId, mealName) => {
    // Navegar a la página de detalle
    navigate(`/meal/${mealId}`);
    // Hacer scroll al top
    window.scrollTo(0, 0);

    // Opcional: Analytics o tracking
    console.log(`Ver receta: ${mealName} (ID: ${mealId})`);
  };

  if (randomMeals.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-gray-200 rounded-2xl my-6 max-w-6xl mx-auto">
        <p className="text-gray-600">No se encontraron comidas.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-120 overflow-hidden">
      {randomMeals.map((meal, index) => (
        <div
          key={meal.idMeal}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Imagen del slide */}
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover"
          />

          {/* Overlay con texto */}
          <div className="absolute inset-0 bg-black/40">
            <div className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-24 text-center text-white px-6">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {meal.strMeal}
              </h1>
              <p className="text-base sm:text-lg mb-4">
                Descubre más sobre esta deliciosa receta.
              </p>
              {/*Botón con funcionalidad */}
              <button
                onClick={() => handleViewRecipe(meal.idMeal, meal.strMeal)}
                className="px-5 py-2 rounded font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 text-sm bg-[#83ba67] hover:bg-[#6da056] text-white shadow-md hover:shadow-lg"
              >
                Ver Receta
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Paginación (puntos) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {randomMeals.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer border border-white ${
              index === current ? "bg-white" : "bg-[#83ba67]"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
