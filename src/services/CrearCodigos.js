
const CreateCodigosProduccion=({datosParaCodigos})=>{

const NumerosSeries=[]
const codInicio= Number(datosParaCodigos.CodigoInicioNumber)
const producido= Number(datosParaCodigos.producido)

for(let i=0; i<producido; i++){

    const numero=String(codInicio+i).padStart(5, '0')
    const Serial= `${datosParaCodigos.identificador}${numero}0${datosParaCodigos.fechaConcatenado}`

    NumerosSeries.push(Serial)
    
}
return NumerosSeries

}


export default CreateCodigosProduccion;