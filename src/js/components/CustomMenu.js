/* eslint-disable*/
import '../../css/App.css';
import React, { useState } from "react";
import {Link } from 'react-router-dom';

import { Menu } from "antd";
import SubMenu from 'antd/es/menu/SubMenu';







function CustomMenu(props) {

  let items = props.items
  let colItems = props.colItems
  let collapsed = props.collapsed
  let isDarkMode = props.isDarkMode


  return (
    <div className="App" style={{backgroundColor : isDarkMode ? "#000000" : "#ffffff"}}>
        <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            //커스텀을 위해서 주석처리
            // items={items}
            onClick={(v)=>{
                console.log(v)
                let cp = [...props.keyPath]
                cp[0] = v.keyPath[1]
                cp[1] = v.keyPath[0]
                props.setKeyPath(cp)
            }}
            >
            
            {/* 메뉴 커스텀 코드 */}
            {
                collapsed ? (

                // 메뉴 축소 시    
                colItems.map((sub)=>(
                    <SubMenu
                    key={sub.key}
                    icon={sub.icon}
                    title={sub.label}
                    >

                    
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
                            <Link 
                                to={`/${g.label}/${i.label}`}
                                key={`_${i.key}`}
                            >
                                {i.label}
                            </Link>
                            

                            </Menu.Item>
                        )))}
                        </Menu.ItemGroup>
                    ))}
                    
                    </SubMenu>
                ))

                ) : (

                // 메뉴 확장 시
                items.map((sub)=>(
                    <SubMenu
                    key={sub.key}
                    icon={sub.icon}
                    title={sub.label}
                    type={sub.type}
                    >
                    {sub.children.map((i)=>(
                        <Menu.Item
                        key={i.key}
                        >
                        <Link 
                            to={`/${sub.label}/${i.label}`}
                            key={`_${i.key}`}
                        >
                            {i.label}
                        </Link>
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
  );
}

export default CustomMenu;
