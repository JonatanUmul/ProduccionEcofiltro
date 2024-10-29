import React, { useEffect } from 'react';
import { Flex, Progress } from 'antd';

const App = ({Issue}) => {

    const porcentaje=(Issue.producido/Issue.cantidad_planificada)*100
console.log(porcentaje)
    return(
  <Flex  style={{display:'flex', justifyContent:'center', marginTop:'5px'}}>
     <Progress wrap gap="small" type="circle" percent={ Math.floor(porcentaje)}  />
 {/* <Progress type="circle" percent={porcentaje} size={80} />     <Progress type="circle" percent={70} size={80} status="exception" /> */}
    {/*<Progress type="circle" percent={100} size={80} /> */}
  </Flex>
    )
};
export default App;