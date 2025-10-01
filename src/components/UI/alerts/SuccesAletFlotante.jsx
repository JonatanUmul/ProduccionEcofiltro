import Swal from 'sweetalert2';

const SuccessAlertFlotante = (mensaje) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: mensaje,
    showConfirmButton: false,
    timer: 2000,
  });
};

export default SuccessAlertFlotante;
