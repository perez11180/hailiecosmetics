import { useState, useMemo, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { products } from './data';
import { Product, CartItem, OrderDetails } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [highlightedProductId, setHighlightedProductId] = useState<number | null>(null);
  
  const productsRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === activeCategory);
  }, [activeCategory]);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
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
    scrollToProducts();
  };

  const handleProductSelect = (product: Product) => {
    // First scroll to the products section
    setTimeout(() => {
      const element = document.getElementById(`product-${product.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
        // Optional: highlight the product briefly
        setHighlightedProductId(product.id);
        setTimeout(() => setHighlightedProductId(null), 2000);
      }
    }, 200); 
    
    // Highlight the selected product
    setHighlightedProductId(product.id);
    
    // Remove highlight after animation
    setTimeout(() => {
      setHighlightedProductId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onCategoryChange={(category) => {
          setActiveCategory(category)
          scrollToProducts()
        }}
        products={products}
        onProductSelect={handleProductSelect}
      />
      
      <main>
        <Hero 
          onShopNowClick={scrollToProducts}
          onViewCatalogClick={scrollToProducts}
        />
        <div ref={productsRef}>
          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            highlightedProductId={highlightedProductId}
          />
        </div>
        <Testimonials />
      </main>

      <Footer />

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
  );
}

export default App;