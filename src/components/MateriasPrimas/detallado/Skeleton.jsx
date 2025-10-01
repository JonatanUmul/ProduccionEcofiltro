import React, { useState } from 'react';
import { DotChartOutlined } from '@ant-design/icons';
import { Flex, Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';
const App = ({active}) => {

  console.log('activa skeleton',active)
  const [block, setBlock] = useState(false);
  const [size, setSize] = useState('default');
  const [buttonShape, setButtonShape] = useState('default');
  const [avatarShape, setAvatarShape] = useState('circle');
 
  const handleBlockChange =  activar=> {
    setBlock(activar);
  };
  const handleSizeChange = e => {
    setSize(e.target.value);
  };
  const handleShapeButton = e => {
    setButtonShape(e.target.value);
  };
 
  return (
    <Flex gap="middle" vertical>
      <Space>
        <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
        
        <Skeleton.Input active={active} size={size} />
      </Space>
      <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
      <Skeleton.Input active={active} size={size} block={block} />
    
      <Divider />
   
    </Flex>
  );
};
export default App;