import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { formatFecha } from '../../utilidades/FormatearFecta.js';

const URL = process.env.REACT_APP_URL;

const Horno4 = () => {
  const [datos, setDatos] = useState([]);
  const [fecha_creacion_inicio, setFechaCreacionInicio] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFechaCreacionFin] = useState(formatFecha(new Date()));
  const [modeloUF, setModeloUF] = useState(1);
  const [turn, setTurn] = useState(1);
  const [HornoSelect, setTHornos] = useState([]);
  const [horno, setHornoSelect] = useState(4);
  const [error, setError] = useState('');
  console.log('Horno4:',datos);

  useEffect(() => {
    const url = `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${modeloUF || 'null'}/${turn || 'null'}/${horno || 'null'}`;

    axios.get(url)
      .then((response) => {
        // Ordenar los datos por hora
        const datosOrdenados = response.data.data.sort((a, b) => new Date(a.tiempo_transcurrido) - new Date(b.tiempo_transcurrido));
        setDatos(datosOrdenados);
        console.log('datos consulta', datosOrdenados);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [modeloUF, turn, fecha_creacion_inicio, fecha_creacion_fin, horno ]);


  useEffect(() => {
    if (datos.length === 0) return;

    const chartDom = document.getElementById('chart2');
    const myChart = echarts.init(chartDom);

    const category = [];
    const barData = [];
    const lineData = [];

    datos.forEach((dato) => {
      const date = new Date(dato.fecha_real);
      category.push([date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'));
      const b = parseFloat(dato.promedio);
      barData.push(b);
      lineData.push(dato.promedio);
    });

    const option = {
      backgroundColor: '#0f375f',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['line', 'bar'],
        textStyle: {
          color: '#ccc'
        }
      },
      xAxis: {
        data: category,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      series: [
        {
          name: 'line',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: lineData,
          label: {
            show: true,
            position: 'top',
            formatter: '{@[0]}'
          }
        },
        {
          name: 'bar',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#14c8d4' },
              { offset: 1, color: '#43eec6' }
            ])
          },
          data: barData
        }
      ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', myChart.resize);

    return () => {
      window.removeEventListener('resize', myChart.resize);
      myChart.dispose();
    };
  }, [datos]);

  return (
    <div>
      h4
      <div id="chart2" style={{ width: '100%', height: 400 }}></div>
    </div>
  );
};

export default Horno4;
