/* eslint-disable*/
import './App.css';
import React, { useState } from "react";
import { ConfigProvider, theme, Button, Card,Switch } from "antd";
import koKR from 'antd/lib/locale/ko_KR';
import CustomProTable from './table';
// import Sidebar from './Sidebar';
import { FiMenu } from "react-icons/fi";




function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [side,setSide] = useState(false);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  }

  return (
    <div className="App" style={{backgroundColor : isDarkMode ? "#000000" : "#ffffff"}}>
      <div className='body'>
        <ConfigProvider locale={koKR} theme={{
            algorithm : isDarkMode ? darkAlgorithm : defaultAlgorithm
            }}>

            <div className="head-space">
              <div className="header" style={{backgroundColor : isDarkMode ? "#141414" : "#1C71C4"}}>
                <h1 className='side-icon'>
                  <FiMenu onClick={()=>{
                    side == false ? setSide(true) : setSide(false)
                  }}/>
                </h1>
                <h1>Acra Point</h1>
                <Card className="color-card" style={{backgroundColor : isDarkMode ? "#141414" : "#1C71C4", border:'none'}}>
                  <h4 style={{color:"white"}}>Go {isDarkMode ? "Light":"Dark"}</h4>
                  <Switch onClick={handleClick}/>   
                </Card>
              </div>
            </div>
            
            <div className='main'>
              <div className='blank'></div>
                {/* {
                  side == true ? <div className='side-bar'><Sidebar/></div>: null
                } */}
              <div className='table'>
                <CustomProTable/>
              </div>
              <div className='blank'></div>
            </div>
        </ConfigProvider>
      </div>
      
    </div>
  );
}

export default App;
