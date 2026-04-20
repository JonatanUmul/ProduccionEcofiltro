import React from 'react';
import * as XLSX from 'xlsx'; // Importar todas las exportaciones de xlsx

const ExcelROTHP = ({ datos, name }) => {
  const generarExcel = () => {
    let nom= !name ? 'Humedad En patios.xlsx': name
    // Crear una nueva hoja de cálculo de Excel
    const wb = XLSX.utils.book_new();

    // Crear una nueva hoja en la hoja de cálculo de Excel
    const ws = XLSX.utils.json_to_sheet(datos);

    // Agregar la hoja a la hoja de cálculo de Excel
    XLSX.utils.book_append_sheet(wb, ws, 'ROTHP');  

    // Guardar el archivo Excel
    XLSX.writeFile(wb, nom);
  };

  return (
    <div>
      <button className="btn" onClick={generarExcel}><i class="bi bi-file-earmark-excel-fill"></i></button>
    </div>
  );
};

export default ExcelROTHP;
