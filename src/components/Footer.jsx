import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isDetailPage = location.pathname.includes("/meal/");

  // Ocultar footer en detalle si se quiere
  /* if (isDetailPage) return null; */

  return (
    <footer className="bg-gradient-to-br from-[#6da056] to-[#83ba67] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 md:flex md: justify-between gap-8">
          {/*Logo e información */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg mr-4">
                <img
                  src="/images/Cheffcito-Photoroom.webp"
                  alt="Chefcito Logo"
                  className="h-12 object-contain"
                />
              </div>
            </div>
            <p className="text-white/90 mb-4 leading-relaxed md:w-70">
              Descubre las mejores recetas de cocina internacional. Desde platos
              tradicionales hasta creaciones innovadoras.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.youtube.com/@elmejorshowdelacultura"
                className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/*Enlaces rápidos */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Enlaces Rápidos
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-orange-400 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Categorías
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Cocinas del Mundo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Recetas Fáciles
                </a>
              </li>
            </ul>
          </div>

          {/*Formulario de contacto */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-orange-400 rounded-full"></span>
            </h3>
            <p className="text-white/90 mb-4">
              Suscríbete para recibir las mejores recetas cada semana.
            </p>
            <form
              action="https://formsubmit.co/yamirngifo18@gmail.com"
              method="POST"
              className="space-y-3"
            >
              <input
                type="email"
                name="email"
                placeholder="Tu correo electrónico"
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/70 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <span className="mr-2">✉️</span>
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
