import React from 'react';

const DetalleOrdenProduccion = ({ resultado }) => {

  const Delete=(Linea)=>{
    console.log('Datos a eliminar', Linea)
  }
  return (
    <div className="container mt-4">
      <h3>Detalle de resultado de Producción</h3>

      {/* Datos generales */}
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Número de resultado</th>
            <td>{resultado.DocumentNumber}</td>
            <th>Producto</th>
            <td>{resultado.ItemNo}</td>
          </tr>
          <tr>
            <th>Descripción</th>
            <td>{resultado.ProductDescription}</td>
            <th>Bodega</th>
            <td>{resultado.Warehouse}</td>
          </tr>
          <tr>
            <th>Fecha de Creación</th>
            <td>{resultado.CreationDate}</td>
            <th>Fecha de Entrega</th>
            <td>{resultado.DueDate}</td>
          </tr>
          <tr>
            <th>Cantidad Planificada</th>
            <td>{resultado.PlannedQuantity}</td>
            <th>Estado</th>
            <td>{resultado.ProductionOrderStatus}</td>
          </tr>
          <tr>
            <th>Observaciones</th>
            <td colSpan="3">{resultado.Remarks}</td>
          </tr>
        </tbody>
      </table>

      {/* Materia prima */}
      <h4>Materia Prima</h4>
      <table className="table table-striped table-sm text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Articulo</th>
            <th>Cantidad</th>
            <th>Almacén</th>
          </tr>
        </thead>
        <tbody>
          {resultado.ProductionOrderLines?.map((linea, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{linea.ItemNo}</td>
              <td>{linea.ItemName}</td>
              <td>{linea.PlannedQuantity}</td>
              <td>{linea.Warehouse}</td>
              <button className="btn btn-danger btn-sm" onClick={() => Delete(linea)}>
  Eliminar
</button>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Etapas de producción (si existen) */}
      {resultado.ProductionOrdersStages?.length > 0 && (
        <>
          <h4>Etapas del Proceso</h4>
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>ID Etapa</th>
                <th>Secuencia</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {resultado.ProductionOrdersStages.map((etapa, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{etapa.StageID}</td>
                  <td>{etapa.SequenceNumber}</td>
                  <td>{etapa.StageStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DetalleOrdenProduccion;
