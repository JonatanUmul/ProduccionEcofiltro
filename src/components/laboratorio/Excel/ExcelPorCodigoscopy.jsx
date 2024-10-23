import React from 'react';
import * as XLSX from 'xlsx'; // Importar todas las exportaciones de xlsx
import { formatFecha } from '../../utilidades/FormatearFecta.js';

const ExcelROTHP = ({ datos }) => {
  const generarExcel = () => {
    // Crear una nueva hoja de cálculo de Excel
    const wb = XLSX.utils.book_new();

    // Agregar los encabezados a los datos
    const dataWithHeaders = [
      // Encabezados
      // { fecha_produccion:'FechaProduccion',codigos:'Codigo' },
      // Datos (esto debe coincidir con los encabezados)
      ...datos.map(dato => ({
        fechaProduccion:formatFecha(dato.fecha_produccion),
        codigo:dato.codigos,
        TipoFiltro:dato.ufmodelo,
        CombinacionASerrin:dato.Aserraderos,
        TamañoAserrin1:dato.TamañoAserrin1,
        TamañoAserrin2:dato.TamañoAserrin2,
        CantidadAserrin:dato.formulatotal,
        CantidadBarro:dato.librasBarro,
        ContenidoDeArcilla:dato.carcilla,
        ContenidoDeLimo:dato.climo,
        ContenidoDeArena:dato.carena,
        HumedadDeBarro:dato.hbarro,
        IndicePlastico:dato.iplastico,
        Mezcladora:dato.Mezcladora,
        MermaCrudoRajado:dato.estadoCrudo,
        Horno:dato.horno,
        FechaHorneado:formatFecha(dato.fechaHorneado),
        PosicionHorno:dato.posicionHorno,
        TiempoHorneado:'',
        TemperaturaHorno:dato.promedio,
        CdCRajadoDesportillado:dato.estadouf,
        TasaDeFiltracion:dato.tasa,
        ImpregnacionRajadoDesportillado:dato.estado,
        ReduccionColor:dato.ReduccionColor,
        TipoPlata:dato.insumo

      
      }))
    ];

  //   // Crear una nueva hoja en la hoja de cálculo de Excel
  //   const ws = XLSX.utils.json_to_sheet(dataWithHeaders);

  //   // Agregar la hoja a la hoja de cálculo de Excel
  //   XLSX.utils.book_append_sheet(wb, ws, 'Producción');

  //   // Guardar el archivo Excel
  //   const fileName = `Producción ${formatFecha(datos[0])}.xlsx`;
  //   XLSX.writeFile(wb, fileName);
  // };

      // Crear una nueva hoja en la hoja de cálculo de Excel
      const ws = XLSX.utils.json_to_sheet(dataWithHeaders);

      // Convertir la hoja de cálculo a CSV
      const csv = XLSX.utils.sheet_to_csv(ws);
  
      // Añadir el encabezado BOM para asegurar que se interprete como UTF-8
      const bom = '\uFEFF';
      const csvWithBom = bom + csv;
  
      // Crear un blob de los datos CSV con BOM
      const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
  
      // Crear un enlace de descarga
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `Producción ${formatFecha(datos[0].fecha_produccion)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  return (
    <div>
      <button className="btn" onClick={generarExcel}><i className="bi bi-file-earmark-excel-fill"></i></button>
    </div>
  );
};

export default ExcelROTHP;