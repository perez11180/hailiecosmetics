import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNowClick: () => void;
  onViewCatalogClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNowClick, onViewCatalogClick }) => {
  return (
    <section className="relative bg-gradient-to-br from-pink-50 to-rose-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <Sparkles className="h-6 w-6 text-pink-400 mr-2" />
              <span className="text-pink-600 font-medium text-sm uppercase tracking-wide">
                Nueva Colección
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Descubre tu{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                brillo natural
              </span>{' '}
              con Hailie Cosmetics
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Productos de belleza de alta calidad para resaltar tu esencia única. 
              Descubre nuestra colección de maquillaje, cuidado de la piel y más.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={onShopNowClick}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Comprar Ahora
              </button>
              <button 
                onClick={onViewCatalogClick}
                className="border-2 border-pink-400 text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition-colors"
              >
                Ver Productos
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Envío gratuito en pedidos +$75</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>Solo en Estados Unidos</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto lg:max-w-lg">
              <img
                src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Productos de belleza Hailie Cosmetics"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">+1000 clientes satisfechas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;