import Peluche from './assets/images/peluche.jpg';
import Peluche1 from './assets/images/peluche1.jpg';
import Peluche2 from './assets/images/Peluche2.jpg';
import Peluche3 from './assets/images/Peluche3.jpg';
import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Peluches',
    price: 10.00,
    description: "Peluches",
    image: Peluche, // [Peluche, Peluche1, Peluche2, Peluche3],
    category: "peluches",
    inStock: true
  },
];