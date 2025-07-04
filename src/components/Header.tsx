import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Product } from '../types';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  products?: Product[];
  onProductSelect?: (product: Product) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartItemsCount, 
  onCartClick, 
  activeCategory, 
  onCategoryChange,
  products = [],
  onProductSelect
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered);
    setIsSearchOpen(filtered.length > 0);
  }, [searchQuery, products]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setIsMobileSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleCategoryClick = (category: string) => {
    // If not on homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then update category
      setTimeout(() => {
        onCategoryChange(category);
      }, 100);
    } else {
      onCategoryChange(category);
    }
    setIsMobileMenuOpen(false);
  };

  const handleProductSelect = (product: Product) => {
    if (onProductSelect) {
      // If not on homepage, navigate to homepage first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete, then select product
        setTimeout(() => {
          onProductSelect(product);
        }, 200);
      } else {
        onProductSelect(product);
      }
    }
    setSearchQuery('');
    setIsSearchOpen(false);
    setIsMobileSearchOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    onCategoryChange('all');
  };

  const handleMobileSearchToggle = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen) {
      // Focus the input when opening
      setTimeout(() => {
        const input = document.getElementById('mobile-search-input');
        if (input) input.focus();
      }, 100);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={handleLogoClick}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <Heart className="h-8 w-8 text-pink-400 mr-2" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Hailie Cosmetics
                </h1>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => handleCategoryClick('all')}
                className={`text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors ${
                  activeCategory === 'all' ? 'text-pink-500 border-b-2 border-pink-500' : ''
                }`}
              >
                Todo
              </button>
              <button
                onClick={() => handleCategoryClick('cosmeticos')}
                className={`text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors ${
                  activeCategory === 'cosmeticos' ? 'text-pink-500 border-b-2 border-pink-500' : ''
                }`}
              >
                Cosmeticos
              </button>
              <button
                onClick={() => handleCategoryClick('crema')}
                className={`text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors ${
                  activeCategory === 'crema' ? 'text-pink-500 border-b-2 border-pink-500' : ''
                }`}
              >
                Crema Para la Piel
              </button>
              <button
                onClick={() => handleCategoryClick('peluches')}
                className={`text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors ${
                  activeCategory === 'peluches' ? 'text-pink-500 border-b-2 border-pink-500' : ''
                }`}
              >
                Peluches
              </button>
              <button
                onClick={() => handleCategoryClick('cartera')}
                className={`text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors ${
                  activeCategory === 'cartera' ? 'text-pink-500 border-b-2 border-pink-500' : ''
                }`}
              >
                Carteras
              </button>
              <button
                onClick={() => handleCategoryClick('perfume')}
                className={`text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors ${
                  activeCategory === 'perfume' ? 'text-pink-500 border-b-2 border-pink-500' : ''
                }`}
              >
                Perfumes
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search */}
              <div className="relative hidden sm:block" ref={searchRef}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  />
                </div>
                
                {/* Desktop Search Results Dropdown */}
                {isSearchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductSelect(product)}
                        className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">${product.price.toFixed(2)} USD</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Search Icon */}
              <button 
                onClick={handleMobileSearchToggle}
                className="sm:hidden p-2 text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Cart */}
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

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (Expandable) */}
          {isMobileSearchOpen && (
            <div className="sm:hidden border-t bg-white p-4" ref={mobileSearchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="mobile-search-input"
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              
              {/* Mobile Search Results */}
              {isSearchOpen && (
                <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onMouseDown={() => handleProductSelect(product)}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-white transition-colors text-left"
                    >
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-8 h-8 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">${product.price.toFixed(2)} USD</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Menú</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-6">
                <div className="space-y-4">
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeCategory === 'all' 
                        ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-500' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Todo
                  </button>
                  <button
                    onClick={() => handleCategoryClick('cosmeticos')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeCategory === 'cosmeticos' 
                        ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-500' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cosmeticos
                  </button>
                  <button
                    onClick={() => handleCategoryClick('crema')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeCategory === 'crema' 
                        ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-500' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Crema Para la Piel
                  </button>
                  <button
                    onClick={() => handleCategoryClick('cartera')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeCategory === 'cartera' 
                        ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-500' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Carteras
                  </button>
                  <button
                    onClick={() => handleCategoryClick('peluches')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeCategory === 'peluches' 
                        ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-500' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Peluches
                  </button>
                  <button
                    onClick={() => handleCategoryClick('perfume')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeCategory === 'perfume' 
                        ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-500' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Perfumes
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;