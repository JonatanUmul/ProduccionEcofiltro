import React, { useState } from 'react';
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import DTHP from '../detallado/DTHP';
import DTSASERRIN from '../detallado/DTSASERRIN';
import DTCMP1 from '../detallado/DTCA1';
import DTCA2 from '../detallado/DTCA2';
import DTPV from '../detallado/DTPV';
import DTFM from '../detallado/DTFM';
import DTP from '../detallado/DTP';
import LogoEco from '../../utilidades/LogoEco';
import DTIP from "../detallado/DTIP.1"
import DTCC from '../detallado/DTCC';
import { Navigate } from 'react-router-dom';

const CrearOT = ({
  encabezado,
  id,
  EncName,
  fecha_creacion,
  codInicio,
  codFin,
  horneado,
  hornero,
  ModeloEco,
  datosOrden,
  datosTab,
  TodasLasSeries,
  resultadosContador
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const renderSelectedForm = () => {
    switch (encabezado) {
      case 'othp':
        return <DTHP id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />;

      case 'otsa':
        return <DTSASERRIN id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />;

      case 'otca1':
        return <DTCMP1 id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />;

      case 'otca2':
        return <DTCA2 id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />;

      case 'otpv':
        return <DTPV id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />;

      case 'otfm':
        return <DTFM id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />;

      case 'otp':
        return <DTP id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />;

      // Estos casos navegan a rutas específicas:
      case 'othh':
        return <Navigate to="/Home/Order/dthh" replace state={{ id, encabezado, EncName, fecha_creacion }} />;

       //case 'otip':
      // return <DTIP id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
       case 'otip':
        return (
          <Navigate
            to="/Home/TablaOT/DTIP"
            replace
            state={{ id, encabezado, EncName, fecha_creacion }}
          />
        );

      case 'cthh':
        return (
          <DTCC
            id={id}
            encabezado={encabezado}
            codInicio={codInicio}
            codFin={codFin}
            fecha_creacion={fecha_creacion}
            horneado={horneado}
            hornero={hornero}
            ModeloEco={ModeloEco}
            datosOrden={datosOrden}
            datosTab={datosTab}
            TodasLasSeries={TodasLasSeries}
            resultadosContador={resultadosContador}
          />
        );

      default:
        return <p>Formulario no encontrado</p>;
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success btn-sm"
        style={{ width: '60px', fontSize: '0.8rem', justifyContent: 'center', alignItems: 'center' }}
        onClick={handleOpenModal}
      >
        OT
      </button>

      <Modal isOpen={modalVisible} toggle={handleCloseModal} backdrop="static">
        <ModalHeader toggle={handleCloseModal}>
          <LogoEco />
        </ModalHeader>
        <ModalBody>{renderSelectedForm()}</ModalBody>
        <ModalFooter>{/* Botones extra si los necesitas */}</ModalFooter>
      </Modal>
    </div>
  );
};

export default CrearOT;
