import React from 'react';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails | null;
  onContinueShopping: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  isOpen,
  onClose,
  orderDetails,
  onContinueShopping
}) => {
  if (!isOpen || !orderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50\" onClick={onClose}></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Gracias por tu pedido!
            </h2>
            <p className="text-gray-600 mb-8">
              Tu pedido ha sido confirmado y pronto recibirás una confirmación por correo electrónico.
            </p>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Detalles del Pedido</h3>
                <span className="text-sm text-gray-500">#{orderDetails.id.slice(-8).toUpperCase()}</span>
              </div>

              <div className="space-y-3 mb-6">
                {orderDetails.items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-sm text-gray-900">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Pagado:</span>
                  <span className="text-pink-600">${orderDetails.total.toFixed(2)} USD</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Package className="h-5 w-5 mr-2 text-blue-500" />
                Información de Envío
              </h3>
              <div className="text-sm text-gray-700">
                <p className="font-medium">{orderDetails.shippingInfo.firstName} {orderDetails.shippingInfo.lastName}</p>
                <p>{orderDetails.shippingInfo.address}</p>
                <p>{orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.state} {orderDetails.shippingInfo.zipCode}</p>
                <p className="mt-2 text-blue-600 font-medium">Tiempo estimado de entrega: 3-5 días hábiles</p>
              </div>
            </div>

            {/* Email Confirmation */}
            <div className="bg-pink-50 rounded-xl p-4 mb-8">
              <div className="flex items-center justify-center space-x-2 text-pink-700">
                <Mail className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Confirmación enviada a {orderDetails.shippingInfo.email}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onContinueShopping}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all flex items-center justify-center space-x-2"
              >
                <span>Seguir Comprando</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-xs text-gray-500">
                ¿Tienes preguntas sobre tu pedido? Contáctanos en{' '}
                <a href="mailto:hola@hailiecosmetics.com" className="text-pink-600 hover:underline">
                  hola@hailiecosmetics.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;