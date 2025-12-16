import React, { useEffect, useState } from "react";
import { Table } from "antd";
import TempHornos_Solantec from "../../../services/Get_TempHornos_Solantec";
import Filtros from "./Filtros";
import CardsTemperatura from "./cardsInformativos/CardTemp_solantec";
import GraficaTemperaturas from "./GraficaHornos_solantec";
import { formatFecha } from "../../utilidades/FormatearFecta";
const App = () => {
    const [dat, setData]=useState([])
    console.log('data tdaa')
 const columns = [
  { title: "Horno", dataIndex: "horno" },
  { title: "Hora", dataIndex: "hora" },
  { title: "Promedio", dataIndex: "promedio" },
  { title: "T1", dataIndex: "t1" },
  { title: "T2", dataIndex: "t2" },
  { title: "T3", dataIndex: "t3" },
  { title: "T4", dataIndex: "t4" },
  { title: "T5", dataIndex: "t5" },
  { title: "T6", dataIndex: "t6" },
  { title: "T7", dataIndex: "t7" },
  { title: "T8", dataIndex: "t8" },
  { title: "T9", dataIndex: "t9" },
  { title: "T10", dataIndex: "t10" },
  { title: "T11", dataIndex: "t11" },
  { title: "T12", dataIndex: "t12" }
];
console.log(dat)
const dataSource = dat.map((a, index) => ({
  key: index,
  horno: a.horno,
  hora: a.hora_solantec,
  fecha:formatFecha(a.fecha_solantec),
  promedio:a.promedio,
  t1: a.t1,
  t2: a.t2,
  t3: a.t3,
  t4: a.t4,
  t5: a.t5,
  t6: a.t6,
  t7: a.t7,
  t8: a.t8,
  t9: a.t9,
  t10: a.t10,
  t11: a.t11,
  t12: a.t12,
}));

console.log('datos datos',dataSource)

   const [filtros, setFiltros] = useState({
        turn: 1,
        horno: 1,
        id_ufmodelo:1,
        fecha_creacion_inicio: formatFecha(new Date()),
        fecha_creacion_fin: formatFecha(new Date())
      });
    
      const handleFiltrosChange = (newFiltros) => {
        setFiltros(newFiltros);
      };
console.log(filtros)
  const Temp_Hornos_Solantec = async() => {

    const fecha_creacion_inicio = filtros.fecha_creacion_inicio;
    const fecha_creacion_fin = filtros.fecha_creacion_fin;
    const modeloUF = filtros.id_ufmodelo;
    const turn = filtros.turn;
    const horno = filtros.horno;
    const tiempo = null;
    const response =await TempHornos_Solantec({
      fecha_creacion_inicio,
      fecha_creacion_fin,
      modeloUF,
      turn,
      horno,
      tiempo,
    });
    setData(response)
    console.log("respuesta del servidor", response);
  };

  useEffect(() => {
    Temp_Hornos_Solantec();
  }, [filtros]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
const transformarPromedioParaGrafica = (data) => {
  return data
    .map(row => ({
      time: row.hora,              // "13:55"
      temperatura: Number(row.promedio),
    }))
    .filter(d => Number.isFinite(d.temperatura));
};




const dataGrafica = transformarPromedioParaGrafica(dataSource);

  return (
    <>
    <Filtros onChange={handleFiltrosChange} />
        <CardsTemperatura data={dat}/>
        <GraficaTemperaturas data={dataGrafica} />
      <Table scroll={{
    x: 1800,   // ← fuerza scroll horizontal
    y: 500
  }}columns={columns} dataSource={dataSource} onChange={onChange} />
    </>
  );
};
export default App;
