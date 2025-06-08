import React from 'react';
import { ShoppingBag, Heart, User, Search, Menu } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartItemsCount, 
  onCartClick, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-pink-400 mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Hailie Cosmetics
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onCategoryChange('all')}
              className={`text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors ${
                activeCategory === 'all' ? 'text-pink-500 border-b-2 border-pink-500' : ''
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => onCategoryChange('maquillaje')}
              className={`text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors ${
                activeCategory === 'maquillaje' ? 'text-pink-500 border-b-2 border-pink-500' : ''
              }`}
            >
              Maquillaje
            </button>
            <button
              onClick={() => onCategoryChange('cuidado-piel')}
              className={`text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors ${
                activeCategory === 'cuidado-piel' ? 'text-pink-500 border-b-2 border-pink-500' : ''
              }`}
            >
              Cuidado de la Piel
            </button>
            <button
              onClick={() => onCategoryChange('labios')}
              className={`text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors ${
                activeCategory === 'labios' ? 'text-pink-500 border-b-2 border-pink-500' : ''
              }`}
            >
              Labios
            </button>
            <button
              onClick={() => onCategoryChange('unas')}
              className={`text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors ${
                activeCategory === 'unas' ? 'text-pink-500 border-b-2 border-pink-500' : ''
              }`}
            >
              Uñas
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
            <User className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-400 hover:text-pink-500 transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <Menu className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;