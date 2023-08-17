/* eslint-disable*/
import '../css/App.css';
import React, { useState } from "react";
import ResourceUser from './pages/User';

import menuData from '../data/menu.json'

import koKR from 'antd/lib/locale/ko_KR';
import { ConfigProvider, theme, Button, Card,Switch,Menu } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  HistoryOutlined
} from '@ant-design/icons';


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const iconList = [<DesktopOutlined />,<TeamOutlined />,<ContainerOutlined />,<HistoryOutlined />,<AppstoreOutlined />]

const setItems = ()=>{
  let itemsArr=[]
  let cnt = 0
  for (let [k, v] of Object.entries(menuData.Children)) {
    if (v.Show == true){
      let subArr = []

      for (let [ck,cv] of Object.entries(v.Children)){
        if(cv.Show == true){
          let sub_itm = getItem(ck,ck)
          subArr.push(sub_itm)
        }
      }
      let itm = getItem(k,k,iconList[cnt-1],subArr)
      itemsArr.push(itm)
    }
    cnt++
  }

  return itemsArr
}



function App() {
  let items = setItems()
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [keyPath, setKeyPath] = useState(['','']);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  }

  // 메뉴를 위한 부분
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="App" style={{backgroundColor : isDarkMode ? "#000000" : "#ffffff"}}>
      <div className='body'>
        <ConfigProvider locale={koKR} theme={{
            algorithm : isDarkMode ? darkAlgorithm : defaultAlgorithm
            }}>

            <div className="head-space">
              <div className="header" style={{backgroundColor : isDarkMode ? "#141414" : "#1C71C4"}}>
                <div className='btn-menu'>
                  <Button
                    type="primary"
                    onClick={toggleCollapsed}
                  >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </Button>
                </div>
                <h1>Acra Point</h1>
                <Card className="color-card" style={{backgroundColor : isDarkMode ? "#141414" : "#1C71C4", border:'none'}}>
                  <h4 style={{color:"white"}}>Go {isDarkMode ? "Light":"Dark"}</h4>
                  <Switch onClick={handleClick}/>   
                </Card>
              </div>
            </div>
            
            <div className='main'>
              {/* 메뉴부분 */}
              <div className='menu'>
                <Menu
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={(v)=>{
                      let cp = [...keyPath]
                      cp[0] = v.keyPath[1]
                      cp[1] = v.keyPath[0]
                      setKeyPath(cp)
                    }}
                  />
              </div>

              <ResourceUser keyPath={keyPath} isDarkMode={isDarkMode}/>
              

              <div className='blank'></div>
            </div>
        </ConfigProvider>
      </div>
      
    </div>
  );
}

export default App;
