import React from 'react';
import * as XLSX from 'xlsx'; // Importar todas las exportaciones de xlsx
import { formatFecha } from '../../utilidades/FormatearFecta.js';

const ExcelROTHP = ({ datos }) => {
  console.log('Datos en excel',datos)
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
        Tipoformula:dato.formulaTipo,
        TipoFiltro:dato.ufmodelo,
        aserradero1:dato.aserradero_principal,
        aserradero2:dato.aserradero_secundario,
        // TamañoAserrin1:dato.tamañoAserrin_principal,
        // TamañoAserrin2:dato.tamañoAserrin_secundario,
        librasAserrin1: dato.librasAserrin,
        librasAserrin2: dato.librasAserrin2,
        mayor_2mm:dato.mayor_2mm,
        entre_2_y_05mm:dato.entre_2_y_05mm,
        menor_05mm:dato.menor_05mm,
        FormulaTotalAserrin:dato.formulatotal,
        CantidadBarro:dato.librasBarro,
        ContenidoDeArcilla:dato.carcilla,
        ContenidoDeLimo:dato.climo,
        ContenidoDeArena:dato.carena,
        HumedadDeBarro:dato.hbarro,
        IndicePlastico:dato.iplastico,
        limite_liquido:dato.limite_liquido,
        limite_plastico:dato.limite_plastico,
        liindice_plasticomB:dato.indice_plastico,
        Mezcladora:dato.Mezcladora,
        EstadoCrudo:dato.estadoCrudo,
        Horno:dato.horno,
        FechaHorneado:formatFecha(dato.fechaHorneado),
        TemperaturaHorno:dato.promedio,
        TasaDeFiltracion:dato.tasa,
        EstadoCC:dato.estadouf,
        ReduccionColor:dato.ReduccionColor,
        fecha_impregnacion:formatFecha(dato.fecha_impregnacion),
        estadoImpregnado:dato.estadoImpregnado,
        TipoPlata1:dato.plata1,
        TipoPlata1:dato.plata2
  
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
      link.setAttribute('download', `Producción.csv`);
      // link.setAttribute('download', `Producción ${formatFecha(datos[0].fecha_produccion)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  return (
    <div>
      <button className="btn" onClick={generarExcel}><i className="bi bi-file-earmark-excel-fill"></i>CSV</button>
    </div>
  );
};

export default ExcelROTHP;