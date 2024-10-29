import React, { useState, useEffect } from 'react';
import { DatePicker, Switch } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import PlanMensual from './graficos/PlanMensual';
import PorcentajeEficienciaMensual from './graficos/PorcentajeEficienciaMensual.jsx';
import PlanDiario from './graficos/PlanDiario.jsx';
import PorcentajeEficienciaDiario from './graficos/PorcentajeEficienciaDiario.jsx';
import ResponsablesArea from './graficos/ResponsablesArea.jsx';
import LogoEco from '../utilidades/LogoEco';
import { formatFecha } from "../utilidades/FormatearFecta.js";
const App = () => {
  const URL = process.env.REACT_APP_URL;
  const [planMesData, setPlanMesData] = useState([]);
  const [planCumplido, setPlanCumplido] = useState([]);
  const [hoy, setHoy] = useState(dayjs().format('YYYY-MM-DD'));
  const [fechaInicial, setFechaInicial] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [fechaFin, setFechaFin] = useState(dayjs().endOf('month').format('YYYY-MM-DD'));
  const [noche, setNoche]=useState();
  const [mostrarFecha, setMostrar]=useState([])
  const [mes, setMes]=useState([])
  const [formatearMes, setFormatear]=useState()
const [isDarkMode, setIsDarkMode] = useState(true)
  
    useEffect(()=>{
        const nocheD=()=>{
            setNoche(isDarkMode)
        }
        nocheD()
    })

      useEffect(()=>{
        setMostrar(formatFecha(planCumplido[3]?.fecha))

      },[planCumplido])

      useEffect(() => {
        if (mostrarFecha.length > 0) {
          const fechaObjeto = new Date(mostrarFecha); // Convertir la primera fecha a un objeto Date
          setMes(fechaObjeto.toDateString()); // Formatear la fecha
        }
      }, [mostrarFecha]);
      


      const handleDateChange = (date) => {
        if (date) {
          setHoy(date.format('YYYY-MM-DD'));
          const firstDayOfMonth = date.startOf('month').format('YYYY-MM-DD');
          const lastDayOfMonth = date.endOf('month').format('YYYY-MM-DD');
          setFechaInicial(firstDayOfMonth);
          setFechaFin(lastDayOfMonth);
        }
      };

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
      }
    };

    fetchData();
  
    // Actualizar datos cada 5 minutos
    const intervalId = setInterval(fetchData, 300000); // 5 minutos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);

  }, [URL, hoy, fechaInicial, fechaFin]);


  // Manejar el cambio de modo oscuro
  const handleDarkModeToggle = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };


  // Estilos generales según el modo
  const appStyle = {
    padding: '10px',
    backgroundColor: isDarkMode ? '#1f1f1f' : '#f0f2f5',
    color: isDarkMode ? '#ffffff' : '#000000',
    height: '100vh',

    overflow: 'hidden',
  };

  const cardStyle = {
    flex: '1 1 30%',
    padding: '5px',
    backgroundColor: isDarkMode ? '#333333' : '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };


  return (
    <div style={appStyle}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Dashboard</h2>
      
      {/* Switch para cambiar entre modo claro y oscuro */}
      {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <Switch
          checked={isDarkMode}
          onChange={handleDarkModeToggle}
          checkedChildren="🌙 Dark"
          unCheckedChildren="☀️ Light"
        />
      </div> */}

      <div className="justify-content-end mb-3">
        <div className="row">
          <div className="col-4" style={{ boxShadow: 'none' }}>
            <LogoEco />
          </div>
          <div className="col-4">
            <DatePicker
              onChange={handleDateChange}
              style={{ marginBottom: '10px', width: '100%' }}
              getPopupContainer={trigger => trigger.parentNode}
            />
          </div>
        </div>
      </div>

      {/* Contenedor de los gráficos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Gráficos en una sola fila */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
          <div style={cardStyle}>
            <p style={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '26px' }}>Gráfico de Planificación Mensual   Octubre</p>
            <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlanMensual isDarkMode={noche} planCumplido={planMesData} />
            </div>
          </div>

          <div style={cardStyle}>
            <p style={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '26px' }}>Gráfico de % Eficiencia   Octubre</p>
            <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PorcentajeEficienciaMensual isDarkMode={noche} planCumplido={planMesData} />
            </div>
          </div>

          <div style={cardStyle}>
            <p style={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '26px' }}>Gráfico de Responsables   Octubre</p>
            <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsablesArea isDarkMode={noche} data={planMesData} />
            </div>
          </div>
        </div>

        {/* Gráficos 4 y 5 en otra fila */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
          
          <div style={cardStyle}>
            <p style={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '26px' }}>Gráfico de Planificación Diario  {mostrarFecha}</p>
            <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlanDiario  isDarkMode={noche} planCumplido={planCumplido} />
            </div>
          </div>

          <div style={cardStyle}>
            <p style={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '26px' }}>Gráfico de Comparativa Diario {mostrarFecha}</p>
            <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PorcentajeEficienciaDiario isDarkMode={noche} planCumplido={planCumplido} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
