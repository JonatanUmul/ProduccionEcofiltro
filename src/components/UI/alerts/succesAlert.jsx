import Swal from 'sweetalert2';

const SuccessAlert = ({respuesta}) => {
  const message = 'Guardado correctamente'
  const respuestas=respuesta
  return Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: !respuestas ? message:respuestas,
    timer: 4000,
    showConfirmButton: false,
  });
};

export default SuccessAlert;
