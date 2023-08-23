/* eslint-disable*/
import '../../css/App.css';
import React from "react";
import CustomProTable from '../table';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';


function CustomPage(props) {
    return (
    <div className='table'>
        <div className='table-header'>
            <h2 style={{color : props.isDarkMode ? "#ffffff" : "#000000"}}>
                {props.keyPath[1]}
            </h2>
            <div>
            <Breadcrumb
                items={[
                {
                    href: '',
                    title: <HomeOutlined />,
                },
                {
                    href: '',
                    title: props.keyPath[0],
                },
                {
                    title: props.keyPath[1],
                },
                ]}
            />
            </div>
        </div>
        <hr style={{background : props.isDarkMode ? "#444444" : "#000000"}}/>
        <CustomProTable/>
    </div>
  );
}

export default CustomPage;