import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import Input from "../UI/NumberInput";
import Button from "../UI/Button";
import GetSeriesPorOrdenDeProduccion from "../../services/GetSeriesPorOrdenDeProduccion";
import Update_SerieEcofiltroCrudos from "../../services/Update_SerieEcofiltroCrudos"
import Table from "../UI/Table";
import Selects from "../UI/Select";
import { useNavigate } from "react-router-dom";
import ExcelCodigosProduccion from "../reporteS/ControlProcesos/Excel/ExcelCodigosProduccion"

const TablaMermasCrudos = () => {
  const datos = useLocation();
  const [serie_buscar, setSerie_buscar] = useState("");
  const [seriesDeOrdenes, setSeriesDeOrdenes] = useState([]);
  const [estadosPorSerie, setEstadosPorSerie] = useState({});
  const datosOrden = datos.state?.fila;
  const reporte = datos.state?.reporte;
  console.log(reporte)
  const id_dtp = datosOrden.id;
  const id_proceso=4
  const [NuevoEstadoSerir, setnuevoEstadoSerir]=useState([])
  const navigate=useNavigate()

 console.log(seriesDeOrdenes)
 const obtenerSeries = async () => {
  const response = await GetSeriesPorOrdenDeProduccion({ id_dtp, id_proceso });
  const series = response.data.response;

  setSeriesDeOrdenes(series);

  // Inicializar estados por serie con el estado real de la base de datos
  const inicial = {};
  series.forEach((s) => {
    inicial[s.serie] = s.estado; // <-- importante
  });
  setEstadosPorSerie(inicial);
};


  useEffect(() => {
    obtenerSeries();
  }, []);


  const ActualizarEstadoSerir=async()=>{
    const response=await Update_SerieEcofiltroCrudos({NuevoEstadoSerir})
    console.log(response)
  }

  const handleEstadoChange = (serie, id_proceso) => (e) => {
    console.log(serie)
    setEstadosPorSerie((prev) => ({
      ...prev,
      [serie]: e.target.value,
      
    }));
    
    setnuevoEstadoSerir([serie,id_proceso, e.target.value])
    
  };

  useEffect(()=>{
    ActualizarEstadoSerir()
  },[NuevoEstadoSerir])


  const encabezado = ["Serie", "Estado"];

  const seriesFiltradas = serie_buscar
    ? seriesDeOrdenes.filter((p) =>
        p.serie.toLowerCase().includes(serie_buscar.toLowerCase())
      )
    : seriesDeOrdenes;

  const bodyRows = seriesFiltradas.map((row) => [
    row.serie,
    <Selects
    disabled = {reporte ? true:false}
    key={row.serie}
    value={estadosPorSerie[row.serie] ?? row.estado ?? ""}
    onChange={handleEstadoChange(row.serie, row.id_proceso)}
  >
    <option value="OK">OK</option>
    <option value="Rajado">Rajado</option>
    <option value="Desportillado">Desportillado</option>
    <option value="Desperfecto de producción">Desperfecto de producción</option>          
    <option value="Ovalado">Ovalado</option>          

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
      <Form>
      {/* <Button onClick={volverAtras} className="btn btn-danger">
        Regresar
      </Button> */}
      {/* <ExcelRotpv datos={datos}/> */}
   
        <Input name="numeroDeSerie" placeholder="Buscar por serie" />
        <Button type="submit">Buscar</Button>
        <ExcelCodigosProduccion dats={seriesDeOrdenes}/>
        <Table encabezadosTab={encabezado} datosTab={bodyRows} />
      </Form>
    </Formik>
  );
};

export default TablaMermasCrudos;
