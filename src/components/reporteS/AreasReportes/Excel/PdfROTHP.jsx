import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-table';

const PdfROTHP = ({ datos }) => {
  const generarpDF = () => {
    // Crear un nuevo documento jsPDF
    const doc = new jsPDF();

    // Configurar los datos de la tabla
    const tableData = datos.map(fila => {
      return [
        fila.fecha_creacion,
        fila.aserradero,
        fila.esquinaCentro,
        fila.esquinaInfDR,
        fila.esquinaInfIZ,
        fila.esquinaSupDA,
        fila.esquinaSupIZ
      ];
    });

    // Configurar las columnas de la tabla
    const tableColumns = [
      { header: 'Fecha', dataKey: 'fecha_creacion' },
      { header: 'Aserradero', dataKey: 'aserradero' },
      { header: 'Centro', dataKey: 'esquinaCentro' },
      { header: 'Esquina Inferior Derecha', dataKey: 'esquinaInfDR' },
      { header: 'Esquina Inferior Izquierda', dataKey: 'esquinaInfIZ' },
      { header: 'Esquina Superior Derecha', dataKey: 'esquinaSupDA' },
      { header: 'Esquina Superior Izquierda', dataKey: 'esquinaSupIZ' }
    ];

    // Agregar la tabla al documento
    doc.autoTable({
      head: [tableColumns.map(column => column.header)],
      body: tableData
    });

    // Guardar el PDF
    doc.save('ROTHP.pdf');
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={generarpDF}><i class="bi bi-filetype-pdf"></i></button>
    </div>
  );
};

export default PdfROTHP;
