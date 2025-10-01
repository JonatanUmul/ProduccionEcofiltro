import { Formik, Form, Field } from "formik";
import Selects from "../../UI/Select";
import { useState, useEffect } from "react";
import Homogenizacion from "../../../services/Update-Homogenizacion";
import SuccessAlert from "../../UI/alerts/succesAlert";
import ErrorAlert from "../../UI/alerts/ErrorAlert";
import Swal from "sweetalert2"; // 🔹 Agregado

const EstadoProc = ({ datosApi, id_creador, nameSelector, valueSelector, encabezado }) => {
  const [fase_aprobacion_mp, setFase_aprobacion_mp] = useState(0);
console.log('Datos para hommogenización',datosApi)
  const AHomogenizacion = async () => {
    try {
      const response = await Homogenizacion({
        fase_aprobacion_mp,
        datosApi,
        id_creador
      });
      const respuesta = response.data.message;
      SuccessAlert({ respuesta });
     {encabezado==='Barro'? window.location.href = "/Home/TablaLotesAprobados": window.location.href = "/Home/TablaPulverizado"} ;
    } catch (error) {
      ErrorAlert(error);
      console.error("Error:", error.mnsaje, error.error);
    }
  };

  useEffect(() => {
    if (fase_aprobacion_mp !== 0) AHomogenizacion();
  }, [fase_aprobacion_mp]);

  const [nombreUser, setNombreUser]=useState('')
    useEffect(() => {
      setNombreUser(localStorage.getItem('nombre')) 
    }, [])


  return (
    <Formik initialValues={{ option: "0" }} onSubmit={() => {}}>
      {({ setFieldValue }) => (
        <Form>
          <Field
            name="option"
            component={Selects}
            onChange={async (e) => {
              const valor = e.target.value;
              if (valor === "0") return;

              const result = await Swal.fire({
                title: `${nombreUser}, ¿quieres continuar con el envío del lote ${datosApi.codigo_lote} al siguiente paso?`,
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Sí, enviar",
                cancelButtonText: "Cancelar"
              });

              if (result.isConfirmed) {
                setFieldValue("option", valor);
                setFase_aprobacion_mp(valor);
              }
            }}
            className="form-control"
          >
            <option value="0">Seleccione un valor</option>
            <option value={valueSelector}>{nameSelector}</option>
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default EstadoProc;
