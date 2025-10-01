import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Input from "../../UI/NumberInput";
import Button from "../../UI/Button";
import TextTarea from "../../UI/TextTarea";
import PostResgitroSacosdeBarroPulverizado from "../../../services/PostResgitroSacosdeBarroPulverizado";

const RegistroDeSacosDeBarro = ({ datosApi, onClose }) => {
  const Hoy = new Date().toISOString().split("T")[0];
  const id_camionada = datosApi.id;
  const camionada = datosApi.codigo_lote;
  const [id_creador, setid_creador] = useState("");
  const [peso, setPeso] = useState(0);
  console.log(peso);
  useEffect(() => {
    setid_creador(localStorage.getItem("id_creador"));
  }, []);

  if (id_creador === "") return null;
  return (
    <div className="mt-4 d-flex justify-content-center">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "600px", width: "100%", border: "0" }}
      >
        <Formik
          initialValues={{
            id_camionada: id_camionada,
            creador: id_creador,
            id_proceso: 18,
            fecha: Hoy,
            camionada: camionada,
            peso_saco: 60,
            sacosBarro: 0,
            humedadpromedio: 0,
            comentario: "",
          }}
          onSubmit={(values) => {
            const payload = values;

            PostResgitroSacosdeBarroPulverizado({ payload, onClose });
          }}
        >
          <Form className="d-flex flex-column gap-3">
            <Input
              span="Fecha"
              className="form-control bg-light"
              disabled
              type="date"
              name="fecha"
            />

            <Input
              span="Lote Camionada"
              className="form-control bg-light border rounded px-3 py-2"
              disabled
              type="text"
              name="camionada"
            />
            <Input
              span="Peso por saco"
              className="form-control border rounded px-3 py-2"
              type="number"
              name="peso_saco"
              required
            />

            <Input
              span="Sacos de Barro"
              className="form-control border rounded px-3 py-2"
              type="number"
              name="sacosBarro"
              required
            />

            <Input
              span="% Humedad Promedio"
              className="form-control border rounded px-3 py-2"
              type="number"
              name="humedadpromedio"
              required
            />

            <TextTarea name="comentario" comentario="Coimentarios" />

            <Button type="Submit">Guardar</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegistroDeSacosDeBarro;
