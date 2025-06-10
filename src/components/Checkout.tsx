import React, { useState, useEffect } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { X, ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { CartItem, ShippingInfo, OrderDetails } from '../types';
import emailjs from '@emailjs/browser';


interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: (orderDetails: OrderDetails) => void;
}
const sendOrderEmail = async (order: OrderDetails) => {
  const itemList = order.items
    .map(item => `- ${item.product.name} x${item.quantity} ($${item.product.price.toFixed(2)})`)
    .join('\n');

  const params = {
    first_name: order.shippingInfo.firstName,
    last_name: order.shippingInfo.lastName,
    user_email: order.shippingInfo.email,
    address: order.shippingInfo.address,
    city: order.shippingInfo.city,
    state: order.shippingInfo.state,
    zip_code: order.shippingInfo.zipCode,
    items: itemList,
    total: order.total.toFixed(2)
  };

  try {
    const res = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      params,
      'YOUR_PUBLIC_KEY'
    );
    console.log('Email sent:', res.status);
  } catch (err) {
    console.error('Email sending failed:', err);
  }
};
const Checkout: React.FC<CheckoutProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderComplete
}) => {
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 75 ? 0 : 8.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const validateShipping = () => {
    const newErrors: Partial<ShippingInfo> = {};
    
    if (!shippingInfo.firstName.trim()) newErrors.firstName = 'Nombre requerido';
    if (!shippingInfo.lastName.trim()) newErrors.lastName = 'Apellido requerido';
    if (!shippingInfo.email.trim()) newErrors.email = 'Email requerido';
    if (!shippingInfo.address.trim()) newErrors.address = 'Dirección requerida';
    if (!shippingInfo.city.trim()) newErrors.city = 'Ciudad requerida';
    if (!shippingInfo.state) newErrors.state = 'Estado requerido';
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = 'Código postal requerido';
    
    if (shippingInfo.email && !/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (shippingInfo.zipCode && !/^\d{5}(-\d{4})?$/.test(shippingInfo.zipCode)) {
      newErrors.zipCode = 'Código postal inválido (formato: 12345 o 12345-6789)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('payment');
    }
  };

  const handlePaymentSuccess = (details: any) => {
    const orderDetails: OrderDetails = {
      id: details.id,
      items: cartItems,
      total,
      shippingInfo,
      paymentId: details.id,
      orderDate: new Date(),
      status: 'confirmed'
    };
    
    sendOrderEmail(orderDetails).then(() => onOrderComplete(orderDetails))
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-4">
                {step === 'payment' && (
                  <button
                    onClick={() => setStep('shipping')}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                <h2 className="text-xl font-semibold text-gray-900">
                  {step === 'shipping' ? 'Información de Envío' : 'Pago'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Left Side - Form */}
                <div className="p-6 border-b lg:border-r lg:border-b-0 max-h-[50vh] overflow-y-auto">
                  {step === 'shipping' ? (
                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre *
                          </label>
                          <input
                            type="text"
                            value={shippingInfo.firstName}
                            onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Tu nombre"
                          />
                          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Apellido *
                          </label>
                          <input
                            type="text"
                            value={shippingInfo.lastName}
                            onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              errors.lastName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Tu apellido"
                          />
                          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="tu@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dirección *
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123 Main Street"
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ciudad *
                          </label>
                          <input
                            type="text"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              errors.city ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Tu ciudad"
                          />
                          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estado *
                          </label>
                          <select
                            value={shippingInfo.state}
                            onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              errors.state ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Selecciona estado</option>
                            {US_STATES.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Código Postal *
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors.zipCode ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="12345"
                        />
                        {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all"
                        >
                          Continuar al Pago
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Dirección de Envío</h3>
                        <p className="text-sm text-gray-600">
                          {shippingInfo.firstName} {shippingInfo.lastName}<br />
                          {shippingInfo.address}<br />
                          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-pink-500" />
                          Método de Pago
                        </h3>
                        <PayPalScriptProvider options={{
                          clientId: "test", // En producción, usar client ID real
                          currency: "USD"
                        }}>
                          <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                intent: "CAPTURE",
                                purchase_units: [{
                                  amount: {
                                    currency_code: "USD",
                                    value: total.toFixed(2)
                                  }
                                }]
                              });
                            }}
                            onApprove={(data, actions) => {
                              return actions.order!.capture().then(handlePaymentSuccess);
                            }}
                            onError={(err) => {
                              console.error('PayPal error:', err);
                              alert('Error en el pago. Por favor intenta de nuevo.');
                            }}
                          />
                        </PayPalScriptProvider>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-1 text-green-500" />
                          <span>Pago seguro</span>
                        </div>
                        <div className="flex items-center">
                          <Truck className="h-4 w-4 mr-1 text-blue-500" />
                          <span>Envío 3-5 días</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side - Order Summary */}
                <div className="p-6 bg-gray-50 max-h-[50vh] overflow-y-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h3>
                  
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">{item.product.name}</p>
                          <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Envío:</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Impuestos:</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="font-bold text-lg text-pink-600">${total.toFixed(2)} USD</span>
                    </div>
                  </div>

                  {subtotal < 75 && (
                    <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-700">
                        Agrega ${(75 - subtotal).toFixed(2)} más para envío gratuito
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;