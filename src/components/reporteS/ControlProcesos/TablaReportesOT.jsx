import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ROTHP from './ROTHP'
import ROTSA from '../ControlProcesos/encabezados/ROTSA'
import ROTCA1 from './ROTCA1'
import ROTCA2 from './ROTCA2'
import Reporte_lotes_Barro from './Reporte_camionadas_Barro'
import Reporte_lotes_aserrin from './Reporte_lotes_Aserrin'
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
    
    /* case '1':
        return <ROTHP/>
      case '2':
        return <ROTSA/>
      case '3':
        return <ROTCA1/> 
      case '4':
        return <ROTCA2/>*/
      case '1':
         return <Reporte_lotes_Barro/>
      case '2':
         return <Reporte_lotes_aserrin/>
      case '3':
        return <ROTPV/>
      case '4':
        return <ROTFM/>
      case '5':
          return <ROTP/>
      case '6':
          return <ROTHH/>
      case '7':
        return <TablaPorCodigos/>
      case '8':
          return <ROTIP/>
      case '9':
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
{/*<a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '1', 'Reporte Humedad en Patios')}>
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
</a>*/}
<a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '1', 'Lotes Barro')}>
          1. Lotes Barro
</a>
<a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '2', 'Lotes Aserrín')}>
          2. Lotes Aserrín
</a>
<a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '3', 'Pulverizado')}>
          3. Pulverizado
</a>
<a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '4', 'Formulación')}>
          4. Formulación
</a>
<a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '5', 'Producciòn')}>
          5. Producción
</a>
<a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '6', 'Horneados')}>
          6. Horneados
</a>
<a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '7', 'Control de Calidad')}>
          7. Control de calidad
</a>
  <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '8', 'Impregnación')}>
          8. Impregnación
  </a>
  <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '9', 'Mermas Producción')}>
          9. Mermas Producción
  </a>



    

        {/* Agrega más elementos del menú desplegable aquí */}
      </div>
      {selectedOption ? renderSelectedForm() : <ReporteGeneralDiario />}
      
      
    </div>

  );
};

export default BotonOT;
