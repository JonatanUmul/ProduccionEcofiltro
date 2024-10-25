import React, { useEffect, useState } from 'react';
import { Card, Button, DatePicker } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import AsignarIssue from './AsignarIssue';
import GraficoIssue from './GraficoIssue';
import ConsultarIsuues from './ConsultarIsuues.jsx';
import './Css.css';

const { Meta } = Card;

const App = () => {
  const URL = process.env.REACT_APP_URL;
  const [planMesData, setPlanMesData] = useState([]);
  const [planCumplido, setPlanCumplido] = useState([]);
  const [hoy, setHoy] = useState(dayjs().subtract(1, 'day').format('YYYY-MM-DD'));
  const [fechaInicial, setFechaInicial] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [fechaFin, setFechaFin] = useState(dayjs().endOf('month').format('YYYY-MM-DD'));
  const [diferenciasAPi, setDiferencias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planCumplidoResponse, planMesResponse] = await Promise.all([
          axios.get(`${URL}/PlanCumplido/${hoy}`),
          axios.get(`${URL}/PlanCumplido/${fechaInicial}/${fechaFin}`)
        ]);
        setPlanCumplido(planCumplidoResponse.data.rows);
        setPlanMesData(planMesResponse.data.rows);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [URL, hoy, fechaInicial, fechaFin]);

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
    <>
      <div className="col">
        {/* <DatePicker
          onChange={handleDateChange}
          style={{ marginBottom: '20px', width: '100%' }}
          defaultValue={dayjs().subtract(1, 'day')}
          getPopupContainer={trigger => trigger.parentNode}
        /> */}
        <div className="row p-3">
          {diferenciasAPi.map((Issue, index) => (
            <div className="col-md-4 col-sm-6 col-xl-2 mb-4" key={index}>
              <div style={{ position: 'relative', width: '100%' }}>
                <ConsultarIsuues Issue={Issue} />
                <Card
                  hoverable
                  className={Issue.id_planDiario > 0 ? null : 'card pulse'}
                  style={{
                    fontSize:'9px',
                    borderRadius: '10px',
                    boxShadow: Issue.id_planDiario > 0 ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(250, 128, 114)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  cover={<GraficoIssue Issue={Issue} />}
                >
                  <Meta
                    title={Issue.procesosBuscar}
                    style={{ marginBottom: '5px' }}
                    description={
                      <>
                        <div>Encargado: {Issue.Nombre}</div>
                        <div>Planificado: {Issue.cantidad_planificada}</div>
                        <div>Producido: {Issue.producido}</div>
                        <div style={{ color: 'red' }}>Diferencia: {Issue.residuo}</div>
                      </>
                    }
                  />
                  <AsignarIssue Issuees={Issue} />
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
