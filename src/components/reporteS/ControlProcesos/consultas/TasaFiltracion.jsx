import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './styles.css';

const TasasChart = ({ data }) => {
  const [error, setError] = useState('');
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    if (!chartDom) return; // Verifica si el elemento del DOM está disponible

    let myChart = echarts.init(chartDom);

    // Verifica si `data` es un array antes de procesarlo
    if (Array.isArray(data) && data.length > 0) {
      // Agrupar datos por tasa y contar las ocurrencias
      const groupedData = data.reduce((acc, item) => {
        const tasa = item.tasa || 'Unknown Tasa'; // Nombre del tasa o un valor por defecto

        // Inicializa los datos si no existen
        if (!acc[tasa]) {
          acc[tasa] = 0;
        }

        // Incrementa el contador para esta tasa
        acc[tasa] += 1;

        return acc;
      }, {});

      // Preparar datos para el gráfico
      const legendData = Object.keys(groupedData);
      const seriesData = [{
        name: 'Cantidad',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#14c8d4' },
            { offset: 1, color: '#43eec6' }
          ])
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}' // Muestra el valor en la etiqueta
        },
        data: legendData.map(tasa => groupedData[tasa])
      }];

      const option = {
        backgroundColor: '#0f375f',
        tooltip: {  
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        legend: {
          data: ['Cantidad'],
          textStyle: {
            color: '#ccc'
          }
        },
        xAxis: {
          data: legendData,
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
        series: seriesData,
        graphic: {
          type: 'text',
          left: 'center',
          top: '8%',
          style: {
            text: `Cantidad de Ocurrencias por Tasa`,
            font: '14px Microsoft YaHei',
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
    } else {
      // setError('Data is not an array or is empty.');
    }
  }, [data]);

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div id="chart" ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default TasasChart;
