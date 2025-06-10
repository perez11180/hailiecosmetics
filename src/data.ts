import Peluche from './assets/images/peluche.jpg';
import Peluche1 from './assets/images/peluche1.jpg';
import Peluche2 from './assets/images/Peluche2.jpg';
import Peluche3 from './assets/images/Peluche3.jpg';
import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Peluches Adorables',
    price: 10.00,
    description: "Peluches suaves y adorables perfectos para regalar o coleccionar. Disponibles en diferentes colores y tamaños.",
    image: [Peluche, Peluche1, Peluche2, Peluche3],
    category: "peluches",
    inStock: true,
    featured: true,
    variations: [
      {
        id: "0",
        name: "Blanco",
        inStock: true,
        price: 8.00
      },
      {
        id: "1",
        name: "Azule",
        inStock: true,
        price: 10.00
      },
      {
        id: "2",
        name: "rosado",
        inStock: false,
        price: 15.00
      },
      {
        id: "3",
        name: "Purpulo",
        inStock: true,
        price: 8.00
      }
    ]
  },
  {
    id: 2,
    name: 'Labial Mate Premium',
    price: 25.99,
    description: "Labial de larga duración con acabado mate. Fórmula hidratante que no reseca los labios.",
    image: [
      "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    category: "labios",
    inStock: true,
    variations: [
      {
        id: "0",
        name: "Rojo Clásico",
        inStock: true
      },
      {
        id: "1",
        name: "Rosa Nude",
        inStock: true
      },
      {
        id: "2",
        name: "Berry Intenso",
        inStock: false
      }
    ]
  },
  {
    id: 3,
    name: 'Base de Maquillaje',
    price: 35.50,
    description: "Base de maquillaje de cobertura completa con protección solar SPF 30. Ideal para todo tipo de piel.",
    image: [
      "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    category: "maquillaje",
    inStock: true
  }
];

export const US_STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];