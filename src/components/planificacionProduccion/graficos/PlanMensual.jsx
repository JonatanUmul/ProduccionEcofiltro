import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { MdMargin } from 'react-icons/md';
import { TbBoxMargin } from 'react-icons/tb';
import { BiAlignJustify } from 'react-icons/bi';

const PorcentajeEficienciaMensual = ({ planCumplido, isDarkMode }) => {
  const chartRef = useRef(null);
  console.log('Datos en gráfico mensual', planCumplido);
console.log('dark:',isDarkMode)



  console.log('isDarkMode',isDarkMode)
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

    // Extraer los nombres de los procesos y sus cantidades
    const nombresProcesos = Object.keys(procesos);
    const planificado = nombresProcesos.map(proceso => procesos[proceso].planificado);
    const producido = nombresProcesos.map(proceso => procesos[proceso].producido || 0); // Usar 0 si no hay producción

    // Definición de las series de datos usando el nuevo formato
    const series = [
      {
        name: 'Planificado',
        type: 'bar',
        data: planificado,
        itemStyle: {
          color:  '#1f77b4', // Color para lo planificado

        },
        label: {
          show: true,
          position: 'right', // Colocar las etiquetas dentro de las barras
          formatter: '{c}', // Formato de las etiquetas (solo el valor)
          color:'#ffffff', // Color de las etiquetas
          fontSize:'10px'
        },
        
      },
      
      {
        name: 'Producido',
        type: 'bar',
        data: producido,
        itemStyle: {
          color: '#2ca02c', // Cambiar a color rojo para lo producido
          barGap: '20%',
        },
        label: {
          show: true,
          position: 'right', // Colocar las etiquetas dentro de las barras
          formatter: '{c}', // Formato de las etiquetas (solo el valor)
          color: '#ffffff', // Color de las etiquetas
          fontSize:'9px',

                    
        },
      },
    ];

    // Configuración del gráfico
    const option = {
      title: {
        // text: 'Planificación Mensual', // Título del gráfico
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Planificado', 'Producido'],
        orient: 'horizontal',
        top: 'top',
        textStyle: {
          fontSize: 14, // Tamaño de letra de la leyenda
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: {
          fontSize: 12, // Ajustar el tamaño de la fuente
        },
      },
      yAxis: {
        type: 'category',
        data: nombresProcesos, // Usar los nombres de los procesos
        axisLabel: {
          rotate:0, // Rotar las etiquetas para mejorar la legibilidad
          fontSize: 12, // Ajustar el tamaño de la fuente
        },
      },
      series: series,
    };

    // Establecer las opciones del gráfico
    myChart.setOption(option);

    // Limpiar el gráfico cuando el componente se desmonte
    return () => {
      myChart.dispose();
    };
  }, [planCumplido]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }} // Ajustar para ocupar todo el contenedor
    />
  );
};

export default PorcentajeEficienciaMensual;