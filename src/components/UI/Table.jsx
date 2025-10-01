import React from "react";

const norm = (v) => String(v ?? "").trim().toLowerCase();
const isNoCumple = (v) => norm(v) === "no cumple";
const isAprobado = (v) => norm(v) === "aprobado";

const Table = ({ encabezadosTab = [], datosTab = [] }) => {
  // índice de la columna "aprobado" (si la hay)
  const idxAprobado = encabezadosTab.findIndex(
    (h) => norm(h) === "aprobado"
  );

  const getCellValue = (fila, j, keyFromHeader) => {
    if (Array.isArray(fila)) return fila[j];
    if (fila && typeof fila === "object") return fila[keyFromHeader];
    return undefined;
  };

  const getStatus = (fila) => {
    let val;
    if (idxAprobado > -1) {
      val = getCellValue(fila, idxAprobado, encabezadosTab[idxAprobado]);
    } else if (!Array.isArray(fila) && fila && typeof fila === "object") {
      val = fila.aprobado;
    } else if (Array.isArray(fila)) {
      // Busca un valor que diga "Aprobado" o "No Cumple"
      val = fila.find((c) => isNoCumple(c) || isAprobado(c));
    }
    if (isNoCumple(val)) return "no-cumple";
    if (isAprobado(val)) return "aprobado";
    return "normal";
  };

  return (
    <div
      className="table-responsive"
      style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}
    >
      <table
        className="table table-hover table-bordered align-middle shadow-sm text-center"
        style={{
          fontSize: "0.85rem",
          width: "100%",
          tableLayout: "auto",
          backgroundColor: "#fff",
        }}
      >
 <thead
  className="text-center"
  style={{
    position: "sticky",
    top: 0,
    zIndex: 3,
    backgroundColor: "#1D3557", // azul marino fuerte
    color: "#fff",              // texto blanco
    fontWeight: "600",          // títulos más marcados
    boxShadow: "0 3px 6px rgba(0,0,0,0.6)", // sombra
    borderBottom: "3px solid #E63946" // línea inferior rojo oscuro para remarcar
  }}
>

          <tr>
            <th style={{ padding: "0.3rem 0.5rem", whiteSpace: "nowrap" }}>#</th>
            {encabezadosTab.map((enc, e) => (
              <th
                key={e}
                style={{ padding: "0.3rem 0.5rem", whiteSpace: "nowrap" }}
              >
                {enc}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.isArray(datosTab) && datosTab.length > 0 ? (
            datosTab.map((fila, i) => {
              const status = getStatus(fila);

              // Definimos colores amigables
              let red='f95738'
              let bg = "transparent";
              let color = "inherit";
              if (status === "no-cumple") {
                bg = "#f8d7da"; // rojo pastel
                color = "#842029";
              } else if (status === "aprobado") {
                bg = "#d1e7dd"; // verde pastel
                color = "#0f5132";
              }

              return (
                <tr key={i} style={{ backgroundColor: bg, color }}>
                  <th
                    scope="row"
                    className="text-center"
                    style={{ padding: "0.3rem 0.5rem" }}
                  >
                    {i + 1}
                  </th>
                  {encabezadosTab.map((header, j) => {
                    const val = getCellValue(fila, j, header);
                    return (
                      <td

                        key={j}
                        className="text-center text-break"
                        style={{
                          padding: "0.3rem 0.5rem",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          backgroundColor:fila.LibrasDisponibles===0? red : bg,
                          color,
                        }}
                      >
                        {val ?? <span className="text-muted">—</span>}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={(encabezadosTab?.length || 0) + 1}
                className="text-center text-muted"
                style={{ padding: "0.5rem" }}
              >
                No hay datos para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;