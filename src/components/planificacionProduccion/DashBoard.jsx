import React, { useRef } from 'react';
import TablasBoard from './TablasBoard';
import Issues from './Isuues/ConsultarIssues';
import { Carousel } from 'antd';
import './App.css';

const App = () => {
  const sectionRef = useRef(null); // Referencia para el contenedor general
  const carouselRef = useRef(null); // Referencia del carrusel

  const handleFullscreen = () => {
    if (sectionRef.current.requestFullscreen) {
      sectionRef.current.requestFullscreen();
    } else if (sectionRef.current.webkitRequestFullscreen) {
      sectionRef.current.webkitRequestFullscreen();
    } else if (sectionRef.current.msRequestFullscreen) {
      sectionRef.current.msRequestFullscreen();
    }

    // Forzar redimensionado después de entrar en pantalla completa
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.goTo(0); // Resetea el carrusel al primer slide (opcional)
      }
      window.dispatchEvent(new Event('resize')); // Forzar el evento de redimensionado
    }, 500);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          style={{ marginTop: '5px', width: '10%' }}
          className='btn-primary'
          onClick={handleFullscreen}
        >
          Pantalla Completa
        </button>
      </div>

      <div ref={sectionRef} style={{ height: '100vh', overflow: 'hidden' }}>
        <Carousel ref={carouselRef} autoplay>
          <div style={{ height: '100vh', overflow: 'hidden' }}>
            <TablasBoard>1</TablasBoard>
          </div>
          <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Issues>2</Issues>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default App;
