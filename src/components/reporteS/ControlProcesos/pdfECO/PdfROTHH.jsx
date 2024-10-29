import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image, pdf  } from '@react-pdf/renderer';
import { formatFecha } from '../../../utilidades/FormatearFecta';
import { Modal, ModalBody, Button } from 'reactstrap';
import { saveAs } from 'file-saver';
// Estilos para el PDF
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
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
    textAlign:'center'

  },
  cardText: {
    fontSize: 12,
    marginBottom: 10,
  },
  container: {
    marginVertical:0,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderWidth: 0,
    marginBottom:0,
    marginLeft:0,
    marginTop:0,
    textAlign:'center'
  },

  title: {
    padding: 8, 
    // marginVertical:0,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    borderWidth: 0.5,
    flex: 1,
    padding: 8,
    marginBottom:0,
    marginTop:-0.5,
    marginLeft:-0.5,
    marginRight:1

  },

  sectionColumn: {
    flexDirection: 'column',
  },
  sectionHeader: {
    flex:2,
    padding:3,
    maxHeight: '100%',
    // marginHorizontal: 0,
    borderWidth: 0.5,
    // flexDirection: 'column',
    fontWeight: 'bold',
    // borderBottomColor: 'black',
    // borderBottomWidth: 0.5,
    fontSize: 8,
    marginBottom:0,
    marginTop:-0.2,
    marginLeft:-0.2,
    marginRight:0
  },
  page: {
    marginTop:20,
    flexDirection: 'column',
    padding: 40,
  },
  table: {
    width: '100%',
    marginTop: 10,
    marginBottom:20,
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
    borderWidth: 0.2,
  },
  tableCell: {
    fontSize: 8,
    borderColor: 'black',
    borderWidth: 0.2,
    textAlign: 'center',
    borderStyle: 'solid',
    padding: 3,
    flex: 1,
  },
  tablefirma:{
    borderColor: 'black',
    borderWidth: 0.2,
    textAlign: 'center',
    borderStyle: 'solid',
    padding: 3,
    flex: 1,
    height:'25'
  },
  text: {
    marginLeft: 2,
    textAlign:'center'
  },
  logo: {
    marginHorizontal: 0
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
  datodFirmas:{
    marginTop:'5%',
    flexDirection:'row'
  
  },
  lineas: {
    fontSize: 8,
    textAlign:'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -5,
    marginRight: 50 // Ajuste para evitar que las líneas se superpongan
  },
  FirmasIMG:{
    width:'15%',
    height:'100%',
    borderBottom:'1px solid black',
    justifyContent:'space-between',
    flexDirection:'row',
   resizeMode: 'contain',
  },
  firmasText:{
    flexDirection: 'row',
    justifyContent: 'space-around',

    fontSize:10,
    

  },
});

const MyDocument = ({ datos }) => {
  console.log('datos en datos ', datos)
  
  const UltimaFirma = datos[datos.length - 1];
  const FirmaJefe = UltimaFirma?.firmaJefe || null;

  // Verifica que datos tenga elementos y extrae firmaEncargado

  const rowsPerPage = 15; // Ajusta esto según sea necesario
  const totalPages = Math.ceil(datos.length / rowsPerPage);

  const createPages = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      const start = i * rowsPerPage;
      const end = start + rowsPerPage;
      const pageData = datos.slice(start, end);

      pages.push(
        <Page style={styles.page} key={i}>
          <View style={[styles.container, { textAlign: 'center' }]}>
            <View style={[styles.titleContainer, { flex: 0.7 }]}>
              <Image source="/images/LoogoEco.png" style={[styles.logo, styles.section, styles.title]} />
            </View>

            <View style={[styles.titleContainer, { flex: 4 }]}>
              <Text style={[styles.title]}>GESTIÓN DE CALIDAD</Text>
              <Text style={[styles.title]}>CONTROL FORMULACIÓN PESADO DE ASERRÍN</Text>
            </View>

            <View style={[styles.titleContainer, { flex: 1 }]}>
              <Text style={[styles.title]}>CODIGO:</Text>
              <Text style={[styles.title]}>VERSIÓN:</Text>
              <Text style={[styles.title]}>EMISION:</Text>
            </View>

            <View style={[styles.titleContainer, { flex: 1 }]}>
              <Text style={[styles.title]}>PRO-FOR</Text>
              <Text style={[styles.title]}>3</Text>
              <Text style={[styles.title]}>15/03/24</Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>Fecha</Text>
              <Text style={styles.tableCell}>Modelo</Text>
              <Text style={styles.tableCell}>Horno</Text>
              <Text style={styles.tableCell}>Horneado</Text>
              <Text style={styles.tableCell}>Mermas</Text>
              <Text style={styles.tableCell}>Aserrín</Text>
              <Text style={styles.tableCell}>Aprobados</Text>
              <Text style={styles.tableCell}>%Aprobado</Text>
              <Text style={styles.tableCell}>Firma</Text>
            </View>
            {pageData.map((fila, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{formatFecha(fila.fechaHorneado)}</Text>
                <Text style={styles.tableCell}>{fila.ModeloEco}</Text>
                <Text style={styles.tableCell}>{fila.Horno}</Text>
                <Text style={styles.tableCell}>{fila.horneado}</Text>
                <Text style={styles.tableCell}>{fila.mermasCrudas}</Text>
                <Text style={styles.tableCell}>{fila.librasAserrin}/{fila.librasAserrin2}</Text>
                <Text style={styles.tableCell}>{fila.aprobados}</Text>
                <Text style={styles.tableCell}>{Number(fila.porcentaje)}</Text>
                {fila.FirmaEncargado ? (
                  <Image style={styles.tablefirma} source={fila.FirmaEncargado} />
                ) : (
                  <Text style={styles.tableCell}>Sin Firma</Text>
                )}
                
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <View style={[styles.cardHeader]}>
              <Text style={styles.cardTitle}>COMENTARIOS</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardText}></Text>
            </View>
          </View>

          <View style={styles.firmas}>
            {FirmaJefe ? (
              <Image style={styles.FirmasIMG} source={FirmaJefe} />
            ) : (
              <Text style={styles.lineas}> __________________________ </Text>
            )}
          </View>
          <View style={styles.firmasText}>
            <Text>Jefe de Producción</Text>
          </View>
        </Page>
      );
    }
    return pages;
  };

  return <Document>{createPages()}</Document>;
};

const PdfROTHP = ({ datos }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePDFViewer = () => {
    setIsOpen(!isOpen);
  };

  const downloadPDF = async () => {
    const doc = <MyDocument datos={datos} />;
    const asPdf = pdf([]);
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, 'document.pdf');
  };

  return (
    <div>
      <button className="btn" onClick={togglePDFViewer}>
        <i className="bi bi-file-earmark-pdf"></i>
      </button>
      <button className="btn" onClick={downloadPDF}>
        Descargar PDF
      </button>
      <Modal isOpen={isOpen} toggle={togglePDFViewer} size="xl">
        <div style={{ position: 'absolute', top: '10px', right: '20px', zIndex: 1 }}>
          <Button close className="btn-close" onClick={togglePDFViewer} style={{ color: 'black', fontSize: '24px' }} />
        </div>
        <ModalBody style={{ margin: 0, padding: 0 }}>
          <PDFViewer width="100%" height="700">
            <MyDocument datos={datos} />
          </PDFViewer>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PdfROTHP;