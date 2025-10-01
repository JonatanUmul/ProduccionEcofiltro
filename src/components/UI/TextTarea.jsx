import { useField } from 'formik'
import React from 'react'

const TextTarea = ({comentario,...props}) => {
    const [field]=useField({...props})
  return (
    <div className="mb-3">
    <label htmlFor="exampleFormControlTextarea1" className="form-label">
      {comentario}
    </label>
    <textarea
      className="form-control shadow-sm border-1 border-secondary rounded-3 p-3"
      rows={4}
      placeholder="Escribe tus comentarios aquí..."
      style={{
        backgroundColor: "#f8f9fa", 
        resize: "none",
        fontSize: "1rem",
        transition: "border-color 0.3s ease",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#0d6efd")}
onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
 {...props} {...field}></textarea>
  </div>
  
  )
}

export default TextTarea
