import React from 'react'
import {Layout} from 'antd';
const { Footer } = Layout;

const FooterMenu = () => {
  return (
   <Footer className="text-center"
        >
          Quantum ©{new Date().getFullYear()} Created by Jonatan Umul
        </Footer> 
  )
}

export default FooterMenu