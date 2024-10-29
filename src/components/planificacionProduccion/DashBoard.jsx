import React, { useRef } from 'react';
import TablasBoard from './TablasBoard';
import Issues from './Isuues/ConsultarIssues';
import { Carousel } from 'react-bootstrap';
import './App.css';

const App = () => {
  const sectionRef = useRef(null);

  const handleFullscreen = () => {
    if (sectionRef.current.requestFullscreen) {
      sectionRef.current.requestFullscreen();
    } else if (sectionRef.current.webkitRequestFullscreen) {
      sectionRef.current.webkitRequestFullscreen();
    } else if (sectionRef.current.msRequestFullscreen) {
      sectionRef.current.msRequestFullscreen();
    }

    // Ajustamos la altura después de activar pantalla completa
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.style.height = `${window.innerHeight}px`;
      }
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

      <div ref={sectionRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Carousel
          interval={3000}
          prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
          nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
          indicators={false}
        >
          <Carousel.Item>
            <div style={{  height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <TablasBoard>1</TablasBoard>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Issues>2</Issues>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default App;
