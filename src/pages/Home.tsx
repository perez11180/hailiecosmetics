import { useRef } from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types';

interface HomeProps {
  filteredProducts: Product[];
  onAddToCart: (product: Product, variationId?: string) => void;
  highlightedProductId: number | null;
  scrollToProducts: () => void;
}

const Home: React.FC<HomeProps> = ({ 
  filteredProducts, 
  onAddToCart, 
  highlightedProductId, 
  scrollToProducts 
}) => {
  const productsRef = useRef<HTMLDivElement>(null);

  const handleScrollToProducts = () => {
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <Hero 
        onShopNowClick={handleScrollToProducts}
        onViewCatalogClick={handleScrollToProducts}
      />
      <div ref={productsRef}>
        <ProductGrid
          products={filteredProducts}
          onAddToCart={onAddToCart}
          highlightedProductId={highlightedProductId}
        />
      </div>
    </>
  );
};

export default Home;