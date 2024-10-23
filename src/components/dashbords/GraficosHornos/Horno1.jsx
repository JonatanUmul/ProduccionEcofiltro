import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { formatFecha } from '../../utilidades/FormatearFecta.js';
import './styles.css';

const URL = process.env.REACT_APP_URL;

const HornosChart = ({ filtros1 }) => {
  const [datos, setDatos] = useState([]);
  // const [filtros, setFiltros] = useState({
  //   fecha_creacion_inicio: '',
  //   fecha_creacion_fin: '',
  //   turn: '',
  //   horno: '',
  // });
  const { fecha_creacion_inicio, fecha_creacion_fin, horno, turn, id_ufmodelo } = filtros1;
const turn0=turn;
  const modeloUF=id_ufmodelo

  const [error, setError] = useState('');
  const chartRef = useRef(null);


console.log('datos de turno',turn)
  const fetchData = async () => {
    try {

      const url = `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${modeloUF || 'null'}/${turn || 'null'}/${horno || 'null'}`;
      const response = await axios.get(url);
      const datosOrdenados = response.data.data.sort((a, b) => new Date(a.fecha_real) - new Date(b.fecha_real));
      setDatos(datosOrdenados);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setError('Error al obtener los datos');
    }
  };
  useEffect(() => {
  fetchData()
  }, [filtros1])

  useEffect(() => {
    const chartDom = chartRef.current;
    let myChart = echarts.init(chartDom);

    const category = [];
    const barData = [];
    const lineData = [];

    datos.forEach((dato) => {
      const date = dato.hora_creacion;
      category.push([date].join('-'));
      const b = parseFloat(dato.promedio);
      barData.push(b);
      lineData.push(dato.promedio);
    });

    const option = {
      backgroundColor: '#0f375f',
      label: 'Hornos',
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
      ],
      graphic: {
        type: 'text',
        left: 'center',
        top: '8%',
        style: {
          text: `Horno`,
          font: ' 14px Microsoft YaHei',
          fill: '#fff'
        }
      }
    };

    myChart.setOption(option);

    const resizeChart = () => {
      if (myChart) {
        myChart.resize();
      }
    };

    const debounce = (func, wait) => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
      };
    };

    const debouncedResizeChart = debounce(resizeChart, 200);

    window.addEventListener('resize', debouncedResizeChart, { passive: true });

    return () => {
      window.removeEventListener('resize', debouncedResizeChart);
      if (myChart) {
        myChart.dispose();
      }
    };
  }, [datos, horno]);

  return (
    <div>
      <div id="chart" ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default HornosChart;
