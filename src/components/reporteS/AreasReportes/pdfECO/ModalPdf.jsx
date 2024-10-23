import React from 'react'

export const ModalPdf = () => {
  return (
    <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}  >
    {/* Solo mostrar el ModalHeader si hay un título */}
    {modalTitle && <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>}
    <ModalBody>
      {/* Renderiza el componente correspondiente al formulario seleccionado dentro del modal */}
      {renderSelectedForm()}
    </ModalBody>
    <ModalFooter>
      {/* Puedes agregar botones de acción necesarios */}
    </ModalFooter>
  </Modal>
  )
}
