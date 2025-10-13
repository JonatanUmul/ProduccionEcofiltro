import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SuccessAlert = ({ respuesta }) => {
  const navigate=useNavigate()
  useEffect(() => {
    let timerInterval;

    Swal.fire({
      icon: "success",
      title: "Éxito",
      html: `
        ${respuesta || "Aplicando cambios, espera..."}<br>
        <small>Se cerrará en <b></b> ms</small>
      `,
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          if (timer) timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log(" Alerta cerrada automáticamente");
      }
    });
  }, [respuesta]);
  navigate("/Home/TablaOT");
};

export default SuccessAlert;
