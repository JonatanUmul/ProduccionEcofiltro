import React, { useState, useEffect } from 'react';
import './App.css';
import Layout from './components/layout/Layout';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import User from './components/mantenimientos/users/Usr';
import TablaUser from './components/mantenimientos/users/TablaUsuarios';
import TablaRoles from './components/mantenimientos/roles/TablaRoles';
import Roles from './components/mantenimientos/roles/Roles';
import Dashboard from './components/dashbords/Dashboard';
import TablaTipProv from './components/mantenimientos/proveedores/TablaTipProv';
import CreateTipProv from './components/mantenimientos/proveedores/TipProvedor';
import TablaEstadosMaq from './components/mantenimientos/Estados_Maq/TablaEstaq';
import CrearEstMaq from './components/mantenimientos/Estados_Maq/EstadosMaq';
import TablaEstProc from './components/mantenimientos/Estados_Proc/TablaEstProc';
import CrearEstadoProc from './components/mantenimientos/Estados_Proc/CrearEstadoProc';
import FormCrearProv from './components/mantenimientos/proveedores/Form.CreatProv';
import TabProvedores from './components/mantenimientos/proveedores/TablaProv';
import TablaMatPrima from './components/mantenimientos/materiaPrima/TablaMatPrima';
import CrearMatPrima from './components/mantenimientos/materiaPrima/Form.CrearMatPrima';
import TablaOT from './components/ordenesTrabajo/TablaOT';
import TablaControlC from './components/ordenesTrabajo/TablaControlC.jsx';
import TablaCP from './components/ordenesControlProcesos/TablaCP';
import TableMantenimientoMaq from './components/mantenimientosMaq/TablaMantenimientosMaq';
import TablaMaq from './components/maquinaria/TablaMaq';
import Buttn from './components/ordenesTrabajo/botonOT/BotonOT';
import TablaReportesOT from './components/reporteS/ControlProcesos/TablaReportesOT';
import TablaControlProcesosOT from './components/reporteS/AreasReportes/TablaControlProcesosOT.jsx';
import ProtectedRoute from './components/ProtectedRoute.js';
import { AbilityProvider } from './components/AbilityContext.js';
import TablaLab from './components/laboratorio/TablaLab.jsx';
import TablaPorCodigos from './components/laboratorio/TablaPorCodigos.jsx';
import Board from './components/planificacionProduccion/Board.jsx';
import AsignarIsuue from './components/planificacionProduccion/Isuues/TablaIsuues.jsx';
import OrdenesSap from './components/SapOrdenes/OrdenesSap.jsx'
import OpenAI from './components/OpenIa/ChatOpenIa.jsx'
import TablaIndicesPlasticos from './components/laboratorio/TablaIndicesPlasticos.jsx'
function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AbilityProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/Home" element={<Layout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}>
              {/* Mantenimientos */}
              <Route path="/Home/TablaUser" element={<TablaUser toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/User" element={<User toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TablaRoles" element={<TablaRoles toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/Roles" element={<Roles />} />
              <Route path="/Home/TablaTipProv" element={<TablaTipProv toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
              <Route path="/Home/CreateTipProv" element={<CreateTipProv toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TablaEstadosMaq" element={<TablaEstadosMaq toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/CrearEstMaq" element={<CrearEstMaq toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TablaEstProc" element={<TablaEstProc toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
              <Route path="/Home/CrearEstadoProc" element={<CrearEstadoProc toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/Dashboard" element={<Dashboard toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TabProvedores" element={<TabProvedores toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
              <Route path="/Home/FormCrearProv" element={<FormCrearProv toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
              <Route path="/Home/TablaMatPrima" element={<TablaMatPrima toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/CrearMatPrima" element={<CrearMatPrima toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TableMantenimientoMaq" element={<TableMantenimientoMaq toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
              <Route path="/Home/TablaOT" element={<TablaOT toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TablaControlC" element={<TablaControlC toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TablaCP" element={<TablaCP toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TablaMaq" element={<TablaMaq toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/Buttn" element={<Buttn toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TablaReportesOT" element={<TablaReportesOT toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TablaControlProcesosOT" element={<TablaControlProcesosOT toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TablaLab" element={<TablaLab toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path="/Home/TablaPorCodigos" element={<TablaPorCodigos toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>} />
              <Route path='/Home/BoardPlanificacion' element={<Board toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>}></Route>
              <Route path='/Home/AsignarIsuue' element={<AsignarIsuue/>}></Route>
              <Route path='/Home/OrdenesSap' element={<OrdenesSap  toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>}></Route>
              <Route path='/Home/OpenAI' element={<OpenAI  toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>}></Route>
              <Route path='/Home/TablaIndicesPlasticos' element={<TablaIndicesPlasticos toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>}></Route>
            </Route>
          </Route>
         
        </Routes>
      </Router>
      </AbilityProvider>
  );
}

export default App;
