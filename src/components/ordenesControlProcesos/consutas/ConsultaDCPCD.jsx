import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import "./estiloTabla.css";

const URL = process.env.REACT_APP_URL;

const ConsultaDCPB = ({ id }) => {
  const [error, setError] = useState("");
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/DCPCD/${id}`)
      .then((response) => {
        setFila(response.data.data); // Acceder a response.data.data
        console.log(response.data.data);
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, [id]);

  const avg = (key) => {
    const nums =
      (fila || [])
        .map((r) => {
          const v = r?.[key];
          const n = typeof v === "string" ? parseFloat(v.replace(",", ".")) : Number(v);
          return Number.isFinite(n) ? n : NaN;
        })
        .filter((n) => !Number.isNaN(n)) || [];

    if (nums.length === 0) return "—";
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    return Number.isInteger(mean) ? mean : mean.toFixed(2);
  };

  console.log(fila);

  return (
    <div className="table-responsive">
      {error && <div>Error: {error}</div>}
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha de Producción</th>
            <th scope="col">Hora Creación</th>
            <th scope="col">Barro</th>
            <th scope="col">Aserrín</th>
            <th scope="col">Diámetro</th>
            <th scope="col">Altura H1</th>
            <th scope="col">Altura H2</th>
            <th scope="col">Grosor 1</th>
            <th scope="col">Grosor 2</th>
            <th scope="col">Grosor Fondo</th>
            <th scope="col">Peso</th>
            <th scope="col">Molde</th>
            <th scope="col">Uf</th>
            <th scope="col">Turno</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(fila) &&
            fila.length > 0 &&
            fila.map((f, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatFecha(f.fecha_produccion)}</td>
                <td>{f.hora_ceacrion}</td>
                <td>{f.barroLB}</td>
                <td>{f.aserrinLB}</td>
                <td>{f.diametro}</td>
                <td>{f.alturaH1}</td>
                <td>{f.alturaH2}</td>
                <td>{f.grosor1}</td>
                <td>{f.grosor2}</td>
                <td>{f.grosorFondo}</td>
                <td>{f.pesouf}</td>
                <td>{f.molde}</td>
                <td>{f.ufmodelo}</td>
                <td>{f.turno}</td>
              </tr>
            ))}
        </tbody>

        <tfoot className="fw-bold">
          <tr>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>{avg("barroLB")}</td>
            <td>{avg("aserrinLB")}</td>
            <td>{avg("diametro")}</td>
            <td>{avg("alturaH1")}</td>
            <td>{avg("alturaH2")}</td>
            <td>{avg("grosor1")}</td>
            <td>{avg("grosor2")}</td>
            <td>{avg("grosorFondo")}</td>
            <td>{avg("pesouf")}</td>
            <td>—</td>
            <td>—</td>
            <td>{avg("turno")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ConsultaDCPB;
