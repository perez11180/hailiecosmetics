import React from 'react';
import { Heart, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-pink-400 mr-2" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Hailie Cosmetics
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Productos de belleza de alta calidad para resaltar tu esencia única. 
              Descubre tu brillo natural con nosotras.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Productos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Maquillaje</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Cuidado de la Piel</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Labios</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Uñas</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Novedades</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Guía de Productos</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-pink-400" />
                <span>hola@hailiecosmetics.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-pink-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-pink-400" />
                <span>Estados Unidos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Hailie Cosmetics. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-xs">Pago seguro con</span>
              <div className="flex space-x-2">
                <div className="bg-gray-800 px-3 py-1 rounded text-xs font-medium">PAYPAL</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs font-medium">VISA</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs font-medium">MC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;