import { Product } from './types';
import logoImg from './assets/images/peluche.jpg';


export const products: Product[] = [
  {
    id: 1,
    name: "Peluche",
    description: "Regala un poco de Amor Con un Peluche.",
    price: 10,
    image: logoImg,
    category: "Peluches",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "peluche",
    description: "Demuestra tu amor con un peluche",
    price: 24.99,
    image: logoImg,
    category: "peluches",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Sérum Vitamina C",
    description: "Sérum antioxidante que ilumina y rejuvenece la piel naturalmente.",
    price: 35.5,
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
    price: 42,
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
    price: 28.5,
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
