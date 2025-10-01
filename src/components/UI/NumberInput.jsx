import {  useField } from 'formik'
import React from 'react'
import './NumberImput.css'

const Input = ({span, Children,...props}) => {
  
    const [Field]= useField({...props})

  return (
    <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.6rem' }}>
    <div style={{ flex: 1 }}>
    <div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text" id="">{span}</span>
  </div>
    <input {...props}{...Field}>{Children}</input>
    </div>
    </div>
    </div>
  )
}

export default Input

