import React, { useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';
import db from './db.json';

const newArrData = db.map((v,i) => {
        let dataSource = {};
        dataSource['key'] = i;
        dataSource['name'] = v.Name;
        dataSource['userId'] = v.ID;
        return dataSource
    }
)

const columns=[
    {
        title: '이름',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '사용자 아이디',
        dataIndex: 'userId',
        key: 'userId'
    }
]

// const dataSource =[
//     {
//         key: '1',
//         name: 'First'
//     },
//     {
//         key: '2',
//         title: 'Second'
//     }
// ]

const CustomProTable = () => {
    return(
        <ConfigProvider locale={koKR}>
            <ProTable
            columns={columns}
            dataSource={newArrData}
            rowKey={"key"}
            />
        </ConfigProvider>
    )
}

export default CustomProTable;