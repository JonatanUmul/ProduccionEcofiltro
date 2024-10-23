import React, { useState } from 'react';
import { Button, Dropdown, Flex } from 'antd';
import { redirect } from 'react-router-dom';
import PlanificacionDiario from './PlanificacionDiario'
import CrearIsuues from './Issues'
import DashBoar from './DashBoard'
import Board from './Board'
const App = () => {
  const [item, setItem]=useState('')
const [abrir, setAbrir]=useState(false)
const [opcion, setOpcion]=useState(null)
const items = [
    {
      key: '1',
      label: 'Isuees',
      
    },
    {
      key: '2',
      label: 'Diario',
    },
    {
      key: '3',
      label: 'DashBoar',
    },
    
  ];
  
    const onMenuClick = (e, option) => {
      setOpcion(option)
        console.log(item)
      console.log('click', e);
      setItem(e.key)
      setAbrir(true)

      
    };
    console.log('Item capturado', item)
switch(item){
    case "1":
      return <CrearIsuues/> 
      
    case "2": 
        return <PlanificacionDiario/>
        
    case '3':
      return <DashBoar/>   


}

    return(
      
      <div>
          <Flex align="flex-start" gap="small" vertical>
       <Dropdown.Button
      menu={{
        items,
        onClick: onMenuClick,
      }}
      
    >
      Plan

    </Dropdown.Button>
  </Flex>
  </div>

)};
export default App;