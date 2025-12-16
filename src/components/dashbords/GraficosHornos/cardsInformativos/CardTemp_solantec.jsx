import { Card, Row, Col, Statistic, Typography } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  FireOutlined,
  WarningOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const CardsTemperatura = ({ data, horno }) => {
  if (!data || data.length === 0) return null;

  const temperaturas = data.map(d => d.promedio);

  const max = Math.max(...temperaturas);
  const min = Math.min(...temperaturas);
 /* const avg = (
    temperaturas.reduce((a, b) => a + b, 0) / temperaturas.length
  ).toFixed(1);
console.log(avg)*/
  const fueraRango = data.filter(d => d.estado !== 'Normal').length;
  const ultimaLectura = data[0]?.hora_solantec || '--';

  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      {/* TEMPERATURA MÁXIMA */}
      <Col span={5}>
        <Card bordered={false} style={{ background: '#2b1d1d' }}>
          <Statistic
            title={<Text style={{ color: '#ff7875' }}>TEMPERATURA MÁXIMA</Text>}
            value={max}
            suffix="°C"
            valueStyle={{ color: '#ff4d4f', fontSize: 32 }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>

      {/* PROMEDIO */}
      {/*<Col span={5}>
        <Card bordered={false} style={{ background: '#1f2a23' }}>
          <Statistic
            title={<Text style={{ color: '#95de64' }}>TEMPERATURA PROMEDIO</Text>}
            value={avg}
            suffix="°C"
            valueStyle={{ color: '#b7eb8f', fontSize: 32 }}
          />
        </Card>
      </Col>*/}

      {/* MÍNIMA */}
      <Col span={5}>
        <Card bordered={false} style={{ background: '#1f2a23' }}>
          <Statistic
            title={<Text style={{ color: '#95de64' }}>TEMPERATURA MÍNIMA</Text>}
            value={min}
            suffix="°C"
            valueStyle={{ color: '#d9f7be', fontSize: 32 }}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </Col>

      {/* SENSORES FUERA DE RANGO */}
      {/*<Col span={4}>
        <Card bordered={false} style={{ background: '#2a2118', textAlign: 'center' }}>
          <Statistic
            title={<Text style={{ color: '#ffd666' }}>FUERA DE RANGO</Text>}
            value={fueraRango}
            valueStyle={{ color: '#faad14', fontSize: 36 }}
            prefix={<WarningOutlined />}
          />
        </Card>
      </Col>
*/}
      {/* HORNO */}
      <Col span={4}>
        <Card bordered={false} style={{ background: '#1c1c1c' }}>
            <Statistic
            title={<Text style={{ color: '#ffd666' }}>Última actualización</Text>}
          />
          <Text style={{ color: '#bfbfbf', fontSize: 18 }}>
            {ultimaLectura}
          </Text>
        </Card>
      </Col>
    </Row>
  );
};

export default CardsTemperatura;
