import React from 'react';
import * as XLSX from 'xlsx'; // Importar todas las exportaciones de xlsx
import { formatFecha } from '../../../utilidades/FormatearFecta';

const ExcelROTHP = ({ datos }) => {
  const generarExcel = () => {
    // Crear una nueva hoja de cálculo de Excel
    const wb = XLSX.utils.book_new();

    // Agregar los encabezados a los datos
    const dataWithHeaders = [
  ...datos.map(dato=>({
    CodigoInicio: dato.codigoInicio,
    CodigoFinal: dato.codigoFin,
    Modelo: dato.ModeloEco,
    fechaHorneado:formatFecha(dato.fechaHorneado),
    fechaCC:dato.fechaCC != null && dato.fechaCC.length>0? formatFecha(dato.fechaCC):null ,
    LibrasBarro: dato.librasBarro,
    LibrasAserrin1: dato.librasAserrin,
    LibrasAserrin2:dato.librasAserrin2,
    TipoCernido:dato.tipocernido1,
    tipocernido2:dato.tipocernido2,
    TurnoHorneado: dato.turnoHorneado,
    Horneado: dato.horneado,
    MermasCrudas: dato.mermasCrudas,
    Horno:dato.Horno,
    Hornero:dato.Hornero,
    EncargadoCC:dato.EncargadoCC,
    Temperatura:dato.promedio,
    Aprobados:dato.aprobados,
    altos:dato.altos,
    bajos:dato.bajos,
    rajadosCC:dato.rajadosCC,
    crudoCC:dato.crudoCC,
    quemados:dato.quemados,
    ahumados:dato.ahumados,
    mermas_hornos:dato.mermas_hornos,
    porcentajeAprobado:dato.porcentaje
  }))
    ];

    // Crear una nueva hoja en la hoja de cálculo de Excel
    const ws = XLSX.utils.json_to_sheet(dataWithHeaders);

    // Agregar la hoja a la hoja de cálculo de Excel
    XLSX.utils.book_append_sheet(wb, ws, 'ROTHP');

    // Guardar el archivo Excel
    const fileName = `Horneados.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div>
      <button className="btn" onClick={generarExcel}><i className="bi bi-file-earmark-excel-fill"></i></button>
    </div>
  );
};

export default ExcelROTHP;
