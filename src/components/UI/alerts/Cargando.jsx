import React from 'react';
import { Alert, Flex, Spin } from 'antd';
const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;
const App = () => (
  <Flex gap="middle" vertical>
   {/* <Flex gap="middle">
      <Spin description="Loading" size="small">
        {content}
      </Spin>
      <Spin description="Loading">{content}</Spin>
      <Spin description="Loading" size="large">
        {content}
      </Spin>
    </Flex>
    */}
    <Spin description="Loading...">
      <Alert
        title="Alert message title"
        description="Creando las series, por favor no actualices ni cierres la ventana"
        type="info"
      />
    </Spin>
  </Flex>
);
export default App;