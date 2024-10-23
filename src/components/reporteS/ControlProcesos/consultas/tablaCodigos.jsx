import React, { useState, useRef, useEffect } from 'react';
import { Button, Drawer, Space, Input, Table, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const App = ({ datos }) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [estadoCrudo, setestadoCrudo] = useState([]); // Estado para almacenar los filtros de municipio
const[estadouf, setestadouf]=useState([])
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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

  useEffect(() => {
    // Actualizar los filtros de municipio
    const filters = [...new Set(datos.map((estadoCrudo) => estadoCrudo.estadoCrudo))].map(estadoCrudo => ({
      text: estadoCrudo,
      value: estadoCrudo,
    }));
    setestadoCrudo(filters);
  }, [datos]);

  useEffect(() => {
    // Actualizar los filtros de municipio
    const filters = [...new Set(datos.map((estadouf) => estadouf.estadouf))].map(estadouf => ({
      text: estadouf,
      value: estadouf,
    }));
    setestadouf(filters);
  }, [datos]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0] || ''}
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
    onFilter: (value, record) => {
      console.log('Filtering:', value, record[dataIndex]); // Depuración
      return record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase());
    },
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
      title: 'Codigo',
      dataIndex: 'codigos',
      key: 'codigos',
      width: '10%',
      
      ...getColumnSearchProps('codigos'),
      
      render: (text) => <a style={{ fontSize: '11px', textAlign: 'center' }}>{text}</a>,
    },
    {
      title: 'Estado Crudo',
      dataIndex: 'estadoCrudo',
      key: 'estadoCrudo',
      filters: estadoCrudo,
      // ...getColumnSearchProps('estadoCrudo'),
      
      onFilter: (value, record) => {
        if (value!=null && value.length > 0) {
          // Verifica si record.estadoCrudo no es nulo o indefinido antes de llamar a includes
          return record.estadoCrudo && typeof record.estadoCrudo === 'string' && record.estadoCrudo.includes(value);
        }
        // Si el valor es vacío o nulo, retorna true para no filtrar
        return true;
      },

      render: (text) => <span style={{ fontSize: '11px', textAlign: 'center' }}>{text}</span>,
    },
    {
      title: 'Tasa',
      dataIndex: 'tasa',
      key: 'tasa',
      ...getColumnSearchProps('tasa'),
      render: (text) => <span style={{ fontSize: '11px', textAlign: 'center' }}>{text}</span>,
    },
    {
      title: 'Temperatura',
      dataIndex: 'promedio',
      key: 'promedio',
      ...getColumnSearchProps('promedio'),
      render: (text) => <span style={{ fontSize: '11px', textAlign: 'center' }}>{text}</span>,
    },
    {
      title: 'Estado C.c',
      dataIndex: 'estadouf',
      key: 'estadouf',
      filters: estadouf,
      onFilter: (value, record) => {
        console.log(typeof record.estadouf)
        if (value!=null && value.length >= 0) {
          // Verifica si record.estadoCrudo no es nulo o indefinido antes de llamar a includes
          return record.estadouf && typeof record.estadouf === 'string' && record.estadouf.includes(value);
        }
        // Si el valor es vacío o nulo, retorna true para no filtrar
        return false;
      },

      render: (text) => <span style={{ fontSize: '11px', textAlign: 'center' }}>{text}</span>,
    }
  ];

  return  (
    <div>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Codigos
        </Button>
      </Space>
      <Drawer
        title="Códigos"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        width={600}
        maskClosable={false}
        key={placement}
        style={{ backgroundColor: '#000', color: '#fff' }}
        bodyStyle={{ backgroundColor: '#333', color: '#fff' }}
        headerStyle={{ backgroundColor: '#000', color: '#fff' }}
        extra={
          <Button onClick={onClose} style={{ color: '#fff' }}>
            Cerrar
          </Button>
        }
      >
        <Divider />
        {datos.length > 0 ? (
          <Table
            columns={columns}
            dataSource={datos}
            pagination={false}
            size="small"
            rowKey="codigos" // Asegúrate de que cada fila tenga una clave única
          />
        ) : (
          <div>Cargando...</div>
        )}
      </Drawer>
    </div>
  );
};

export default App;
