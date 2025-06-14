import Peluche from './assets/images/peluche.jpg';
import Peluche1 from './assets/images/peluche1.jpg';
import Peluche2 from './assets/images/Peluche2.jpg';
import Peluche3 from './assets/images/Peluche3.jpg';
import Peluche4 from './assets/images/Peluche4.jpg';
import PelucheConCobija from './assets/images/peluche-almuada.jpg'
import PelucheConCobija1 from './assets/images/peluche-almuada1.jpg'
import PelucheConCobija2 from './assets/images/peluche-almuada2.jpg'
import PelucheConCobija21 from './assets/images/peluche-almuada2.1.jpg'
import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Peluches Adorables',
    price: 10.00,
    description: "Peluches suaves y adorables perfectos para regalar o coleccionar. Disponibles en diferentes colores y tamaños.",
    image: [Peluche, Peluche1, Peluche2, Peluche3, Peluche4],
    category: "peluches",
    inStock: true,
    featured: true,
    variations: [
      {
        id: "0",
        name: "Blanco",
        inStock: true,
      },
      {
        id: "1",
        name: "Azule",
        inStock: true,
      },
      {
        id: "2",
        name: "rosado",
        inStock: true,
      },
      {
        id: "3",
        name: "Purpulo",
        inStock: true,
      },
      {
        id: "4",
        name: "Rosado con Trensas",
        inStock: true,
        price: 25.00
      }
    ]
  },
  {
    id: 2,
    name: 'Peluches y Almohada con Cobija',
    price: 25,
    description: "Labial de larga duración con acabado mate. Fórmula hidratante que no reseca los labios.",
    image: [PelucheConCobija, PelucheConCobija1, PelucheConCobija2, PelucheConCobija21],
    category: "peluches",
    inStock: true,
    variations: [
      {
        id: "0",
        name: "Conejo Rosado",
        inStock: true
      },
      {
        id: "1",
        name: "Hello Kitty",
        inStock: true
      },
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