import React, { useState } from "react";

import { Modal, ModalFooter, ModalBody, ModalHeader } from "reactstrap";

import ConsultaDTCA1 from "../consutas/DetalleMuestraBarro";
import DetalleMezcladoAserrin from "../consutas/DetalleMezcladoAserrin";
import Detallses_del_Aserrin from "../consutas/Detallses_del_Aserrin";

const Detalle = ({encabezado1, datosApi }) => {
  console.log(encabezado1)
  const encabezado = datosApi.encabezado;
  const [modalVisible, setModalVisible] = useState(false);
  const [datosdeConsu, setDatosConsu] = useState("");
  // Función para abrir el modal cuando se hace clic en el botón
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDataLoaded = (respuestaApi) => {
    setDatosConsu(respuestaApi);
  };

  // Función para renderizar el formulario seleccionado según el ID
  const renderSelectedForm = () => {
    switch (!encabezado1? encabezado:encabezado1) {
      case "muestras":
        return <ConsultaDTCA1 datosApi={datosApi} />;
      case "ot_mezclado_aserrin":
        return <DetalleMezcladoAserrin datosApi={datosApi} />;
      case "dotdmp":
        return <Detallses_del_Aserrin datosApi={datosApi} />;
      default:
        return <p>Formulario no encontrado</p>;
    }
  };

  // Definir una función de manejo de clics
  const handleClick = () => {
    // Aquí puedes realizar cualquier acción necesaria con el ID seleccionado
    // Por ejemplo, abrir el modal correspondiente
    handleOpenModal();
  };

  return (
    <div>
      {/* Botón para abrir el modal */}

      <a type="button" onClick={handleClick}>
        <i class="bi bi-arrow-bar-right"></i>
      </a>
      {/* Modal */}
      <Modal isOpen={modalVisible} toggle={handleCloseModal} size="xl">
        <ModalHeader toggle={handleCloseModal}>{!encabezado1? encabezado:encabezado1}</ModalHeader>
        <ModalBody>
          {/* Renderiza el componente correspondiente al formulario seleccionado dentro del modal */}
          {renderSelectedForm()}
        </ModalBody>
        <ModalFooter>
          {/* Puedes agregar botones de acción necesarios */}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Detalle;
