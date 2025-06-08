import React from 'react';
import { Star, Quote } from 'lucide-react';
import { reviews } from '../data';

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestras clientas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Miles de mujeres ya confían en Hailie Cosmetics para realzar su belleza natural
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Quote className="h-6 w-6 text-pink-400 mr-2" />
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {review.customerName.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{review.customerName}</p>
                  <p className="text-sm text-gray-500">Cliente verificada</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-semibold mr-1">4.8/5</span>
              <span>promedio</span>
            </div>
            <div>
              <span className="font-semibold">1,200+</span> reseñas
            </div>
            <div>
              <span className="font-semibold">98%</span> satisfacción
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;