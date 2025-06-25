import React, { useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number, variationId?: string) => void;
  onRemoveItem: (productId: number, variationId?: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 75 ? 0 : 8.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Lock body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getVariationName = (item: CartItem) => {
    if (!item.variationId || !item.product.variations) return '';
    const variation = item.product.variations.find(v => v.id === item.variationId);
    return variation ? ` - ${variation.name}` : '';
  };

  const getItemPrice = (item: CartItem) => {
    if (!item.variationId || !item.product.variations) return item.product.price;
    const variation = item.product.variations.find(v => v.id === item.variationId);
    return variation?.price !== undefined ? variation.price : item.product.price;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-pink-500" />
              <h2 className="text-lg font-semibold text-gray-900">Carrito de Compras</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Tu carrito está vacío</p>
                <p className="text-sm text-gray-400 mt-2">Agrega algunos productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={`${item.product.id}-${item.variationId || 'default'}-${index}`} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
                    <img
                      src={item.product.image[Number(item.variationId)] || item.product.image[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {item.product.name}{getVariationName(item)}
                      </h3>
                      <p className="text-pink-600 font-semibold">${getItemPrice(item).toFixed(2)} USD</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.variationId)}
                        className="p-1 text-gray-400 hover:text-pink-500 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.variationId)}
                        className="p-1 text-gray-400 hover:text-pink-500 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.variationId)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)} USD`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos:</span>
                  <span className="font-medium">${tax.toFixed(2)} USD</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-pink-600">${total.toFixed(2)} USD</span>
                </div>
              </div>
              
              {subtotal < 75 && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-700">
                    Agrega ${(75 - subtotal).toFixed(2)} más para envío gratuito
                  </p>
                </div>
              )}

              <button 
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceder al Pago</span>
              </button>
              <p className="text-xs text-gray-500 text-center">
                Pago seguro con PayPal • Solo envíos en Estados Unidos
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;