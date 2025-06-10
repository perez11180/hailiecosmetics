import { useState } from 'react';

interface ImageSliderProps {
  imagenes: string[];
  alt: string;
}

export default function ImageSlider({ imagenes, alt }: ImageSliderProps) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? imagenes.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === imagenes.length - 1 ? 0 : i + 1));

  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <img
        src={imagenes[index]}
        alt={`${alt} ${index + 1}`}
        style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
      />
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={prev}>◀️</button>
        <button onClick={next}>▶️</button>
      </div>
    </div>
  );
}
