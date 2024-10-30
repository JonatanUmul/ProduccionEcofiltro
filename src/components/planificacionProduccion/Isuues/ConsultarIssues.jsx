import React, { useEffect, useState } from 'react';
import { DatePicker, Row, Col, Typography, Spin, Card } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import GraficoIssue from './GraficoIssue.jsx';
import './Css.css';

const { Title } = Typography;

const App = () => {
  const URL = process.env.REACT_APP_URL;
  const [planMesData, setPlanMesData] = useState([]);
  const [planCumplido, setPlanCumplido] = useState([]);
  const [hoy, setHoy] = useState(dayjs().subtract(1, 'day').format('YYYY-MM-DD'));
  const [fechaInicial, setFechaInicial] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [fechaFin, setFechaFin] = useState(dayjs().endOf('month').format('YYYY-MM-DD'));
  const [diferenciasAPi, setDiferencias] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const [planCumplidoResponse, planMesResponse] = await Promise.all([
        axios.get(`${URL}/PlanCumplido/${hoy}`),
        axios.get(`${URL}/PlanCumplido/${fechaInicial}/${fechaFin}`)
      ]);
      setPlanCumplido(planCumplidoResponse.data.rows);
      setPlanMesData(planMesResponse.data.rows);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchData(); // Llamada inicial

    const intervalId = setInterval(() => {
      fetchData(); // Actualización cada 5 minutos
    }, 300000); // Cambiado a 5 minutos

    return () => clearInterval(intervalId); // Limpieza del intervalo al desmontar
  }, [hoy, fechaInicial, fechaFin]); // Dependencias críticas para actualizar el intervalo correctamente

  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = date.subtract(1, 'day');
      setHoy(selectedDate.format('YYYY-MM-DD'));
      setFechaInicial(selectedDate.startOf('month').format('YYYY-MM-DD'));
      setFechaFin(selectedDate.endOf('month').format('YYYY-MM-DD'));
    }
  };

  useEffect(() => {
    setDiferencias(planCumplido.filter(plan => plan.residuo < 0));
  }, [planCumplido]);

  return (
    <div className="container" style={{border:'solid 1px black'}}>
      <div className="header" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Title level={2} style={{ color: '#fff', marginBottom: '20px' }}>Issues de Producción</Title>
        <DatePicker
          onChange={handleDateChange}
          style={{ marginBottom: '20px', width: '200px', borderRadius: '10px' }}
          defaultValue={dayjs().subtract(1, 'day')}
          getPopupContainer={trigger => trigger.parentNode}
          disabledDate={(date) => date && date > dayjs().endOf('day')}
        />
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {diferenciasAPi.length === 0 ? (
            <Col span={24}>
              <Title level={4} style={{ color: 'white', textAlign: 'center' }}>Sin Issues</Title>
            </Col>
          ) : (
            diferenciasAPi.map((Issue, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    background: '#f0f2f5',
                    height: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <GraficoIssue Issue={Issue} />
                  <div style={{ marginTop: '12px' }}>
                    <Title level={4} style={{ margin: '0', color: '#333' }}>{Issue.procesosBuscar}</Title>
                    <p style={{ margin: '0', color: '#666' }}>
                      <strong>Issues:</strong> {Issue.issue ? Issue.issue : 'Sin Issues'}
                    </p>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}
    </div>
  );
};

export default App;
