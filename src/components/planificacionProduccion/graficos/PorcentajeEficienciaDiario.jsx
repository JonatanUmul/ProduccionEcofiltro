import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PorcentajeEficienciaMensual = ({ planCumplido, isDarkMode }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current,);

    // Agrupar los datos por proceso y calcular la eficiencia
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

    // Calcular la eficiencia
    const data = Object.keys(procesos).map((proceso) => {
      const planificado = procesos[proceso].planificado;
      const producido = procesos[proceso].producido || 0; // Usar 0 si no hay producción
      const eficiencia = planificado > 0 ? Math.round((producido / planificado) * 100) : 0; // Redondear a entero

      return { value: eficiencia, name: proceso }; // Sin decimales
    });

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%', // Formato del tooltip
      },
      series: [
        {
          name: 'Eficiencia por Proceso',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            color: (params) => {
              const colors = ['#5470C6', '#91CC75', '#EE6666', '#FFA07A', '#FF69B4'];
              return colors[params.dataIndex % colors.length]; // Colores personalizados
            },
          },
          label: {
            show: true, // Mostrar etiquetas
            formatter: '{b}: {c}%', // Formato de las etiquetas
            fontSize: 14, // Aumentar el tamaño de las etiquetas
            color:'#ffffff', // Color de las etiquetas
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16, // Aumentar el tamaño de la etiqueta al enfatizar
              fontWeight: 'bold',
            },  
          },
          data: data, // Usar los datos calculados
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose(); // Limpiar el gráfico cuando el componente se desmonte
    };
  }, [planCumplido]); // Agregar planCumplido como dependencia

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '290px' }} // Ajusta la altura aquí
    />
  );
};

export default PorcentajeEficienciaMensual;
