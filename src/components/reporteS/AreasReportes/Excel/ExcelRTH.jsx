import React from 'react';
import * as XLSX from 'xlsx'; // Importar todas las exportaciones de xlsx
import { formatFecha } from '../../../utilidades/FormatearFecta';
const ExcelROTHP = ({ datos }) => {
  const generarExcel = () => {
    // Crear una nueva hoja de cálculo de Excel
    const wb = XLSX.utils.book_new();

const dataWithHeaders=[
...datos.map(dato=>({
  fechaHorneado:formatFecha(dato.fecha_real),
  Modelo:dato.modelo,
  Horno:dato.horno,
  Turno:dato.turno,
  Hornero:dato.hornero,
  hora:dato.hora_creacion,
  CabezaDerecha:dato.tempCabezaDR,
  CentroDerecha:dato.tempCentroDR,
  PieDerecho: dato.tempPieDR,
  CabezaIzquierda: dato.tempCabezaIZ,
  CentroIzquierda: datos.tempCentroIZ,
  PieIzquierdo: dato.tempPieIZ,
  PromedioTemp:dato.promedio
}))

]




    // Crear una nueva hoja en la hoja de cálculo de Excel
    const ws = XLSX.utils.json_to_sheet(dataWithHeaders);

    // Agregar la hoja a la hoja de cálculo de Excel
    XLSX.utils.book_append_sheet(wb, ws, 'Temperaturas Hornos');  

    // Guardar el archivo Excel
    XLSX.writeFile(wb, 'Temperatura Hornos.xlsx');
  };

  return (
    <div>
      <button className="btn" onClick={generarExcel}><i class="bi bi-file-earmark-excel-fill"></i></button>
    </div>
  );
};

export default ExcelROTHP;
