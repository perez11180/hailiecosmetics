import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variationId?: string) => void;
  isHighlighted?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isHighlighted }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleButtonClick = () => {
    if (product.variations && product.variations.length > 1) {
      // Navigate to product page for selection
      navigate(`/product/${product.id}`);
    } else {
      // Add directly to cart
      const variationId = product.variations?.[0]?.id;
      onAddToCart(product, variationId);
    }
  };

  const hasMultipleVariations = product.variations && product.variations.length > 1;
  const buttonText = hasMultipleVariations ? 'Seleccionar' : 'Agregar';
  
  // Check if product is available (either no variations or at least one variation in stock)
  const isAvailable = product.inStock && (
    !product.variations || 
    product.variations.some(variation => variation.inStock)
  );

  return (
    <div 
      id={`product-${product.id}`}
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
        isHighlighted ? 'ring-4 ring-pink-400 ring-opacity-75 animate-pulse' : ''
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.name}
          onClick={handleItemClick}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white p-2 rounded-full shadow-lg hover:bg-pink-50 transition-colors">
            <Heart className="h-4 w-4 text-pink-400" />
          </button>
        </div>
        {!isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium">
              Agotado
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 
          onClick={handleItemClick}
          className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors cursor-pointer"
        >
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">(4.8)</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-gray-500 ml-1">USD</span>
            {hasMultipleVariations && (
              <p className="text-xs text-gray-500">Desde</p>
            )}
          </div>
          <button
            onClick={handleButtonClick}
            disabled={!isAvailable}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
              isAvailable
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm">{buttonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;