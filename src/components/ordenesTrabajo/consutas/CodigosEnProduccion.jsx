import React, { useState, useEffect } from 'react'

const CodigosEnProduccion = ({ datosParaCodigos, crearCodigos }) => {
  console.log('crearCodigos',crearCodigos, datosParaCodigos)
  const [codigos, setCodigos] = useState([])
console.log(codigos)

useEffect(() => {
  const nuevosCodigos = [];

  const inicio = Number(datosParaCodigos.CodigoInicioNumber+1); // Código base
  const total = Number(datosParaCodigos.producido); // Cuántos códigos generar

  for (let i = 0; i < total; i++) {
    const numero = String(inicio + i).padStart(5, '0');
    const codigoFinal = `${datosParaCodigos.identificador}${numero}0${datosParaCodigos.fechaConcatenado}`;
    nuevosCodigos.push(codigoFinal);
  }

  setCodigos(nuevosCodigos);
}, [datosParaCodigos]);


  const contenedorStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
    maxHeight: '400px',
    overflowY: 'auto',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px'
  }

  const codigoBoxStyle = {
    backgroundColor: '#f5f5f5',
    padding: '8px 12px',
    textAlign: 'center',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '14px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  }

  return (
    <div style={contenedorStyle}>
      {codigos.map((codigo, index) => (
        <div key={index} style={codigoBoxStyle}>
          {codigo}
        </div>
      ))}
    </div>
  )
}

export default CodigosEnProduccion
