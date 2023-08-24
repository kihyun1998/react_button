/* eslint-disable*/
import '../css/App.css';
import CustomHome from './components/CustomHome';
import CustomPage from './components/CustomPage';
import CustomMenu from './components/CustomMenu';
import menuData from '../data/menu.json'
import React, { useState } from "react";
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';



import koKR from 'antd/lib/locale/ko_KR';
import { ConfigProvider, theme, Button, FloatButton } from "antd";
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
    HistoryOutlined
} from '@ant-design/icons';
import { MdDarkMode,MdOutlineLightMode } from "react-icons/md";




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
        if (v.Show === true){
        let subArr = []
        for (let [ck,cv] of Object.entries(v.Children)){
            if(cv.Show === true){
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
        if (v.Show === true){
        let subArr = []
        let subArr2 = []
        for (let [ck,cv] of Object.entries(v.Children)){
            if(cv.Show === true){
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

    let localIsDarkMode = JSON.parse(localStorage.getItem('isDarkMode'))
    console.log(typeof localIsDarkMode)
    
    const [keyPath, setKeyPath] = useState(['',''])
    
    // 다크모드 갈지말지
    const [isDarkMode, setIsDarkMode] = useState(localIsDarkMode===null ? false : localIsDarkMode)
    const toggleDark = () => {
        localStorage.setItem('isDarkMode',!isDarkMode)
        setIsDarkMode((previousValue) => !previousValue)
    }
    const { defaultAlgorithm, darkAlgorithm } = theme
    
    // 메뉴를 위한 부분
    const [collapsed, setCollapsed] = useState(false)
    const toggleCollapsed = () => {
        setCollapsed((previousValue) => !previousValue)
    };
    
    return (
        <div className="App" style={{backgroundColor : isDarkMode ? "#000000" : "#ffffff"}}>
            <div className='body'>
                
                <ConfigProvider locale={koKR} theme={{
                algorithm : isDarkMode ? darkAlgorithm : defaultAlgorithm
                }}>
                    <FloatButton
                    icon={ isDarkMode ? <MdOutlineLightMode/> : <MdDarkMode/>}
                    onClick={toggleDark}
                    />
                    <BrowserRouter>
                        <div className="head-space">
                            <div className="header" style={{backgroundColor : isDarkMode ? "#141414" : "#1C71C4"}}>
                                <div className='btn-area'>
                                <div className='btn-menu'>
                                    <Button
                                    type="primary"
                                    onClick={toggleCollapsed}
                                    style={{
                                        marginLeft : collapsed ? "5.5em" : "18em"
                                    }}
                                    >
                                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    </Button>
                                </div>

                                </div>
                                <Link to={`/`} className='home-link'>
                                    <h1>ACRA Point</h1>
                                </Link>
                                
                                <div className="color-card"></div> 
                            </div>
                        </div>
                    
                    
                        <div className='main'>
                            {/* 메뉴부분 */}
                            <div className='menu'>
                                <CustomMenu items={items} colItems={colItems} keyPath={keyPath} setKeyPath={setKeyPath} isDarkMode={isDarkMode} collapsed={collapsed}></CustomMenu>
                            </div>
                            <div className='table'>
                            <Routes>
                                <Route path="/" exact element={<CustomHome></CustomHome>}></Route>
                                <Route path="/access/accessEvent" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/access/accessNodeSession" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/access/accessAdminSession" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/access/accessUserSession" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/resource/resourceAdmin" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/resource/resourceUser" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/resource/resourceNode" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/policy/policyToken" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/policy/policyAccessControl" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/policy/policyLifecycle" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/history/historyRequest" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/history/historyLifecycle" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/config/configProcess" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/config/configGlobalSetting" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/config/configClass" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                                <Route path="/config/configInboxNotice" element={<CustomPage keyPath={keyPath} isDarkMode={isDarkMode}/>}></Route>
                            </Routes>
                            </div>

                            <div className='blank'></div>
                        </div>
                    </BrowserRouter> 
                </ConfigProvider>
            </div>
            
        </div>
    );
}

export default App;
