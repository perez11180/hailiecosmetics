import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import { products } from './data';
import { Product, CartItem, OrderDetails } from './types';

function AppContent() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
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
    navigate('/checkout');
  };

  const handleOrderComplete = (details: OrderDetails) => {
    setOrderDetails(details);
    setIsOrderConfirmationOpen(true);
    setCartItems([]); // Clear cart after successful order
    navigate('/'); // Navigate back to home after order completion
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
              <Home
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
          <Route 
            path="/checkout" 
            element={
              <CheckoutPage 
                cartItems={cartItems} 
                onOrderComplete={handleOrderComplete} 
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />}/>
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

      <OrderConfirmation
        isOpen={isOrderConfirmationOpen}
        onClose={() => setIsOrderConfirmationOpen(false)}
        orderDetails={orderDetails}
        onContinueShopping={handleContinueShopping}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;