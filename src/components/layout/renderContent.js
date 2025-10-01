import TablaUser from "../mantenimientos/users/TablaUsuarios";
import TablaRoles from "../mantenimientos/roles/TablaRoles";
import TablaTipProv from "../mantenimientos/proveedores/TablaTipProv";
import TablaEstadosMaq from "../mantenimientos/Estados_Maq/TablaEstaq";
import TablaEstProc from "../mantenimientos/Estados_Proc/TablaEstProc";
import TabProvedores from "../mantenimientos/proveedores/TablaProv";
import TablaMatPrima from "../mantenimientos/materiaPrima/TablaMatPrima";
import TablaOT from "../ordenesTrabajo/TablaOT";
import TablaTasaDeFiltracion from "../ordenesTrabajo/TablaControlCalidadTasaFiltracion.jsx";
import TablaControlImpregnacion from "../ordenesTrabajo/TablaControlImpregnacion.jsx";
import TablaControlC from "../ordenesTrabajo/TablaControlC";
import Buttn from "../ordenesTrabajo/botonOT/BotonOT";
import Dashboard from "../dashbords/Dashboard";
import TablaCP from "../ordenesControlProcesos/TablaCP";
import TablaMaq from "../maquinaria/TablaMaq";
import TableMantenimientoMaq from "../mantenimientosMaq/TablaMantenimientosMaq";
import TablaReportesOT from "../reporteS/ControlProcesos/TablaReportesOT";
import TablaControlProcesosOT from "../reporteS/AreasReportes/TablaControlProcesosOT";
import TablaLab from "../laboratorio/TablaLab";
import TablaPorCodigos from "../laboratorio/TablaPorCodigos";
import Board from "../planificacionProduccion/Board";
import AsignarIsuue from "../../components/planificacionProduccion/Isuues/TablaIsuues";
import OrdenesSap from "../SapOrdenes/TablaSap";
import OpenAi from "../OpenIa/ChatOpenIa";
// import TablaIndicesPlasticos from '../laboratorio/TablaIndicesPlasticos'
import FormularioIDPB from "../../components/laboratorio/FormularioIDPB";
import ManoObra from "../../components/SapOrdenes/manoObra";
import GestionHorasLaborales from "../mantenimientos/users/GestionHorasLaborales";
import TablaRecepcionBarro from "../MateriasPrimas/TablaRecepcionBarro.jsx";
import TablaRecepcionAserrin from "../MateriasPrimas/TablaRecepcionAserrin.jsx"
import TablaLotesAprobados from "../MateriasPrimas/TablaLotesAprobados";
import TablaProcesoDeMezclado from "../MateriasPrimas/TablaProcesoDeMezclado.jsx";
import TablaProcesoDeFormulacion from "../MateriasPrimas/TablaProcesoDeFormulacion.jsx";
import TablaFormulasProduccion from "../MateriasPrimas/TablaFormulasProduccion.jsx";
import TablaPulverizado from "../MateriasPrimas/TablaPulverizado.jsx";
import TablaProduccion from "../MateriasPrimas/TablaProduccion.jsx";
import CreacionSeriesProduccion from "../reporteS/ControlProcesos/CreacionSeriesProduccion.jsx";
import ROTP from "../reporteS/ControlProcesos/ROTP.jsx"
import Dthh from "../ordenesTrabajo/detallado/DTHH.jsx"
import MermasOTP from "../reporteS/ControlProcesos/ROTP.jsx"
import TablaMermasCrudos from '../ordenesTrabajo/TablaMermasCrudos.jsx'
import TablaMermasAprobados from '../ordenesTrabajo/TablaMermasAprobados.jsx'
import DTIP from "../ordenesTrabajo/detallado/DTIP.jsx"
import CodigosTasaFiltracion from "../reporteS/ControlProcesos/CodigosTasaFiltracion.jsx"
export const renderContent = (pathname) => {
  console.log('pathname', pathname)
  switch (pathname) {
    //Ruta para el Dashboard
    case "/Home/Dashboard":
      return <Dashboard />;

    //Ruta tabla de Usuarios
    case "/Home/TablaUser":
      return <TablaUser />;

    //Ruta Tabla Roles
    case "/Home/TablaRoles":
      return <TablaRoles />;
    //Ruta Tabla Tipo de Provedor
    case "/Home/TablaTipProv":
      return <TablaTipProv />;

    //Ruta Tabla Estados Maquinaria
    case "/Home/TablaEstadosMaq":
      return <TablaEstadosMaq />;
    //Ruta Tabla Estados Procesos
    case "/Home/TablaEstProc":
      return <TablaEstProc />;
    //Crear Estados de Maquinaria
    case "/Home/TablaMaq":
      return <TablaMaq />;
    //Crear Estados de Maquinaria
    case "/Home/TableMantenimientoMaq":
      return <TableMantenimientoMaq />;
    //Crear Estados de Maquinaria
    case "/Home/BoardPlanificacion":
      return <Board />;

    case "/Home/TabProvedores":
      return <TabProvedores />;

    case "/Home/TablaMatPrima":
      return <TablaMatPrima />;
      
      case "/Home/TablaOT":
        return <TablaOT />;
   
      case "/Home/TablaOT/TablaTasaDeFiltracion":
        return <TablaTasaDeFiltracion />;
      
        case "/Home/TablaOT/TablaControlImpregnacion":
          return <TablaControlImpregnacion />;

    case "/Home/TablaControlC":
      return <TablaControlC />;

    case "/Home/TablaCP":
      return <TablaCP />;
    case "/Home/Buttn":
      return <Buttn />;

    case "/Home/TablaReportesOT":
      return <TablaReportesOT />;
    case "/Home/TablaControlProcesosOT":
      return <TablaControlProcesosOT />;

    case "/Home/TablaLab":
      return <TablaLab />;

    case "/Home/TablaPorCodigos":
      return <TablaPorCodigos />;
    case "/Home/AsignarIsuue":
      return <AsignarIsuue />;

    case "/Home/OrdenesSap":
      return <OrdenesSap />;

    case "/Home/OpenAI":
      return <OpenAi />;

    // case '/Home/TablaIndicesPlasticos':
    // return <TablaIndicesPlasticos/>
    case "/Home/FormularioIDPB":
      return <FormularioIDPB />;

    case "/Home/ManoObra":
      return <ManoObra />;

    case "/Home/GestionHorasLaborales":
      return <GestionHorasLaborales />;

    case "/Home/TablaRecepcionBarro":
      return <TablaRecepcionBarro />;
      
    case "/Home/TablaRecepcionAserrin":
      return <TablaRecepcionAserrin />;

    case "/Home/TablaLotesAprobados":
      return <TablaLotesAprobados />;
   
      case "/Home/TablaProcesoDeMezclado":
      return <TablaProcesoDeMezclado />;

      case "/Home/TablaProcesoDeFormulacion":
      return <TablaProcesoDeFormulacion />;
      case "/Home/TablaFormulasProduccion":
      return <TablaFormulasProduccion />;
      
    case "/Home/TablaPulverizado":
      return <TablaPulverizado />;

    case "/Home/TablaProduccion":
      return <TablaProduccion />;

    case "/Home/CreacionSeriesProduccion":
      return <CreacionSeriesProduccion />;
    case "/Home/TablaReportesOT/ROTP":
      return <ROTP />;
    case "/Home/TablaMermasCrudos":
      return <TablaMermasCrudos />;
    case "/Home/TablaMermasAprobados":
      return <TablaMermasAprobados />;
    case "/Home/Order/dthh":
      return <Dthh />;
    case "/Home/TablaReportesOT/MermasOTP":
      return <MermasOTP />;
    case "/Home/TablaReportesOT/CodigosTasaFiltracion":
      return <CodigosTasaFiltracion />;
    case "/Home/TablaOT/DTIP":
      return <DTIP />;
    
    default:
      return null;
  }
};
