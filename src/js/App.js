/* eslint-disable*/
import '../css/App.css';
import React, { useState } from "react";
import { ConfigProvider, theme, Button, Card,Switch,Menu } from "antd";
import koKR from 'antd/lib/locale/ko_KR';
import CustomProTable from './table';
import menuData from '../data/menu.json'

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

// const items = [
//   getItem('Access', 'access', <DesktopOutlined />),
//   getItem('Option 3', '3', <ContainerOutlined />),
//   getItem('Navigation One', 'sub1', <MailOutlined />, [
//     getItem('Option 5', '5'),
//     getItem('Option 6', '6'),
//     getItem('Option 7', '7'),
//     getItem('Option 8', '8'),
//   ]),
//   getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),
//     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
//   ]),
// ];

const iconList = [<DesktopOutlined />,<TeamOutlined />,<ContainerOutlined />,<HistoryOutlined />,<AppstoreOutlined />]

const setItems = ()=>{
  let itemsArr=[]
  let cnt = 0
  for (let [k, v] of Object.entries(menuData.Children)) {
    if (v.Show == true){
      let subArr = []
      let subCnt = 0
      for (let [ck,cv] of Object.entries(v.Children)){
        if(cv.Show == true){
          let sub_itm = getItem(ck,`sub_${cnt}${subCnt}`)
          subArr.push(sub_itm)
        }
        subCnt++
      }
      console.log(k,cnt-1)
      let itm = getItem(k,cnt-1,iconList[cnt-1],subArr)
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
                    defaultSelectedKeys={['0']}
                    defaultOpenKeys={['sub_0']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                  />
              </div>
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
