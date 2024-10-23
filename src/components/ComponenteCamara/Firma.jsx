import React, { useState, useRef } from 'react';
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import SignatureCanvas from 'react-signature-canvas';

const Firma = ({ handleFirma }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const sigCanvas = useRef(null);
  const [firma, setFirma] = useState(null);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleClick = () => {
    handleOpenModal();
  };

  const Guardar = () => {
    if (sigCanvas.current) {
      setFirma(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
      handleFirma(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
      setModalVisible(false);
    } else {
      console.error('La referencia sigCanvas.current no está definida correctamente.');
    }
  };

  return (
    <div>
    <div className='col-3 mb-5'>
      <button className='btn btn-primary ' type="button" onClick={handleClick}>
        Firmar
      </button>
      </div>
      <Modal className='container' isOpen={modalVisible} toggle={handleCloseModal} size="lg" backdrop="static">
        <ModalHeader toggle={handleCloseModal}></ModalHeader>
        <ModalBody>
          <div>
            <SignatureCanvas
              ref={sigCanvas}
              penColor='black'
              canvasProps={{ width: 450, height: 200, className: 'sigCanvas' }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
        <div className='col-3'>
          <button className='btn btn-primary' onClick={Guardar}>Guardar</button>
          </div>
          </ModalFooter>
      </Modal>
    </div>
  );
};

export default Firma;
