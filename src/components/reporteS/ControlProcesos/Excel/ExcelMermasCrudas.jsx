import React from 'react';
import * as XLSX from 'xlsx';

const ExcelROTHP = ({ dats }) => {
  console.log('excel',dats)
  // Datos con encabezado definido
  const fecha= Array.isArray(dats) ? dats.map((rows) => ({ fecha:rows[0] })) : [];
  console.log(fecha)
  const datos = Array.isArray(dats) ? dats.map((rows) => ({fecha_eliminacion:rows[0], Serie: rows[1], Estado: rows[2] })) : [];

  const limitarTexto = (datos) => {
    return datos?.map(fila => {
      const nuevaFila = {};
      for (const key in fila) {
        const valor = fila[key];
        nuevaFila[key] =
          typeof valor === 'string' && valor.length > 32767
            ? valor.slice(0, 32767)
            : valor;
      }
      return nuevaFila;
    });
  };

  const generarExcel = () => {
    const wb = XLSX.utils.book_new();
    const datosLimpiados = limitarTexto(datos);

    // Generamos la hoja con encabezado correcto
    const ws = XLSX.utils.json_to_sheet(datosLimpiados, { header: ["Serie", "Estado"] });

    XLSX.utils.book_append_sheet(wb, ws, 'Series');

    XLSX.writeFile(wb, `Códigos Producción.xlsx`);
  };

  return (
    <div>
      <button className="btn" onClick={generarExcel}>
        <i className="bi bi-file-earmark-excel-fill"></i>
      </button>
    </div>
  );
};

export default ExcelROTHP;
