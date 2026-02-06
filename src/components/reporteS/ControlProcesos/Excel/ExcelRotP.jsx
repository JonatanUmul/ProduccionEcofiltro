import React from 'react';
import * as XLSX from 'xlsx'; // Importar todas las exportaciones de xlsx

const ExcelROTHP = ({ datos}) => {
  const limitarTexto = (datos) => {
    return datos.map(fila => {
      const nuevaFila = {};
      for (const key in fila) {
        const valor = fila[key];
        if (typeof valor === 'string' && valor.length > 32767) {
          nuevaFila[key] = valor.slice(0, 32767);
        } else {
          nuevaFila[key] = valor;
        }
      }
      return nuevaFila;
    });
  };

  
  const generarExcel = () => {
    const wb = XLSX.utils.book_new();
  
    const datosLimpiados = limitarTexto(datos); // Aquí limitamos
  
    const ws = XLSX.utils.json_to_sheet(datosLimpiados);
  
    XLSX.utils.book_append_sheet(wb, ws, 'ROTSA');
  
    const fileName = `Remporte de producción.xlsx`; // Asegúrate que fechaSecado esté definido
    XLSX.writeFile(wb, fileName);
  };
  

  return (
    <div>
      <button className="btn" onClick={generarExcel}><i className="bi bi-file-earmark-excel-fill"></i></button>
    </div>
  );
};

export default ExcelROTHP;
