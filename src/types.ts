export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string | 'maquillaje' | 'cuidado-piel' | 'labios' | 'unas' | 'peluches';
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
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