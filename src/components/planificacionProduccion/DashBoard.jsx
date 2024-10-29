import React, { useRef } from 'react';
import TablasBoard from './TablasBoard';
import Issues from './Isuues/ConsultarIssues';
import { Carousel } from 'react-bootstrap';
import './App.css';

const App = () => {
  return (
    
    <>
      <div  style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Carousel
          interval={3000}
          prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
          nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
          indicators={false}
        >
          <Carousel.Item>
            <div style={{  height: '100vh',  justifyContent: 'center', alignItems: 'center' }}>
              <TablasBoard>1</TablasBoard>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
              <Issues>2</Issues>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default App;
