import React from 'react';
import * as XLSX from 'xlsx'; // Importar todas las exportaciones de xlsx

const ExcelROTHP = ({ datos}) => {
  const generarExcel = () => {
    // Crear una nueva hoja de cálculo de Excel
    const wb = XLSX.utils.book_new();

    // Agregar los encabezados a los datos
    const dataWithHeaders = [
      ...datos
    ];

    // Crear una nueva hoja en la hoja de cálculo de Excel
    const ws = XLSX.utils.json_to_sheet(dataWithHeaders);

    // Agregar la hoja a la hoja de cálculo de Excel
    XLSX.utils.book_append_sheet(wb, ws, 'ROTIP');

    // Guardar el archivo Excel
    const fileName = `Reporte De Impregnación.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div>
      <button className="btn" onClick={generarExcel}><i className="bi bi-file-earmark-excel-fill"></i></button>
    </div>
  );
};

export default ExcelROTHP;
