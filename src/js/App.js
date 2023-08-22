/* eslint-disable*/
import '../css/App.css';
import React, { useState } from "react";
import ResourceUser from './pages/User';

import menuData from '../data/menu.json'

import koKR from 'antd/lib/locale/ko_KR';
import { ConfigProvider, theme, Button, Card, Switch, Menu, Popover, ItemGroup } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/es/menu/SubMenu';


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
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

const setItemsCol = ()=>{
  let itemsArr=[]
  let cnt = 0
  for (let [k, v] of Object.entries(menuData.Children)) {
    if (v.Show == true){
      let subArr = []
      let subArr2 = []
      for (let [ck,cv] of Object.entries(v.Children)){
        if(cv.Show == true){
          let sub_itm = getItem(ck,ck)
          subArr2.push(sub_itm)
        }
      }

      let itmArr = []
      let itm2 = getItem(k,`${k}_${cnt}`,null,subArr2,'group')
      itmArr.push(itm2)

      let itm = getItem(k,k,iconList[cnt-1],itmArr)
      itemsArr.push(itm)
    }
    cnt++
  }

  return itemsArr
}



function App() {
  let items = setItems()
  let colItems = setItemsCol()
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
                <h1>ACRA Point</h1>
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
                  //커스텀을 위해서 주석처리
                  // items={items}
                  onClick={(v)=>{
                    console.log(v)
                    let cp = [...keyPath]
                    cp[0] = v.keyPath[1]
                    cp[1] = v.keyPath[0]
                    setKeyPath(cp)
                  }}
                >
                  
                  {/* 메뉴 커스텀 코드 */}
                  {
                    collapsed ? (
                      colItems.map((sub)=>(
                        <SubMenu
                          key={sub.key}
                          icon={sub.icon}
                          title={sub.label}
                        >
                          {/* 메뉴 축소 시 */}
                          {sub.children.map((g)=>(
                            <Menu.ItemGroup
                              title={
                                <div style={{
                                  color: isDarkMode ? 'white':'black',
                                  fontWeight:700
                                }}>
                                  {g.label}
                                </div>
                              }
                              key={g.key}
                            >
                              {g.children.map((i=>(
                                <Menu.Item
                                  label={i.label}
                                  key={i.key}
                                >
                                  {i.label}
    
                                </Menu.Item>
                              )))}
                            </Menu.ItemGroup>
                          ))}
                          
                        </SubMenu>
                      ))

                    ) : (
                      items.map((sub)=>(
                        <SubMenu
                          key={sub.key}
                          icon={sub.icon}
                          title={sub.label}
                          type={sub.type}
                        >
                          {/* 메뉴 확장 시 */}
                          {sub.children.map((i)=>(
                            <Menu.Item
                              key={i.key}
                            >
                              {i.label}
                            </Menu.Item>
                          )
                          )}
                          
                        </SubMenu>
                      ))
                    )
                  }
                  {/* 메뉴 커스텀 코드 */}

                </Menu>
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
