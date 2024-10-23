import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { MdPadding } from 'react-icons/md';
const PorcentajeEficienciaMensual = ({ planCumplido, isDarkMode }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current, 'dark' );

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
        
        itemStyle: {
          color: '#5470C6',
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}',
          color: '#ffffff',
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
          color: '#ffffff',
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
        },
      },
      xAxis: {
        type: 'category',
        data: nombresProcesos,
        axisLabel: {
          rotate: 22,
          fontSize: 9,
          

        },
      },
      yAxis: {
        type: 'value',
        
        axisLabel: {
          fontSize: 9,
          
        },
      },
      grid: {
        top: '10%',
        bottom: '15%',
        left: '10%',
        right: '10%',
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