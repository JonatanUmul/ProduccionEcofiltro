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
    // border:'1px'<
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

const MyDocument = ({ dats,datos}) => {

    const UltimaFirma=dats[dats.length-1]
    const firmaJefe=datos[0].firmaJefe
    console.log('firma jefe',firmaJefe)
  const Firma= UltimaFirma?.firmaHornero || null
  const fechaCC=datos[0].fechaCC
  const tiempoTotal = (new Date(dats[dats.length - 1].hora_creacion) - new Date(dats[0].hora_creacion)) / (1000 * 60 * 60);  return( 
  <Document>
   
      <Page style={styles.page} >
        <View style={[styles.container,{justifyContent: 'center', textAlign:'center'}]}>
          <View style={[styles.titleContainer, { flex: 0.5, justifyContent: 'center' }]}>
            <Image source={{ uri: "/images/LoogoEco.png" }} style={styles.logo } />
          </View>
          <View style={[styles.titleContainer, { flex: 4,alignItems:'center', justifyContent:'center' }]}>
            <Text style={[styles.Header, styles.title,{textAlign:'center'}]}>GESTIÓN DE CALIDAD</Text>
            <Text style={[styles.Header, styles.title,{textAlign:'center'}]}>CONTROL DE TEMPERATURAS DE HORNO</Text>
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
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3, borderTopLeftRadius: 5 }]}>Fecha de Horneado:</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}> {formatFecha(datos[0].fechaHorneado)}</Text>

            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>Fecha Control de Calidad:</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>
              {fechaCC?(formatFecha(fechaCC)):''}
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>Horno:</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>{dats[0].horno}</Text>
          </View>

          <View style={styles.container}>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>Horneado:</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>{datos[0].horneado}</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>Aprobados:</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>{datos[0].aprobados}</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>% Aprobado:</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>{datos[0].porcentaje}</Text>

            </View>

          <View style={styles.container}>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3, borderBottomLeftRadius: 5 }]}>Hora Inicio: {dats[0].hora_creacion}</Text>
            <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>Hora Fin: {dats[dats.length - 1].hora_creacion}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Hora</Text>
            <Text style={styles.tableCell}>Cabeza Izquierda</Text>
            <Text style={styles.tableCell}>Pie Izquierdo</Text>
            <Text style={styles.tableCell}>Cabeza Derecha</Text>
            <Text style={styles.tableCell}>Pie Derecha</Text>
          </View>
          {dats.map((fila, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{fila.hora_creacion}</Text>
            <Text style={styles.tableCell}>{fila.tempCabezaIZ}</Text>
            <Text style={styles.tableCell}>{fila.tempPieIZ}</Text>
            <Text style={styles.tableCell}>{fila.tempCabezaDR}</Text>
            <Text style={styles.tableCell}>{fila.tempPieDR}</Text>
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
        {Firma  ?(<Image style={[styles.FirmasIMG]}  src={Firma}></Image>):(<Text style={styles.lineas}> __________________________ </Text>)} 
        <Text></Text>
        {firmaJefe ?(<Image style={styles.FirmasIMG}  src={firmaJefe}/>):(<Text style={styles.lineas}> __________________________ </Text>)}
        
         </View>
         <View style={[styles.firmasText,{}]}>
           <Text style={[styles.firmasText,{}]}>Encargado de Horno</Text>
           <Text style={[styles.firmasText,{}]}>Jefe de Producción</Text>
         </View>
   
      </Page>
    
  </Document>
  )
};

const PdfROTHP = ({ dats,datos }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePDFViewer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    {dats.length>0 ?(<button className="btn" onClick={togglePDFViewer}><i className="bi bi-file-earmark-pdf"></i></button>):''}
      
      <Modal isOpen={isOpen} toggle={togglePDFViewer} size="lg">
        <ModalBody>
          <PDFViewer style={{ width: '100%', height: '80vh' }}>
            <MyDocument dats={dats} datos={datos} />
          </PDFViewer>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PdfROTHP;
