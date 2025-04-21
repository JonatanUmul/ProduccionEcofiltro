import React from 'react';
import * as XLSX from 'xlsx'; // Importar todas las exportaciones de xlsx
import { formatFecha } from '../../../utilidades/FormatearFecta';
const ExcelROTHP = ({ datos }) => {
  const generarExcel = () => {
    // Crear una nueva hoja de cálculo de Excel
    const wb = XLSX.utils.book_new();

const dataWithHeaders=[
...datos.map(dato=>({
  fechaHorneado:formatFecha(dato.fecha_solantec),
  hora:dato.hora_creacion,
  t1:dato.t1,
  t2:dato.t2,
  t3:dato.t3,
  t4:dato.t4,
  t5:dato.t5,
  t6:dato.t6,
  t7:dato.t7,
  t8:dato.t8,
  t9:dato.t9,
  t10:dato.t10,
  t11:dato.t11,
  t12:dato.t12,
  estado:dato.est_horno,
  promedio:dato.promedio,
  horno: dato.horno,
  turno:dato.turno,
  modelouf:dato.nombre_modelo
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
