import React from 'react';
import * as XLSX from 'xlsx'; // Importar todas las exportaciones de xlsx
import {formatFecha} from "../../../utilidades/FormatearFecta.js"
const ExcelROTHP = ({ datos,lote}) => {
  const generarExcel = () => {
    // Crear una nueva hoja de cálculo de Excel
    const today= formatFecha(new Date())
    const wb = XLSX.utils.book_new();

    // Agregar los encabezados a los datos
    const dataWithHeaders = [
      ...datos
    ];

    // Crear una nueva hoja en la hoja de cálculo de Excel
    const ws = XLSX.utils.json_to_sheet(dataWithHeaders);

    // Agregar la hoja a la hoja de cálculo de Excel
    XLSX.utils.book_append_sheet(wb, ws, 'ROTSA');

    // Guardar el archivo Excel
    const fileName =lote=='aserrin'? `Lotes Aserrín ${today}.xlsx`: `Lotes Barro ${today}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div>
      <button className="btn" onClick={generarExcel}><i className="bi bi-file-earmark-excel-fill"></i></button>
    </div>
  );
};

export default ExcelROTHP;
