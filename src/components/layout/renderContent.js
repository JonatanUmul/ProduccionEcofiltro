import TablaUser from "../mantenimientos/users/TablaUsuarios";
import TablaRoles from "../mantenimientos/roles/TablaRoles";
import TablaTipProv from "../mantenimientos/proveedores/TablaTipProv";
import TablaEstadosMaq from "../mantenimientos/Estados_Maq/TablaEstaq";
import TablaEstProc from "../mantenimientos/Estados_Proc/TablaEstProc";
import TabProvedores from '../mantenimientos/proveedores/TablaProv';
import TablaMatPrima from '../mantenimientos/materiaPrima/TablaMatPrima';
import TablaOT from '../ordenesTrabajo/TablaOT';
import TablaControlC from '../ordenesTrabajo/TablaControlC';
import Buttn from '../ordenesTrabajo/botonOT/BotonOT';
import Dashboard from '../dashbords/Dashboard';
import TablaCP from '../ordenesControlProcesos/TablaCP'
import TablaMaq from '../maquinaria/TablaMaq'
import TableMantenimientoMaq from '../mantenimientosMaq/TablaMantenimientosMaq'
import TablaReportesOT from '../reporteS/ControlProcesos/TablaReportesOT'
import TablaControlProcesosOT from '../reporteS/AreasReportes/TablaControlProcesosOT'
import TablaLab from '../laboratorio/TablaLab'
import TablaPorCodigos from '../laboratorio/TablaPorCodigos'
import Board from '../planificacionProduccion/Board'
import AsignarIsuue from '../../components/planificacionProduccion/Isuues/TablaIsuues'
import OrdenesSap from '../SapOrdenes/OrdenesSap'
import OpenAi from '../OpenIa/ChatOpenIa'
import TablaIndicesPlasticos from '../laboratorio/TablaIndicesPlasticos'
export const renderContent = (pathname) => {
    switch (pathname) {

      //Ruta para el Dashboard
      case "/Home/Dashboard":
        return <Dashboard/>

      //Ruta tabla de Usuarios
      case "/Home/TablaUser":
        return <TablaUser/>;
  
      //Ruta Tabla Roles
      case "/Home/TablaRoles":
        return <TablaRoles/>;
      //Ruta Tabla Tipo de Provedor
      case "/Home/TablaTipProv":
       return <TablaTipProv/>;
  
      //Ruta Tabla Estados Maquinaria
      case "/Home/TablaEstadosMaq":
       return <TablaEstadosMaq/>;
        //Ruta Tabla Estados Procesos
      case "/Home/TablaEstProc":
        return <TablaEstProc/>
        //Crear Estados de Maquinaria
      case "/Home/TablaMaq":
        return <TablaMaq/>
          //Crear Estados de Maquinaria
      case "/Home/TableMantenimientoMaq":
        return <TableMantenimientoMaq/>
          //Crear Estados de Maquinaria
      case "/Home/BoardPlanificacion":
        return <Board/>
        
          case "/Home/TabProvedores":
          return <TabProvedores />;
  
          case "/Home/TablaMatPrima":
            return <TablaMatPrima />;
          
              case "/Home/TablaOT":
                return <TablaOT />;

                case "/Home/TablaControlC":
                  return <TablaControlC />;
                  
              case "/Home/TablaCP":
                return <TablaCP />;
                case "/Home/Buttn":
                  return <Buttn />

                  case "/Home/TablaReportesOT":
                return <TablaReportesOT />;
                case "/Home/TablaControlProcesosOT":
                  return <TablaControlProcesosOT />;

                  case "/Home/TablaLab":
                    return <TablaLab />;
                    
                    case "/Home/TablaPorCodigos":
                      return <TablaPorCodigos />;
                   case '/Home/AsignarIsuue':
                    return <AsignarIsuue/>   
                   
                    case '/Home/OrdenesSap':
                    return <OrdenesSap/>
     
                    case '/Home/OpenAI':
                      return <OpenAi/>

                      case '/Home/TablaIndicesPlasticos':
                      return <TablaIndicesPlasticos/>
      default:
        return null;
    }
  };