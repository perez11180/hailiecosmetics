import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, variationId?: string) => void;
  highlightedProductId?: number | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, highlightedProductId }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" data-products-section>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Productos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra cuidadosa selección de productos de belleza de alta calidad, 
            diseñados para realzar tu belleza natural.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay productos disponibles en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                isHighlighted={highlightedProductId === product.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;