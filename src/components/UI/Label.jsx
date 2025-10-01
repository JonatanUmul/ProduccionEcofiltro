import { useField } from 'formik';
import React from 'react';
import './NumberImput.css'; // Asegúrate de tener este archivo para estilos adicionales

const Label = ({ children, ...props }) => {

  const [field] = useField({ ...props });
  console.log('Label Reutilizable',children, props, field)
  return (

        <label
          htmlFor={props.id || props.name}
          className="label-reusable"
          {...props}
          {...field}
        >
          {children}
        </label>
    
  );
};

export default Label;
