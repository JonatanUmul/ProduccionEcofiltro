import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { Bar3DChart } from 'echarts-gl/charts';
import { Grid3DComponent } from 'echarts-gl/components';
import { VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import axios from 'axios';
import { formatFecha } from '../../components/utilidades/FormatearFecta';

const URL = process.env.REACT_APP_URL;

echarts.use([Bar3DChart, Grid3DComponent, VisualMapComponent, CanvasRenderer]);

const hornosIds = [1, 2, 3, 22];

const Bar3DChartComponent = () => {
  const [chartsRefs, setChartsRefs] = useState(hornosIds.map(() => React.createRef()));
  const [datos, setDatos] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
  const [hora]=useState(new Date().getHours())
  const [turno, setTurno] = useState([]);
  const [turn, setTurn] = useState();
 const minutos=[1,5,10,15,20,25,30,35,40,45,50,55,60];
const [tiempo, setMin]=useState(40);
const [label, setLabel]=useState(false);
 console.log('Turno',turn)

 useEffect(() => {
  // Función para actualizar el turno según la hora actual
  const actualizarTurno = () => {
    const horaActual = new Date().getHours();
    if (horaActual >= 18 && horaActual <= 23) {
      setTurn(2); // Turno nocturno
    } else if (horaActual >= 0 && horaActual <= 6) {
      setTurn(2); // Turno nocturno
    } else {
      setTurn(1); // Turno diurno
    }
  };

  // Ejecutar la función inmediatamente al montar el componente
  actualizarTurno();

  // Configurar un intervalo para actualizar el turno cada minuto
  const intervalId = setInterval(actualizarTurno, 60 * 1000);

  // Limpiar el intervalo al desmontar el componente
  return () => clearInterval(intervalId);
}, []);


  const Etiquets=()=>(
    setLabel(true)
  )


  // console.log(hora.getHours(), turn)
  
  // Fetch turnos on initial mount
  useEffect(() => {
    axios
      .get(`${URL}/Turnos`) 
      .then((response) => {
        setTurno(response.data.rows);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  // Fetch data for all hornos
  const fetchData = async () => {


    try {
      setIsLoading(true);

      const requests = hornosIds.map((horno) =>
        axios.get(
          `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${'null'}/${turn || 'null'}/${horno|| 'null'}/${tiempo|| 'null'}`
        )
      );

      const responses = await Promise.all(requests);
      const dataByHorno = hornosIds.reduce((acc, horno, idx) => {
        const responseData = responses[idx].data.data.sort(
          (a, b) => new Date(a.fecha_real) - new Date(b.fecha_real)
        );
        acc[horno] = responseData;
        return acc;
      }, {});

      setDatos(dataByHorno);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setError('No se pudo obtener los datos. Por favor, verifica la conexión o los parámetros.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [fecha_creacion_inicio, fecha_creacion_fin, turn, tiempo]);

  // Render charts when data updates
  useEffect(() => {
    hornosIds.forEach((horno, index) => {
      const chartData = datos[horno]?.flatMap((dato, idx) =>
        Object.keys(dato)
          .filter((key) => key.startsWith('t'))
          .map((etiqueta, etIdx) => {
            const valor = dato[etiqueta];
            return valor != null && !isNaN(valor) ? [idx, etIdx, valor] : null;
          })
          .filter(Boolean)
      );

      if (!chartData || !chartData.length) return;

      const maxValue = Math.max(...chartData.map((item) => item[2]));
      const horas = datos[horno]?.map((item) => item.hora_creacion);
    //   const etiquetas = Object.keys(datos[horno][0] || {}).filter((key) => key.startsWith('t'));
    const etiquetas = ['t1','t2','t3','t4','t5','t6','t7','t8','t9','t10','t11','t12'];

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: (params) =>
            `Etiqueta: ${etiquetas[params.data.value[1]]}<br>Hora: ${horas[params.data.value[0]]}<br>Valor: ${params.data.value[2]}`
        },
        visualMap: {
          max: maxValue,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026'
            ]
          }
        },
        xAxis3D: { type: 'category', data: horas, name: 'Horas' },
        yAxis3D: { type: 'category', data: etiquetas, name: 'Etiquetas' },
        zAxis3D: { type: 'value', name: 'Valor' },
        grid3D: {
          boxWidth: 100,
          boxDepth: 80,
          viewControl: {
            autoRotate: true,
            autoRotateSpeed: 10
          },
          light: {
            main: { intensity: 1.2 },
            ambient: { intensity: 0.3 }
          }
        },
        series: [
          {
            type: 'bar3D',
            data: chartData.map((item) => ({ value: item })),
            shading: 'color',
            label: { show: label },
            itemStyle: { opacity: 0.8 }
          }
        ]
      };

      const chart = echarts.init(chartsRefs[index].current);
      chart.setOption(option);
    });
  }, [datos]);

  
 
//   if (isLoading) return <div>Cargando datos...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <>
    <div className="row mb-3">
  
  <div className="col-md-3">
    <label htmlFor="fecha1" className="form-label">Fecha Inicio</label>
    <input
      className="form-control form-control-sm"
      type="date"
      value={fecha_creacion_inicio}
      onChange={(e) => setFecha(e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <label htmlFor="fecha2" className="form-label">Fecha Fin</label>
    <input
      className="form-control form-control-sm"
      type="date"
      value={fecha_creacion_fin}
      onChange={(e) => setFecha2(e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <label htmlFor="minutos" className="form-label">Turno</label>
    <select
      className="form-select form-select-sm"
      // value={turn}
      onChange={(e) => setTurn(e.target.value)}>
      <option value="">--</option>
      {Array.isArray(turno)&&turno.map((t) => (
        <option value={t.id}>
          {t.turno}
        </option>
      ))}
    </select>
  </div>
  <div className="col-md-3">
    <label htmlFor="minutos" className="form-label">Minutos</label>
    <select
      className="form-select form-select-sm"
      value={tiempo}
      onChange={(e) => setMin(e.target.value)}>
      <option value="">--</option>
      {minutos.map((t) => (
        <option value={t}>
          {t}
        </option>
      ))}
    </select>
  </div>
  <div style={{display:'flex'}} className="col-md-1">
  <div className="form-check">
    <input
      className="form-check-input"
      type="checkbox"
      defaultValue=""
      id="flexCheckDefault"
      onClick={Etiquets}
    />
    <label className="form-check-label" htmlFor="flexCheckDefault">
    Etiquetas
    </label>
  </div>
</div>
</div>

      <div className="row">
        {hornosIds.map((horno, index) => (
          <div className="col-md-6" key={horno}>
            <h5>Horno {horno}</h5>
            <div ref={chartsRefs[index]} style={{ width: '100%', height: '500px' }} />
          </div>
        ))}
      </div>
      
    </>
  );
};

export default Bar3DChartComponent;
