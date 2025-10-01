import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import Input from "../../UI/NumberInput";
import Button from "../../UI/Button";
import GetDTP_MermasProduccion from "../../../services/GetDTP_MermasProduccion";
import {formatFecha} from "../../utilidades/FormatearFecta"
import ExcelMermasCrudas from "../../reporteS/ControlProcesos/Excel/ExcelMermasCrudas"
// import Update_SerieEcofiltroCrudos from "../../../services/Update_SerieEcofiltroCrudos"
import Table from "../../UI/Table";
import Selects from "../../UI/Select";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const URL = process.env.REACT_APP_URL;

const TablaMermasAprobados = () => {
  const datos = useLocation();
  const { handleSubmit, register, watch } = useForm();
  const [serie_buscar, setSerie_buscar] = useState("");
  const [seriesDeOrdenes, setSeriesDeOrdenes] = useState([]);
  const [estadosPorSerie, setEstadosPorSerie] = useState({});
  const datosOrden = datos.state?.fila;
  const [fecha_inicio, setFechaInicio]=useState()
  const [fecha_fin, setFechaFin]=useState()
  const [modelos, setModelos] = useState([]);
  const [error, setError] = useState("");
  const id_modelo=watch('id_ufmodelo')
  const id_proceso=id_modelo== 1? 4:6
  const [NuevoEstadoSerir, setnuevoEstadoSerir]=useState([])
  const navigate=useNavigate()

 console.log('seriesDeOrdenes',seriesDeOrdenes)
 const obtenerSeries = async () => {
  const response = await GetDTP_MermasProduccion({ id_modelo, id_proceso, fecha_inicio, fecha_fin });
  const series = response?.data;
console.log(series)

  setSeriesDeOrdenes(series);

  // Inicializar estados por serie con el estado real de la base de datos
  const inicial = {};
  series?.forEach((s) => {
    inicial[s.serie] = s.estado;
  });
  setEstadosPorSerie(inicial);
};


  useEffect(() => {
    obtenerSeries();
  }, [ id_modelo, id_proceso, fecha_inicio, fecha_fin ]);


  const Solicitudes = () => {
    Promise.all([
      axios.get(`${URL}/ModelosUF`)
    ])
      .then(
        ([
          ModelosufResponse,
        ]) => {
          setModelos(ModelosufResponse?.data);
        }
      )
      .catch((error) => {
        setError("Error al obtener los datos", error);
      });
  };

  useEffect(() => {
    Solicitudes();
  }, []);

  const encabezado = ["Fecha de Eliminación","Serie", "Estado"];

  const seriesFiltradas = serie_buscar
    ? seriesDeOrdenes.filter((p) =>
        p.serie.toLowerCase().includes(serie_buscar.toLowerCase())
      )
    : seriesDeOrdenes;

  const bodyRows = seriesFiltradas?.map((row) => [
    formatFecha(row.fecha_actualizacion),
    row.serie,
    row.estado,
    <Selects
    disabled
    key={row.serie}
    value={estadosPorSerie[row.serie] ?? row.estado ?? ""}
    // onChange={handleEstadoChange(row.serie, row.id_proceso)}
  >
    <option value="OK">OK</option>
    <option value="Rajado">Rajado</option>
    <option value="Ovalado">Ovalado</option>
    <option value="Bajo">Bajo</option>    
    <option value="Alto">Alto</option>      

  </Selects>
  
  ]);


  const volverAtras = () => {
    navigate('/Home/TablaReportesOT/ROTP');
  };



  return (
    <Formik
    initialValues={{ numeroDeSerie: "" }}
    onSubmit={(values) => {
      setSerie_buscar(values.numeroDeSerie);
    }}
  >
    <Form className="container-fluid p-3">
      {/* Header / acciones */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        {/* <Button onClick={volverAtras} className="btn btn-danger">
          Regresar
        </Button> */}
  
        <div className="d-flex align-items-center gap-2">
          <Input name="numeroDeSerie" placeholder="Buscar por serie" />
          <Button type="submit" className="btn btn-primary">Buscar</Button>
        </div>
      </div>
  
      {/* Filtros */}
      <div className="row g-3 mb-3">
        <div className="col-md-6 col-lg-4">
          <label htmlFor="id_ufmodelo" className="form-label">Modelo</label>
          <select
            className="form-select"
            id="id_ufmodelo"
            {...register("id_ufmodelo")}
            required
          >
            <option value="" disabled selected>
              Seleccione...
            </option>
            {Array.isArray(modelos.rows) &&
              modelos.rows.length > 0 &&
              modelos.rows.map((modelo) => (
                <option key={modelo.id_mod} value={modelo.id_mod}>
                  {modelo.nombre_modelo}
                </option>
              ))}
          </select>
        </div>
  
        <div className="col-md-6 col-lg-4">
          <label className="form-label">Fecha de inicio</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => {
              setFechaInicio(e.target.value);
            }}
          />
        </div>
  
        <div className="col-md-6 col-lg-4">
          <label className="form-label">Fecha fin</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => {
              setFechaFin(e.target.value);
            }}
          />
        </div>
      </div>
      <ExcelMermasCrudas dats={bodyRows}/>
      <hr className="my-3" />
  
      {/* Tabla */}
      <div className="card shadow-sm">
        <div className="card-body p-2">
          <Table encabezadosTab={encabezado} datosTab={bodyRows} />
        </div>
      </div>
    </Form>
  </Formik>
  
  );
};

export default TablaMermasAprobados;
