export interface ProductVariation {
  id: string;
  name: string; // e.g. "Red", "Large"
  inStock: boolean;
  price?: number; // Optional override per variation
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // Base price
  image: string[]; // Array of all images
  category: 'crema' | 'cartera' | 'lonchera' | 'espejo' | 'peluches' | 'perfume' | 'alcancias' | 'cosmetiquera' | 'mochila';
  inStock: boolean;
  featured?: boolean;
  variations?: ProductVariation[]; // Optional
}

export interface CartItem {
  product: Product;
  quantity: number;
  variationId?: string;
}

export interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  productId: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderDetails {
  id: string;
  items: CartItem[];
  total: number;
  shippingInfo: ShippingInfo;
  paymentId: string;
  orderDate: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}