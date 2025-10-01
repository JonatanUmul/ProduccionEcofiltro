import React from 'react';
import { Alert } from 'antd';

const App = ({ error }) => {
  return (
    <div style={{ maxWidth: 600, margin: '5px' }}>
      {error && (
        <Alert 
          message="Información" 
          description={error}
          type="info" 
          showIcon 
          closable 
        />
      )}
    </div>
  );
};

export default App;
