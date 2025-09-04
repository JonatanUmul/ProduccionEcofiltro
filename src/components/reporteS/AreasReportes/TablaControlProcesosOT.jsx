import React, { useEffect, useState } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import ROTPB from "./ROTPB";
import ROTPS from "./ROTPS";
import CalidadProduccionCrudos from "./CalidadProduccionCrudos";
import ROTT from "./encabezados/ROTT";
import ROTH from "./encabezados/ROTH";
import ROTHSOLANTEC from "./encabezados/ROTHSOLANTEC";

const BotonOT = () => {
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const dropdownToggle = document.getElementById("dropdownMenuButton");
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
      case "1":
        return <ROTPB />;
      case "2":
        return <ROTPS />;
      case "3":
        return <CalidadProduccionCrudos />;
      case "4":
        return <ROTT />;
      case "5":
        return <ROTH />;
      case "6":
        return <ROTHSOLANTEC />;
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
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => handleDropdownItemClick(e, "1", "Pulida Base")}
        >
          1. Pulida Base
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => handleDropdownItemClick(e, "2", "Pulida Superior")}
        >
          2. Pulida Superior
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => handleDropdownItemClick(e, "3", "Pulida Superior")}
        >
          3. Calidad Producción Crudos
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => handleDropdownItemClick(e, "4", "Temperatura Tunel")}
        >
          4. Temperatura Tunel
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => handleDropdownItemClick(e, "5", "Temperatura Hornos")}
        >
          5. Temperatura Hornos Manual
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) =>
            handleDropdownItemClick(e, "6", "Temperatura Solantec")
          }
        >
          6. Temperatura Solantec
        </a>

        {/* Agrega más elementos del menú desplegable aquí */}
      </div>
      {renderSelectedForm()}
    </div>
  );
};

export default BotonOT;
