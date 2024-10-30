import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { MdPadding } from 'react-icons/md';
const PorcentajeEficienciaMensual = ({ planCumplido, isDarkMode }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current, );

    // Agrupar los datos por proceso
    const procesos = {};

    planCumplido.forEach((item) => {
      const proceso = item.procesosBuscar;

      if (!procesos[proceso]) {
        procesos[proceso] = { planificado: 0, producido: 0 };
      }

      procesos[proceso].planificado += parseFloat(item.cantidad_planificada);
      if (item.producido !== null) {
        procesos[proceso].producido += parseFloat(item.producido);
      }
    });

    const nombresProcesos = Object.keys(procesos);
    const planificado = nombresProcesos.map(proceso => procesos[proceso].planificado);
    const producido = nombresProcesos.map(proceso => procesos[proceso].producido || 0);

    const series = [
      {
        data: planificado,
        type: 'bar',
        name: 'Planificado',
        color: isDarkMode ? '#FFFFFF' : '#000000',
        itemStyle: {
          color: '#5470C6',
        },
        label: {
          show: true,
          color: isDarkMode ? '#FFFFFF' : '#000000',
          position: 'top',
          formatter: '{c}',

        },
      },
      {
        data: producido,
        type: 'bar',
        name: 'Producido',
        itemStyle: {
          color: '#91CC75',
        },
        
        label: {
          show: true,
          position: 'top',
          formatter: '{c}',
          color: isDarkMode ? '#FFFFFF' : '#000000',
        },
      },
    ];

    const option = {
      legend: {
        data: ['Planificado', 'Producido'],
        orient: 'horizontal',
        top: 'top',
        textStyle: {
          fontSize: 12,
          color: isDarkMode ? '#FFFFFF' : '#000000',
        },
      },
      xAxis: {
        type: 'category',
        data: nombresProcesos,

        axisLabel: {
          rotate: 15,
          fontSize: 10,
          color: isDarkMode ? '#FFFFFF' : '#000000',
          

        },
      },
      yAxis: {
        type: 'value',
        
        axisLabel: {
          fontSize: 9,
          color: isDarkMode ? '#FFFFFF' : '#000000',
        },
        axisLine: {
          lineStyle: {
            color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)', // Cambia el color y opacidad de la línea del eje X
            width: 1, // Grosor de la línea
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', // Cambia el color y opacidad de las líneas de separación
            width: 0.5, // Grosor de las líneas de separación
          }},
      },
      grid: {
        top: '10%',
        bottom: '20%',
        left: '5%',
        right: '1%',
      },
      series: series,
      tooltip: {
        trigger: 'axis',
        
        axisPointer: {
          type: 'shadow',
          type: 'shadow',
        },
      },
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [planCumplido]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '300px' }} // Ajusta la altura aquí
    />
  );
};

export default PorcentajeEficienciaMensual;