import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { formatFecha } from '../../../utilidades/FormatearFecta';
import { Modal, ModalBody, Button } from 'reactstrap';

const styles = StyleSheet.create({
  container: {
    marginVertical: -1,
    flexDirection: 'row',
    textAlign: 'center',
    borderRadius: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 70,
    marginTop: 30,
  },
  cardHeader: {
    backgroundColor: '#ccc',
    color: 'black',
    padding: 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 50,
  },
  cardTitle: {
    fontSize: 8,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 12,
    marginBottom: 10,
  },
  titleContainer: {
    justifyContent:'center',
    marginVertical: -2,
    textAlign: 'center',
    position:'relative',
    flex: 1,
    marginHorizontal: 0,
    marginLeft: 2,
    // border:'1px'
  },
  title: {
    // padding: 8,
    // marginVertical: -1,
    // marginHorizontal: -1,
    fontSize: 10,
    // fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',

    borderWidth: 0.5,
    flex: 1,
  },
  section: {
   textAlign:'center',
   justifyContent:'center'
    
  },
  sectionColumn: {
    flexDirection: 'column',
  },
  sectionHeader: {
    maxHeight: '100%',
    borderBottom: 0.4,
    borderTop: 0.4,
    borderLeft: 0.4,
    borderRight: 0.4,
    marginBottom: 1.7,
    flexDirection: 'column',
    fontWeight: 'bold',
    fontSize: 8,
  },
  page: {
    flexDirection: 'column',
    padding: 20,
    marginTop:30
  },
  table: {
    width: '100%',
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  tableHeader: {
    textAlign: 'center',
    fontSize: 8,
    flexDirection: 'row',
    backgroundColor: '#ccc',
    fontWeight: 'bold',
  },
  tableRow: {
    textAlign: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  tableCell: {
    marginBottom: 0,
    fontSize: 8,
    textAlign: 'center',
    borderWidth: 0.3,
    borderBottom: 0.3,
    borderTop: 0.3,
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 3,
    flex: 1,
  },
  text: {
    marginLeft: 2,
  },
  logo: {
    marginHorizontal: -1,
    border:0.5
  },
  firmas: {
    fontSize: 8,
    flexDirection: 'row',
    justifyContent:'space-around',
    marginTop: 5,
    marginLeft: 20,
    textAlign:'right',
    alignItems:'center'
    
  },
  FirmasIMG:{
    width:'15%',
    height:'100%',
    borderBottom:'1px solid black',
    justifyContent:'space-between',
    flexDirection:'row',
   resizeMode: 'contain',
  },
  lineas: {
    fontSize: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -5,
    marginRight: 5,
    textAlign:'center'
  },
  headd: {
    width: '100%',
    marginTop: 10,
  },
  firmasText:{
    flexDirection: 'row',
    justifyContent: 'space-around',

    fontSize:10,
    

  },
  

});

const MyDocument = ({ datos, NombreJefe}) => {
  console.log('pdf cc', datos)
    const UltimaFirma=datos[datos.length-1]
    const FirmaEncargado= UltimaFirma?.FirmaEncargado || null
    const FirmaJefe= UltimaFirma?.FirmaEncargado || null

    const nombreEncargado=UltimaFirma?.NombreCreador || null
    const hoy= new Date()
  

   const rowsPerPage = 15; // Ajusta esto según sea necesario
    const totalPages = Math.ceil(datos.length / rowsPerPage);
  
    const createPages = () => {
      const pages = [];
      for (let i = 0; i < totalPages; i++) {
        const start = i * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = datos.slice(start, end);
  
        pages.push(
   
      <Page style={styles.page} >
        <View style={[styles.container,{justifyContent: 'center', textAlign:'center'}]}>
          <View style={[styles.titleContainer, { flex: 0.5, justifyContent: 'center' }]}>
            <Image source={{ uri: "/images/LoogoEco.png" }} style={styles.logo } />
          </View>
          <View style={[styles.titleContainer, { flex: 4,alignItems:'center', justifyContent:'center' }]}>
            <Text style={[styles.Header, styles.title,{textAlign:'center'}]}>GESTIÓN DE CALIDAD</Text>
            <Text style={[styles.Header, styles.title,{textAlign:'center'}]}>CONTROL DE CALIDAD</Text>
          </View>
          <View style={[styles.titleContainer, { flex: 1 ,alignItems:'center', justifyContent:'center'}]}>
            <Text style={[styles.Header, styles.title,{textAlign:'center',alignItems:'center', justifyContent:'center'}]}>CÓDIGO:</Text>
            <Text style={[styles.Header, styles.title,{textAlign:'center' ,alignItems:'center', justifyContent:'center'}]}>VERSIÓN:</Text>
            <Text style={[styles.Header, styles.title,{textAlign:'center',alignItems:'center', justifyContent:'center'}]}>EMISIÓN:</Text>
          </View>
          <View style={[styles.titleContainer, { flex: 1,alignItems:'center', justifyContent:'center' }]}>
            <Text style={[styles.Header, styles.title, { textAlign: 'center',alignItems:'center', justifyContent:'center' }]}>PRO-FOR-004</Text>
            <Text style={[styles.Header, styles.title, { textAlign: 'center',alignItems:'center', justifyContent:'center' }]}>3</Text>
            <Text style={[styles.Header, styles.title, { textAlign: 'center',alignItems:'center', justifyContent:'center' }]}>15/03/24</Text>
          </View>
        </View>

        <View style={styles.headd}>
          <View style={styles.container}>
            {/*<Text style={[styles.sectionHeader, { flex: 1, padding: 3, borderTopLeftRadius: 5 }]}>MATERIA PRIMA:</Text>*/}
            {/*<Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>{datos[0].materiaPrima}</Text>*/}

            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>FECHA:</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>
              {formatFecha(hoy)}
            </Text>
          </View>

         {/*<View style={styles.container}>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>Patio:</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>{datos[0].patio}</Text>
          </View>*/}

          {/* <View style={styles.container}>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3, borderBottomLeftRadius: 5 }]}>Hora Tendido: {datos[0].hora_creacion}</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>Hora Recolección: {datos[datos.length - 1].hora_creacion}</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 0, borderBottomRightRadius: 5 }]}>Cantidad Recolectada</Text>
          </View>*/}

        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
             {/*<Text style={styles.tableCell}>Hora</Text>*/}
            <Text style={styles.tableCell}>Fecha C.C</Text>
            <Text style={styles.tableCell}>Horneado</Text>
            <Text style={styles.tableCell}>OK</Text>
            <Text style={styles.tableCell}>Reasignado</Text>
            <Text style={styles.tableCell}>Sin Tasa</Text>
            <Text style={styles.tableCell}>Alto</Text>
            <Text style={styles.tableCell}>Bajo</Text>
            <Text style={styles.tableCell}>R.CC</Text>
            <Text style={styles.tableCell}>R.H</Text>
            <Text style={styles.tableCell}>Desportillado</Text>
            <Text style={styles.tableCell}>Desportillado H.</Text>
            <Text style={styles.tableCell}>Ovalado</Text>
            <Text style={styles.tableCell}>Quemado H.</Text>
            <Text style={styles.tableCell}>Crudo CC</Text>
            <Text style={styles.tableCell}>Quemado</Text>
            <Text style={styles.tableCell}>Ahumado</Text>
            <Text style={styles.tableCell}>R. Horno</Text>
          </View>
          {pageData.map((fila, index) => (
          <View key={index} style={styles.tableRow}>
            {/*<Text style={styles.tableCell}>{fila.hora_creacion}</Text>*/}
            <Text style={styles.tableCell}>{formatFecha(fila.fechaCC || fila.fecha_creacion)}</Text>
            <Text style={styles.tableCell}>{fila.horneado || fila.horneados}</Text>
            <Text style={styles.tableCell}>{fila.aprobados}</Text>
            <Text style={styles.tableCell}>{fila.reasignado}</Text>
            <Text style={styles.tableCell}>{fila.sin_tasa}</Text>
            <Text style={styles.tableCell}>{fila.altos}</Text>
            <Text style={styles.tableCell}>{fila.bajos}</Text>
            <Text style={styles.tableCell}>{fila.rajadosCC}</Text>
            <Text style={styles.tableCell}>{fila.rajados_horno}</Text>
            <Text style={styles.tableCell}>{fila.desportillado}</Text>
            <Text style={styles.tableCell}>{fila.desportillado_horno}</Text>
            <Text style={styles.tableCell}>{fila.ovalado}</Text>
            <Text style={styles.tableCell}>{fila.quemados_horno}</Text>
            <Text style={styles.tableCell}>{fila.crudoCC}</Text>
            <Text style={styles.tableCell}>{fila.quemados}</Text>
            <Text style={styles.tableCell}>{fila.ahumados}</Text>
            <Text style={styles.tableCell}>{fila.mermas_hornos || fila.rajados_horno}</Text>
          </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>COMENTARIOS</Text>
          </View>
          <View style={styles.cardBody}>
           
            <Text style={styles.cardText}></Text>
          </View>
        </View>

        
        <View style={styles.firmas}>  
                                                    
       {FirmaEncargado  ?(<Image style={[styles.FirmasIMG]}  src={FirmaEncargado}></Image>):(<Text style={styles.lineas}> __________________________ </Text>)} 
       <Text></Text>
       {FirmaJefe ?(<Image style={styles.FirmasIMG}  src={FirmaJefe}/>):(<Text style={styles.lineas}> __________________________ </Text>)}
       
        </View>
        <View style={[styles.firmasText,{}]}>
          <Text style={[styles.firmasText,{}]}>Encargado de Secado</Text>
          <Text style={[styles.firmasText,{}]}>Jefe de Producción</Text>
        </View>
   
      </Page>);
    }

return pages;
  
};

return <Document>{createPages()}</Document>;}

const PdfROTHP = ({ datos, FirmaJefe, NombreJefe }) => {
  const [isOpen, setIsOpen] = useState(false);
console.log('Firma Jefe', FirmaJefe)

  const togglePDFViewer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    {datos.length>0 ?(<button className="btn" onClick={togglePDFViewer}><i className="bi bi-file-earmark-pdf"></i></button>):''}
      
      <Modal isOpen={isOpen} toggle={togglePDFViewer} size="lg">
        <ModalBody>
          <PDFViewer style={{ width: '100%', height: '80vh' }}>
            <MyDocument datos={datos} FirmaJefe={FirmaJefe} NombreJefe={NombreJefe} />
          </PDFViewer>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PdfROTHP;
