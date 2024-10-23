import React, { useState, useEffect, useRef } from 'react';
import { DatePicker, Button, Input, Space, Table, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import Highlighter from 'react-highlight-words'; // Importa el Highlighter para resaltar texto en la búsqueda
import './estiloTabla.css';

const { RangePicker } = DatePicker;
const URL = process.env.REACT_APP_URL;

const TablaDTH = ({ id }) => {
  const [fila, setfila] = useState([]); // Estado para almacenar los datos de la tabla
  const [filteredData, setFilteredData] = useState([]); // Estado para almacenar los datos filtrados
  const [selectedDates, setSelectedDates] = useState(null); // Estado para almacenar las fechas seleccionadas
  const [searchText, setSearchText] = useState(''); // Estado para almacenar el texto de búsqueda
  const [searchedColumn, setSearchedColumn] = useState(''); // Estado para almacenar la columna buscada
  const [departmentFilters, setDepartmentFilters] = useState([]); // Estado para almacenar los filtros de departamento
  const [horno, sethorno] = useState([]); // Estado para almacenar los filtros de municipio
  const searchInput = useRef(null); // Referencia al input de búsqueda para el filtro

  useEffect(() => {
    // Obtener datos de la API al cargar el componente
    axios.get(`${URL}/DTH/${id}`)
      .then((response) => {
        setfila(response.data.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error.message);
      });
  }, [id]); // Se ejecuta solo cuando cambia el ID

console.log(fila)

  useEffect(() => {
    // Actualizar los filtros de departamento
    const filters = [...new Set(fila.map((departamento) => departamento.dep))].map(dep => ({
      text: dep,
      value: dep,
    }));
    setDepartmentFilters(filters);
  }, [fila]);

  useEffect(() => {
    // Actualizar los filtros de municipio
    const filters = [...new Set(fila.map((horno) => horno.horno))].map(horno => ({
      text: horno,
      value: horno,
    }));
    sethorno(filters);
  }, [fila]);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
   
    {
      title: 'Hora',
      dataIndex: 'hora_creacion',
      key: 'hora_creacion',
      width: '10%',
      ...getColumnSearchProps('hora_creacion'),
      render: (text, record) => <a style={{ fontSize: '11px', textAlign:'center' }}>{text}</a>,
    },
    {
      title: 'Modelo',
      dataIndex: 'modelo',
      key: 'modelo',
      ...getColumnSearchProps('modelo'),
      render: (text) => <span style={{ fontSize: '11px', padding: 0, textAlign:'center' }}>{text}</span>,
    },
    {
      title: 'Horno',
      dataIndex: 'horno',
      key: 'horno',
      filters: horno,
      onFilter: (value, record) => record.horno.includes(value),
      render: (text) => <span style={{ fontSize: '11px' , textAlign:'center'}}>{text}</span>,
    },
    {
      title: 'Cabeza Iz',
      dataIndex: 'tempCabezaIZ',
      key: 'tempCabezaIZ',
      render: (text) => <span style={{ fontSize: '11px', textAlign:'center' }}>{text}</span>,
    },
     
    {
      title: 'Pie Iz',
      dataIndex: 'tempPieIZ',
      key: 'tempPieIZ',
      // ...getColumnSearchProps('tempPieIZ'),
      render: (text) => <span style={{ fontSize: '11px' , textAlign:'center'}}>{text}</span>,
    },
    {
      title: 'Cabeza Dr',
      dataIndex: 'tempCabezaDR',
      key: 'tempCabezaDR',
      // ...getColumnSearchProps('tempCabezaDR'),
      render: (text) => <span style={{ fontSize: '11px', textAlign:'center' }}>{text}</span>,
    },
    {
      title: 'Pie Dr',
      dataIndex: 'tempPieDR',
      key: 'tempPieDR',
      // ...getColumnSearchProps('tempPieDR'),
      render: (text) => <span style={{ fontSize: '11px', textAlign:'center' }}>{text}</span>,
    },
    {
      title: 'Promedio',
      dataIndex: 'promedio',
      key: 'promedio',
      // ...getColumnSearchProps('promedio'),
      render: (text) => <span style={{ fontSize: '11px', color:'red ' }}>{text}</span>,
    },
 
  ];

  return (
    <div>
      <Divider></Divider>
    
      {fila.length > 0 ? (
        <Table
          columns={columns}
          dataSource={fila}
          pagination={{ pageSize: 15 }}
          size="small"
        />
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default TablaDTH;
