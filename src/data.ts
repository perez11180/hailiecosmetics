import { Product, Review } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Base Luminosa Perfecta",
    description: "Base de maquillaje con cobertura natural y acabado luminoso para todo tipo de piel.",
    price: 45.99,
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "maquillaje",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Labial Mate Sedoso",
    description: "Labial de larga duración con textura sedosa y colores intensos.",
    price: 24.99,
    image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "labios",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Sérum Vitamina C",
    description: "Sérum antioxidante que ilumina y rejuvenece la piel naturalmente.",
    price: 35.50,
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "cuidado-piel",
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Esmalte Brillante Rosa",
    description: "Esmalte de uñas de larga duración con acabado brillante y secado rápido.",
    price: 12.99,
    image: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "unas",
    inStock: true
  },
  {
    id: 5,
    name: "Paleta de Sombras Sunset",
    description: "Paleta con 12 tonos cálidos perfectos para looks de día y noche.",
    price: 42.00,
    image: "https://images.pexels.com/photos/2533265/pexels-photo-2533265.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "maquillaje",
    inStock: true
  },
  {
    id: 6,
    name: "Crema Hidratante Nocturna",
    description: "Crema nutritiva que repara y regenera la piel durante la noche.",
    price: 38.75,
    image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "cuidado-piel",
    inStock: true
  },
  {
    id: 7,
    name: "Gloss Labial Transparente",
    description: "Brillo labial hidratante con efecto volumen y acabado natural.",
    price: 18.99,
    image: "https://images.pexels.com/photos/2533312/pexels-photo-2533312.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "labios",
    inStock: true
  },
  {
    id: 8,
    name: "Kit Uñas Completo",
    description: "Set completo con base, color y top coat para manicura profesional.",
    price: 29.99,
    image: "https://images.pexels.com/photos/3997962/pexels-photo-3997962.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "unas",
    inStock: true
  },
  {
    id: 9,
    name: "Corrector Iluminador",
    description: "Corrector de alta cobertura con efecto iluminador para un look natural.",
    price: 28.50,
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "maquillaje",
    inStock: true
  },
  {
    id: 10,
    name: "Máscara de Pestañas Volumen",
    description: "Máscara que proporciona volumen y longitud extrema sin grumos.",
    price: 32.99,
    image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "maquillaje",
    inStock: true
  },
  {
    id: 11,
    name: "Tónico Facial Purificante",
    description: "Tónico que equilibra el pH de la piel y minimiza los poros.",
    price: 26.75,
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "cuidado-piel",
    inStock: true
  },
  {
    id: 12,
    name: "Delineador Líquido Negro",
    description: "Delineador de precisión con aplicador ultra fino y larga duración.",
    price: 22.99,
    image: "https://images.pexels.com/photos/2533265/pexels-photo-2533265.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "maquillaje",
    inStock: true
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    customerName: "María González",
    rating: 5,
    comment: "Productos increíbles, la base tiene una cobertura perfecta y dura todo el día.",
    productId: 1
  },
  {
    id: 2,
    customerName: "Ana Rodríguez",
    rating: 5,
    comment: "El labial mate es mi favorito, no se corre y el color es hermoso.",
    productId: 2
  },
  {
    id: 3,
    customerName: "Carmen Silva",
    rating: 4,
    comment: "El sérum de vitamina C ha mejorado mucho mi piel, lo recomiendo totalmente.",
    productId: 3
  },

];

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];