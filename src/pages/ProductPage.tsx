import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, ProductVariation } from '../types';
import { products } from '../data';

interface ProductPageProps {
  onAddToCart: (product: Product, variationId?: string) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        // Set default variation if available
        if (foundProduct.variations && foundProduct.variations.length > 0) {
          const firstAvailableVariation = foundProduct.variations.find(v => v.inStock);
          setSelectedVariation(firstAvailableVariation || foundProduct.variations[0]);
        }
      }
    }
  }, [id]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariation?.id);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.image.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.image.length) % product.image.length);
  };

  const getCurrentPrice = () => {
    if (selectedVariation?.price !== undefined) {
      return selectedVariation.price;
    }
    return product.price;
  };

  const isProductAvailable = () => {
    if (!product.inStock) return false;
    if (!product.variations) return true;
    if (!selectedVariation) return false;
    return selectedVariation.inStock;
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Volver a productos</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Slideshow */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={product.image[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {product.image.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}

              {!isProductAvailable() && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-white text-gray-800 px-6 py-3 rounded-full font-medium text-lg">
                    Agotado
                  </span>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.image.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.image.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-pink-500 ring-2 ring-pink-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-3xl font-bold text-gray-900">
              ${getCurrentPrice().toFixed(2)}
              <span className="text-lg text-gray-500 ml-2">USD</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Variations */}
            {product.variations && product.variations.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Opciones:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.variations.map((variation) => (
                    <button
                      key={variation.id}
                      onClick={() => {
                        setCurrentImageIndex(Number(variation.id))
                        setSelectedVariation(variation)
                      }}
                      disabled={!variation.inStock}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedVariation?.id === variation.id
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : variation.inStock
                          ? 'border-gray-200 hover:border-gray-300 text-gray-700'
                          : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="font-medium">{variation.name}</div>
                      {variation.price !== undefined && (
                        <div className="text-sm text-gray-600">
                          ${variation.price.toFixed(2)} USD
                        </div>
                      )}
                      {!variation.inStock && (
                        <div className="text-xs text-red-500 mt-1">Agotado</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!isProductAvailable()}
                className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                  isProductAvailable()
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Agregar al carrito</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-600">Envío gratuito en pedidos +$75</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-600">Entrega en 3-5 días hábiles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-600">Garantía de satisfacción</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-600">Solo envíos en Estados Unidos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;