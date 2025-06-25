import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartItem, ShippingInfo, OrderDetails } from '../types';
import emailjs from '@emailjs/browser';
import { US_STATES } from '../data';

interface CheckoutPageProps {
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
    await fetch("https://hailiecosmetics.com/.netlify/functions/sendOrderEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    

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

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  onOrderComplete
}) => {
  const navigate = useNavigate();
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
    
    sendOrderEmail(orderDetails).then(() => onOrderComplete(orderDetails));
  };

  const handleBackClick = () => {
    if (step === 'payment') {
      setStep('shipping');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">
              {step === 'payment' ? 'Volver a envío' : 'Volver a carrito'}
            </span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {step === 'shipping' ? 'Información de Envío' : 'Pago'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 h-fit">
            {step === 'shipping' ? (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tu nombre"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tu apellido"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tu ciudad"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado *
                    </label>
                    <select
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Selecciona estado</option>
                      {US_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                      errors.zipCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="12345"
                  />
                  {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Continuar al Pago
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3">Dirección de Envío</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                    <p>{shippingInfo.email}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-pink-500" />
                    Método de Pago
                  </h3>
                  <PayPalScriptProvider options={{
                    clientId: "test", // En producción, usar client ID real
                    currency: "USD"
                  }}>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={(_, actions) => {
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
                      onApprove={async (_, actions) => {
                        return actions.order!.capture().then(handlePaymentSuccess);
                      }}
                      onError={(err) => {
                        console.error('PayPal error:', err);
                        alert('Error en el pago. Por favor intenta de nuevo.');
                      }}
                    />
                  </PayPalScriptProvider>
                </div>

                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 pt-4 border-t">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                    <span>Pago seguro</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Envío 3-5 días</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 h-fit lg:sticky lg:top-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Resumen del Pedido</h3>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.variationId || 'default'}`} className="flex items-center space-x-4">
                  <img
                    src={item.product.image[Number(item.variationId)] || item.product.image[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                    {item.variationId && item.product.variations && (
                      <p className="text-sm text-gray-500">
                        {item.product.variations.find(v => v.id === item.variationId)?.name}
                      </p>
                    )}
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-6 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío:</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Impuestos:</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-pink-600">${total.toFixed(2)} USD</span>
              </div>
            </div>

            {subtotal < 75 && (
              <div className="mt-6 bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-blue-700">
                  Agrega ${(75 - subtotal).toFixed(2)} más para envío gratuito
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;