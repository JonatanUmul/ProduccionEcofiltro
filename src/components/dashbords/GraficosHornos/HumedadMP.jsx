import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import './styles.css';

const URL = process.env.REACT_APP_URL;

const TempTunel = ({ filtros1 }) => {
  const { fecha_creacion_inicio, fecha_creacion_fin, horno, turno } = filtros1;
  const [datos, setDatos] = useState([]);
  const chartRef = useRef(null);
  let myChart = useRef(null);
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const url = `${URL}/DTHP/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${'null'}/${ 'null'}/${ 'null'}`;

        // const url = `${URL}/DTT/${'null'}/${'null'}/${'null'}/${'null'}/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}`;
        const response = await axios.get(url);
        if (isMounted) {
          const datosOrdenados = response.data.sort((a, b) => new Date(a.fecha_real) - new Date(b.fecha_real));
          setDatos(datosOrdenados);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fecha_creacion_inicio, fecha_creacion_fin]);

  useEffect(() => {
    if (!chartRef.current) return;

    myChart.current = echarts.init(chartRef.current);

    const updateChart = () => {
      const category = [];
      const barData = [];
      const lineData = [];

      datos.forEach((dato) => {
        const date = dato.hora_creacion;
        category.push(date);
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
        ],
        graphic: {
          type: 'text',
          left: 'center',
          top: '8%',  // Adjusted to move the text away from the top border
          style: {
            text: `Humedad Patios`,
            font: '14px Microsoft YaHei',
            fill: '#fff',
          },
        },
      };

      myChart.current.setOption(option);

      
    };

    updateChart();

    const resizeChart = () => {
      if (myChart.current) {
        myChart.current.resize();
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
      if (myChart.current) {
        myChart.current.dispose();
      }
    };
  }, [datos]);

  return (
    <div>
   
    <div id="chart" ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
  </div>
  );
};

export default TempTunel;
