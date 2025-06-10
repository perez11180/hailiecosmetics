import { useState, useMemo, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Footer from './components/Footer';
import { products } from './data';
import { Product, CartItem, OrderDetails } from './types';

function HomePage({ 
  filteredProducts, 
  onAddToCart, 
  highlightedProductId, 
  scrollToProducts 
}: {
  filteredProducts: Product[];
  onAddToCart: (product: Product, variationId?: string) => void;
  highlightedProductId: number | null;
  scrollToProducts: () => void;
}) {
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
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [highlightedProductId, setHighlightedProductId] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === activeCategory);
  }, [activeCategory]);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (product: Product, variationId?: string) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.variationId === variationId
      );
      
      if (existingItemIndex >= 0) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { product, quantity: 1, variationId }];
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number, variationId?: string) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, variationId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId && item.variationId === variationId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number, variationId?: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.product.id === productId && item.variationId === variationId)
      )
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (details: OrderDetails) => {
    setOrderDetails(details);
    setIsCheckoutOpen(false);
    setIsOrderConfirmationOpen(true);
    setCartItems([]); // Clear cart after successful order
  };

  const handleContinueShopping = () => {
    setIsOrderConfirmationOpen(false);
    setOrderDetails(null);
  };

  const handleProductSelect = (product: Product) => {
    // First change to the correct category
    setActiveCategory(product.category);
    
    // Then scroll to and highlight the product
    setTimeout(() => {
      const element = document.getElementById(`product-${product.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight the selected product
        setHighlightedProductId(product.id);
        setTimeout(() => setHighlightedProductId(null), 2000);
      }
    }, 200);
  };

  const scrollToProducts = () => {
    setTimeout(() => {
      const element = document.querySelector('[data-products-section]');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Header - appears on all pages */}
        <Header
          cartItemsCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(true)}
          activeCategory={activeCategory}
          onCategoryChange={(category) => {
            setActiveCategory(category);
            scrollToProducts();
          }}
          products={products}
          onProductSelect={handleProductSelect}
        />

        {/* Main Content */}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage
                  filteredProducts={filteredProducts}
                  onAddToCart={handleAddToCart}
                  highlightedProductId={highlightedProductId}
                  scrollToProducts={scrollToProducts}
                />
              } 
            />
            <Route 
              path="/product/:id" 
              element={<ProductPage onAddToCart={handleAddToCart} />} 
            />
          </Routes>
        </main>

        {/* Footer - appears on all pages */}
        <Footer />

        {/* Global Modals */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />

        <Checkout
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          onOrderComplete={handleOrderComplete}
        />

        <OrderConfirmation
          isOpen={isOrderConfirmationOpen}
          onClose={() => setIsOrderConfirmationOpen(false)}
          orderDetails={orderDetails}
          onContinueShopping={handleContinueShopping}
        />
      </div>
    </Router>
  );
}

export default App;