import Swal from 'sweetalert2';

const ErrorAlert = ({message = 'Ocurrió un error inesperado', err}) => {
  return Swal.fire({
    icon: 'error',
    title: '¡Error!',
    text: err?err: message,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
  });
};

export default ErrorAlert;
