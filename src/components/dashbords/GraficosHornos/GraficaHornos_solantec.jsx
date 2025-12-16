import { Line } from '@ant-design/plots';
import { Card } from 'antd';

const GraficaPromedio = ({ data }) => {
  if (!data || data.length === 0) return null;

const config = {
  data,
  xField: 'time',
  yField: 'temperatura',
  smooth: true,
  height: 300,
  xAxis: {
    type: 'time',
    label: {
      formatter: (value) =>
        new Date(Number(value)).toLocaleTimeString('es-GT', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
    },
  },
  yAxis: {
    title: { text: 'Temperatura (°C)' },
  },
};


  return (
    <Card title="Temperatura Promedio del Horno">
      <Line {...config} />
    </Card>
  );
};

export default GraficaPromedio;
