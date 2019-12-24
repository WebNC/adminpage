import React from 'react';
import {  Layout } from 'antd';
import Logo from './Logo/index'
const {  Footer} = Layout;

class MyFooter extends React.PureComponent {
  
  render() {
    return (
      <Footer style={{ bottom: "0", backgroundColor: "#b8d8f2", color: "#0c6b94" }}>
        <div className="d-flex justify-content-center mb-2">
          <Logo size={90}/>
        </div>
        <div  style={{display: "flex", justifyContent: "space-between", padding: "0px 10%", marginTop: "10px"}}>
          <p style={{fontSize: "16px" }}>227 Nguyễn Văn Cừ, P4, Q5, Tp. Hồ Chí Minh</p>
          <p style={{fontSize: "16px" }}>0397350xxx</p>
          <p style={{fontSize: "16px",  }}>WebTeam@mail.com</p>
        </div>
      </Footer> 
    );
  }
}

export default MyFooter;