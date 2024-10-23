import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import { formatFecha } from "../../utilidades/FormatearFecta";
import { Skeleton, Space } from 'antd';

const URL = process.env.REACT_APP_URL;
const url='localhost100'
const DTHP = ({ encabezado, EncName, fecha_creacion, id, codInicio, codFin, horneado }) => {
  const { handleSubmit, register, watch } = useForm();
  const [operario, setOperario] = useState([]);
  const [modelo, setModelo] = useState([]);
  const [turno, setTurno] = useState([]);
  const [hornos, setTHornos] = useState([]);
  const [id_creador, setid_creador] = useState('');
  const [loading, setLoading] = useState(false);
  const [suma, setSuma] = useState(0);
  const [error, setError]=useState('')
  const id_area = 4;
  const id_area2 = 9;
  const maquinaria = "Horno";

  useEffect(() => {
    setid_creador(localStorage.getItem('id_creador'));

    const fetchData = async () => {
      try {
        const [OperariosResponse, ufModeloResponse, HornosResponse, turnoResponse] = await Promise.all([
          axios.get(`${URL}/Operarios/${id_area}/${id_area2}`),
          axios.get(`${URL}/ModelosUF`),
          axios.get(`${URL}/maquinaria/${maquinaria}`),
          axios.get(`${URL}/Turnos`),
        ]);

        setOperario(OperariosResponse.data);
        setModelo(ufModeloResponse.data);
        setTHornos(HornosResponse.data);
        setTurno(turnoResponse.data);
      } catch (error) {
        console.log("Error al obtener los datos:", error);
        setError(error)
      }
    };

    fetchData();
  }, []);

  const showSkeleton = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  // Aquí capturamos los campos que queremos sumar
  const formValues = watch([
    "aprobados", "altos", "bajos", "mermas_hornos", 
    "rajadosCC", "crudoCC", "quemados", "ahumados"
  ]);

  // Recalcula la suma cada vez que cambien los valores de los campos
  useEffect(() => {
    const sumaCampos = formValues.reduce((acc, value) => acc + (parseInt(value) || 0), 0);
    setSuma(sumaCampos);
  }, [formValues]);

  const onSubmit = async (formData) => {
    // Validación para verificar que la suma de los campos es igual a 'horneado'
    if (suma !== horneado) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La suma de los campos no puede ser menor ni mayor que lo Horneado, verifica tus datos',
      });
      return; // Detiene el envío del formulario si la condición no se cumple
    }
    // DTCC
    try {
      await axios.post(`${URL}/DTCC`, {
        id_dthh: id.toString(),
        fecha_real: fecha_creacion,
        horneado: horneado,
        codigoInicio: formData.codigoInicio,
        codigoFin: formData.codigoFin,
        id_operarioCC: formData.id_operarioCC,
        id_auditor: formData.id_auditor,
        modelo: formData.modelo,
        id_horno: formData.id_horno,
        turnoCC: formData.turnoCC,
        fechaHorneado: formData.fechaHorneado,
        turnoHorneado: formData.turnoHorneado,
        aprobados: formData.aprobados,
        altos: formData.altos,
        bajos: formData.bajos,
        mermas_hornos: formData.mermas_hornos,
        rajadosCC: formData.rajadosCC,
        crudoCC: formData.crudoCC,
        quemados: formData.quemados,
        ahumados: formData.ahumados,
        id_creador: id_creador
      });

      Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(() => {
        setLoading(false);
        window.location.href = "/Home/TablaOT";
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error("Error al enviar los datos:", error);
      setError(error)
    }

    showSkeleton();
  };

  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Control de Calidad</h4>
      <div className="card">
        <div className="card-body">
          <label htmlFor="materiaPrima" className="form-label">
            Codigo Inicio
          </label>
          <p id="materiaPrima" className="form-control-static">{codInicio} - {codFin}</p>
          <label htmlFor="fecha" className="form-label">
            Fecha De Horneado
          </label>
          <p id="fecha" className="form-control-static">{formatFecha(fecha_creacion)}</p>
          <label htmlFor="fecha" className="form-label">
          Horneado
        </label>
        <p id="fecha" className="form-control-static">{horneado}</p>
        <label htmlFor="fecha" className="form-label">
          Suma datos ingresados
        </label>

        <p id="fecha" className="form-control-static">{suma}</p>
        </div>
        
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">
        {loading ? (
          <Space
            direction="vertical"
            style={{ width: '100%' }}
            size={16}
          >
          <img 
  src="/images/laptop.gif" 
  alt="Logo" 
  style={{
    width: '300px', 
    display: 'block', 
    margin: '0 auto', 
    filter: 'brightness(1.2) contrast(1.2)'  // Ajusta el brillo y contraste
  }} 
/>

        
          </Space>
        ) : (
          <>
            <div className="col-md-6">
              <label htmlFor="aserradero" className="form-label">Responsable de CC</label>
              <select className="form-select" id="id_operarioCC" {...register("id_operarioCC")} required>
                <option value="" disabled selected>Seleccione...</option>
                {operario.rows && Array.isArray(operario.rows) && operario.rows.filter(operario => operario.id_area === 4).map((operario) => (
                  <option key={operario.id} value={operario.id}>{operario.Nombre}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="aserradero" className="form-label">Auditor de Procesos</label>
              <select className="form-select" id="id_auditor" {...register("id_auditor")} required>
                <option value="" disabled selected>Seleccione...</option>
                {operario.rows && Array.isArray(operario.rows) && operario.rows.filter(operario => operario.id_area === 9).map((operario) => (
                  <option key={operario.id} value={operario.id}>{operario.Nombre}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="aserradero" className="form-label">Turno de CC</label>
              <select className="form-select" id="turnoCC" {...register("turnoCC")} required>
                <option value="" disabled selected>Seleccione...</option>
                {Array.isArray(turno.rows) && turno.rows.length > 0 && turno.rows.map((turno) => (
                  <option key={turno.id} value={turno.id}>{turno.turno}</option>
                ))}
              </select>
            </div>
                 
            <div className="col-md-6">
              <label htmlFor="esquinaSI" className="form-label">Aprobados</label>
              <input type="number" className="form-control" id="aprobados" {...register("aprobados")} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="esquinaSD" className="form-label">Altos</label>
              <input type="number" className="form-control" id="altos" {...register("altos")} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="centro" className="form-label">Bajos</label>
              <input type="number" className="form-control" id="bajos" {...register("bajos")} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="mermasHornos" className="form-label">Mermas de hornos</label>
              <input type="number" className="form-control" id="mermas_hornos" {...register("mermas_hornos")} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="esquinaII" className="form-label">Rajados de C.c</label>
              <input type="number" className="form-control" id="rajadosCC" {...register("rajadosCC")} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="esquinaID" className="form-label">Crudos de C.c</label>
              <input type="number" className="form-control" id="crudoCC" {...register("crudoCC")} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="quemados" className="form-label">Quemados</label>
              <input type="number" className="form-control" id="quemados" {...register("quemados")} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="ahumados" className="form-label">Ahumados</label>
              <input type="number" className="form-control" id="ahumados" {...register("ahumados")} required />
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default DTHP;
