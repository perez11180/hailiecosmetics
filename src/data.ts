import Peluche from './assets/images/peluche.jpg';
import Peluche1 from './assets/images/peluche1.jpg';
import Peluche2 from './assets/images/Peluche2.jpg';
import Peluche3 from './assets/images/Peluche3.jpg';
import Peluche4 from './assets/images/Peluche4.jpg';
import PelucheConCobija from './assets/images/peluche-almuada.jpg'
import PelucheConCobija1 from './assets/images/peluche-almuada1.jpg'
import PelucheConCobija2 from './assets/images/peluche-almuada2.jpg'
import PelucheConCobija21 from './assets/images/peluche-almuada2.1.jpg'
import PelucheConCobija3 from './assets/images/peluche-almuada3.jpg'
import PelucheConCobija31 from './assets/images/peluche-almuada3.1.jpg'
import CarteraDeNina from './assets/images/cartera-de-nina.jpg'
import EspejoHelloKitty from './assets/images/espejo1.jpg'
import EspejoHelloKitty1 from './assets/images/espejo1.1.jpg'
import Lonchera from './assets/images/lonchera.jpg'
import Lonchera1 from './assets/images/lonchera1.jpg'
import LoncheraSet from './assets/images/lonchera-set-con-botella.jpg'
import LoncheraSet1 from './assets/images/lonchera-set-con-botella1.jpg'
import Exfoliante from './assets/images/exfoliante-para-cara.jpg'
import SetDePerfume from './assets/images/set-de-perfume-con-crema.jpg'
import SetDePerfume1 from './assets/images/perfume-de-nino.jpg'
import Alcancias1 from './assets/images/alcancias-de-nino.jpg'
import Alcancias2 from './assets/images/alcancias-de-nino1.jpg'
import CarteraCoach from './assets/images/cartera-coach.jpg'
import Cartera1 from './assets/images/cartera.jpg'
import Cartera2 from './assets/images/cartera1.jpg'
import SetDeStitch from './assets/images/set-de-cosmetiqueras.jpg'
import Cosmetiquera1 from './assets/images/cosmetiquera1.jpg'
import Cosmetiquera11 from './assets/images/cosmetiquera1.1.jpg'
import Cosmetiquera2 from './assets/images/cosmetiquera2.jpg'
import MochillaDeStitch from './assets/images/mochila-de-stitch-grande1.jpg'
import MochillaDeStitch1 from './assets/images/mochila-de-stitch-grande1.1.jpg'
import MochillaDeStitch12 from './assets/images/mochila-de-stitch-grande1.2.jpg'
import PeineGrande from './assets/images/peines-grande.jpg'
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
    description: "Peluches y Almohada con Cobija",
    image: [PelucheConCobija, PelucheConCobija1, PelucheConCobija2, PelucheConCobija21, PelucheConCobija3, PelucheConCobija31],
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
      {
        id: "2",
        name: "Almohada Purpola",
        inStock: true
      },
      {
        id: "4",
        name: "Almohada Roja",
        inStock: true
      },
    ]
  },
  {
    id: 3,
    name: 'Carteras De Niña',
    price: 35.50,
    description: "Cartera De Niña",
    image: [CarteraDeNina, CarteraDeNina],
    category: "cartera",
    inStock: true,
    variations: [   
      {
        id: "0",
        name: "Cartera Naranja",
        inStock: true
      },
      {
        id: "1",
        name: "Cartera Azul",
        inStock: true
      },
    ]
  },
  {
    id: 4,
    name: 'Espejo de Hello Kitty',
    price: 10,
    description: "Espejo de Hello Kitty",
    image: [EspejoHelloKitty, EspejoHelloKitty1],
    category: "espejo",
    inStock: true,
    variations: [
      {
        id: "0",
        name: "Espejo",
        inStock: true
      },
    ]
  },
  {
    id: 5,
    name: 'Lonchera Para Niña',
    price: 8,
    description: "Lonchera Para Niña",
    image: [Lonchera, Lonchera1],
    category: "lonchera",
    inStock: true,
    variations: [
      {
        id: "0",
        name: "Lonchera Rosada",
        inStock: true
      },
      {
        id: "1",
        name: "Lonchera Azul",
        inStock: true
      },
    ]
  },
  {
    id: 6,
    name: 'Lonchera con su botella de agua',
    price: 12,
    description: "Set de Lonchera con su botella de agua",
    image: [LoncheraSet, LoncheraSet1],
    category: "lonchera",
    inStock: true,
    variations: [
      {
        id: "0",
        name: "Lonchera Set",
        inStock: true
      }
    ]
  },
  {
    id: 7,
    name: 'Exfoliante para cara y cuerpo',
    price: 8,
    description: "Exfoliante para cara y cuerpo",
    image: [Exfoliante, Exfoliante],
    category: "crema",
    inStock: true,
    variations: [
      {
        id: "0",
        name: "Pearl",
        inStock: true
      },
      {
        id: "1",
        name: "Strawberry",
        inStock: true
      }
    ]
  },
  {
      id: 8,
      name: 'Set de pefume',
      price: 10,
      description: "Set de perfume con su crema",
      image: [SetDePerfume,SetDePerfume,SetDePerfume],
      category: "perfume",
      inStock: true,
      variations: [
        {
          id: "0",
          name: "Purpura",
          inStock: true
        },
        {
          id: "1",
          name: "Light Blue",
          inStock: true
        },
        {
          id: "2",
          name: "Naranja",
          inStock: true
        }
      ]
    },
    {
      id: 9,
      name: 'Perfume de niña con lipgloss',
      price: 8,
      description: "Perfume de niña con lipgloss",
      image: [SetDePerfume1],
      category: "perfume",
      inStock: true,
      variations: [
        {
          id: "0",
          name: "Stitch Perfume",
          inStock: true
        }
      ]
    },
    {
      id: 10,
      name: 'Alcancias de niños',
      price: 8,
      description: "Alcancias de niños",
      image: [Alcancias1, Alcancias2],
      category: "alcancias",
      inStock: true,
      variations: [
        {
          id: "0",
          name: "Hello Kitty",
          inStock: true
        },
        {
          id: "1",
          name: "Spider Man",
          inStock: true
        }
      ]
    },
    {
      id: 11,
      name: 'Cartera Coach',
      price: 35,
      description: "Cartera Coach de Niñas",
      image: [CarteraCoach],
      category: "cartera",
      inStock: true,
      variations: [
        {
          id: "0",
          name: "Cartera",
          inStock: true
        }
      ]
    },
    {
      id: 12,
      name: 'Carteras',
      price: 25,
      description: "Carteras",
      image: [Cartera1, Cartera2],
      category: "cartera",
      inStock: true,
      variations: [
        {
          id: "0",
          name: "Cosmetiqueras de Stitch",
          inStock: true
        }
      ]
    },
    {
      id: 13,
      name: 'Set de cosmetiqueras',
      price: 30,
      description: "Set de cosmetiqueras",
      image: [SetDeStitch],
      category: "cosmetiquera",
      inStock: true,
      variations: [
        {
          id: "0",
          name: "Cosmetiqueras de Stitch",
          inStock: true
        }
      ]
    },
    {
      id: 14,
      name: 'Cosmetiqueras',
      price: 12,
      description: "Cosmetiqueras",
      image: [Cosmetiquera1, Cosmetiquera11, Cosmetiquera2],
      category: "cosmetiquera",
      inStock: true,
      variations: [
        {
          id: "0",
          name: "Cosmetiqueras de Hello Kitty",
          inStock: true
        },
        {
          id: "2",
          name: "Cosmetiqueras de Stitch",
          inStock: true,
          price: 25
        }
      ]
    },
    {
      id: 15,
      name: 'Mochila de stitch grande',
      price: 20,
      description: "Mochila de stitch grande",
      image: [MochillaDeStitch, MochillaDeStitch1, MochillaDeStitch12],
      category: "mochila",
      inStock: true,
      variations: [
        {
          id: "0",
          name: "Mochila de stitch grande",
          inStock: true
        },
      ]
    },
    {
      id: 16,
      name: 'Peine grande',
      price: 5,
      description: "Peine grande $5 la pieza",
      image: [PeineGrande],
      category: "mochila",
      inStock: true,
      variations: [
        {
          id: "0",
          name: "Light Blue",
          inStock: true
        },
        {
          id: "1",
          name: "Azul",
          inStock: true
        },
        {
          id: "2",
          name: "Rosado",
          inStock: true
        },
      ]
    },
]
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