import React, { useEffect, useState } from 'react';
import { Card, DatePicker } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import GraficoIssue from './GraficoIssue.jsx';
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

  useEffect(() => {
    fetchData(); // Llamada inicial

    const intervalId = setInterval(() => {
      fetchData(); // Actualización cada 5 minutos
    }, 5000);

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
    <>
      <div className="col">
        <div className='row'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <DatePicker
              onChange={handleDateChange}
              style={{ marginBottom: '20px', width: '10%' }}
              defaultValue={dayjs().subtract(1, 'day')}
              getPopupContainer={trigger => trigger.parentNode}
              disabledDate={(date) => date && date > dayjs().endOf('day')}
            />
          </div>
          <div className="row p-3" style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            {diferenciasAPi.length === 0 ? (
              <h1 style={{ color: 'white', justifyContent: 'center' }}>Sin Issues</h1>
            ) : (
              diferenciasAPi.map((Issue, index) => (
                <div className="col-md-4 col-sm-6 col-xl-2 mb-4" key={index}>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <Card
                      hoverable
                      className={Issue.id_planDiario > 0 ? null : 'card pulse'}
                      style={{
                        fontSize: '9px',
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
                        style={{ marginBottom: '8px' }}
                        description={
                          <div style={{ color: 'black', fontSize: '15px' }}>
                            <strong>Issues: </strong>{Issue.issue ? Issue.issue : 'Sin Issues'}
                          </div>
                        }
                      />
                    </Card>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
