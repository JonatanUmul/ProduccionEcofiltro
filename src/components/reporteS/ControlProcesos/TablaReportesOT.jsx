import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ROTHP from './ROTHP'
import ROTSA from '../ControlProcesos/encabezados/ROTSA'
import ROTCA1 from './ROTCA1'
import ROTCA2 from './ROTCA2'
import ROTPV from './ROTPV'
import ROTFM from './ROTFM'
import ROTP from './ROTP'
import ROTHH from './encabezados/ROTHH'
import ROTIP from './ROTIP'
import ReporteMermasProduccion from './ReporteMermasProduccion'
import TablaPorCodigos from '../../laboratorio/TablaPorCodigos'
import ReporteGeneralDiario from '../ReporteGeneralDiario';


const BotonOT = () => {
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    const dropdownToggle = document.getElementById('dropdownMenuButton');
    if (dropdownToggle) {
      new bootstrap.Dropdown(dropdownToggle);
    }
  }, []);

  const toggleModal = () => setModal(!modal);

  // Función para manejar el evento de clic en un elemento del menú desplegable
  const handleDropdownItemClick = (event, option, title) => {
    // Evita que el enlace predeterminado se active
    event.preventDefault();
    // Abre el modal
    setSelectedOption(option);
    setModalTitle(title);
    toggleModal();
  };

  // Función para renderizar el componente correspondiente al formulario seleccionado
  const renderSelectedForm = () => {
    switch (selectedOption) {
    
      case '1':
        return <ROTHP/>
      case '2':
        return <ROTSA/>
      case '3':
        return <ROTCA1/> 
      case '4':
        return <ROTCA2/>
      case '5':
        return <ROTPV/>
      case '6':
        return <ROTFM/>
      case '7':
          return <ROTP/>
      case '8':
          return <ROTHH/>
      case '9':
        return <TablaPorCodigos/>
      case '10':
          return <ROTIP/>
      case '11':
          return <ReporteMermasProduccion/>
       

      default:
        return null;
    }
  };

  return (
    <div className="dropdown">
    
    {/* Renderiza el componente correspondiente al formulario seleccionado dentro del modal */}

      <button
        className="btn btn-secondary dropdown-toggle mb-3"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Reporte
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '1', 'Reporte Humedad en Patios')}>
          1. Reporte Humedad en Patios 
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '2', 'Extrusora 2.0')}>
          2. Reporte Secado de ASerrín
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '3', 'Cernido 1')}>
          3. Reporte Cernido 1  
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '4', 'Cernido 2')}>
          4. Reporte Cernido 2
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '5', 'Pulverizado')}>
          5. Pulverizado
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '6', 'Formulación')}>
        6. Formulación
      </a>
      <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '7', 'Producciòn')}>
      7. Producciòn
    </a>
    <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '8', 'Horneados')}>
    8. Horneados
  </a>
  <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '9', 'Control de Calidad')}>
    9. Control de calidad
  </a>
  <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '10', 'Impregnación')}>
    10. Impregnación
  </a>
  <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '11', 'Mermas Producción')}>
    10. Mermas Producción
  </a>



    

        {/* Agrega más elementos del menú desplegable aquí */}
      </div>
      {selectedOption ? renderSelectedForm() : <ReporteGeneralDiario />}
      
      
    </div>

  );
};

export default BotonOT;
