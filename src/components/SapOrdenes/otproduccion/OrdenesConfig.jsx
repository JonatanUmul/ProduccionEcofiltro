import React from 'react';
import OrdenProduccion from './PruebaProd';

const ordenesConfig = [
  {
    titulo: "Orden Producción Barro Seco",
    itemNo: "MP100002",
    series: "33",
    materiales: [
      { StageID: 1, ItemNo: "MP100000", Warehouse: "Bodega01", calculaSacos: true },
    ],
  },
  {
    titulo: "Orden Producción Aserrín Seco La Unión",
    itemNo: "MP100018",
    series: "81",
    materiales: [
      { StageID: 1, ItemNo: "MP100001", Warehouse: "Bodega01", calculaSacos: false, campo: "sacos" },
    ],
  },
];

const App = () => {
  return (
    <div>
      {ordenesConfig.map((orden, index) => (
  <OrdenProduccion key={index} config={orden} />
))}
    </div>
  );
};

export default App;
