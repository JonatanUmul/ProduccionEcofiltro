import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PorcentajeEficienciaMensual = ({ planCumplido, isDarkMode }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

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

    const data = Object.keys(procesos).map((proceso) => {
      const planificado = procesos[proceso].planificado;
      const producido = procesos[proceso].producido || 0;
      const eficiencia = planificado > 0 ? Math.round((producido / planificado) * 100) : 0;

      return { value: eficiencia, name: proceso };
    });

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%',
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
             const colors = [
  '#5470C6', // Azul 
  '#91CC75', // Verde
  '#EE6666', // Rojo
  '#FAC858', // Amarillo
  '#73C0DE', // Celeste
  '#3BA272', // Verde oscuro
  '#FC8452', // Naranja
  '#9A60B4', // Morado
  '#D14A61', // Rojo oscuro
  '#6E7074'  // Gris
];

              return colors[params.dataIndex % colors.length];
            },
          },
          label: {
            show: true,
            formatter: '{b}: {c}%',
            fontSize: 11,
            color:'#ffffff',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          data: data,
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [planCumplido]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }} // Ajustar a 100%
    />
  );
};

export default PorcentajeEficienciaMensual;
