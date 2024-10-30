import React from 'react';
import { Button, Result } from 'antd';
const App = () => (
  <Result
    status="403"
    title="403"
    subTitle="Lo sentimos, no estás autorizado a acceder a esta página."
    // extra={<Button type="primary">Back Home</Button>}
  />
);
export default App;