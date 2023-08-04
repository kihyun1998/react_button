import React, { useState } from "react";
import dayjs from 'dayjs';
import { ProTable } from '@ant-design/pro-components';
import { ConfigProvider, theme, Button, Card } from "antd";
import koKR from 'antd/lib/locale/ko_KR';

import db from './db.json';
import CustomRangePicker from './CustomRangePicker';


const timeChange = (time) =>{
    let newTime = dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss');
    return newTime
}


const dataSource = db.map((v,i) => {
        let data = {};
        data['key'] = i;
        data['name'] = v.Name;
        data['userId'] = v.ID;
        data['userClassName'] = v.UserClass_Name;
        data['status'] = v.Status;
        data['IPAddress'] = typeof v.EasyAccessAddresses === "undefined" ? '-' : v.EasyAccessAddresses[0].IPAddress;
        data['ou'] = v.OU;
        data['title'] = v.Title;
        data['email'] = v.Mail;
        data['timeclass'] = typeof v.TimeClass === "undefined" ? '-' : v.TimeClass.Name;
        data['easyAccessLastAccessTimestamp'] = v.EasyAccessLastAccessTimestamp === 0 ? '-' : timeChange(v.EasyAccessLastAccessTimestamp);
        data['passwordLastChangedTimestamp'] = v.PasswordLastChangedTimestamp === 0 ? '-' : timeChange(v.PasswordLastChangedTimestamp);

        return data
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
    },
    {
        title: '사용자 폴더',
        dataIndex: 'userClassName',
        key: 'userClassName'
    },
    {
        title: '상태',
        dataIndex: 'status',
        key: 'status',
        initialValue : 'all',
        valueEnum:{
            true : {text:'정상', status: 'Success'},
            false : {text:'잠김', status: 'Error'}
        }
    },
    {
        title: '접속 로그인 주소',
        dataIndex: 'IPAddress',
        key: 'IPAddress'
    },
    {
        title: '조직',
        dataIndex: 'ou',
        key: 'ou'
    },
    {
        title: '직함',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: '이메일',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: '시간 유형',
        dataIndex: 'timeclass',
        key: 'timeclass'
    },
    {
        title: '접속기 로그인 성공 시간',
        dataIndex: 'easyAccessLastAccessTimestamp',
        key: 'easyAccessLastAccessTimestamp',
        renderFormItem:() => {
            return(
                <CustomRangePicker/>
            )
        }
    },
    {
        title: '비밀번호 변경 시간',
        dataIndex: 'passwordLastChangedTimestamp',
        key: 'passwordLastChangedTimestamp',
        renderFormItem:() => {
            return(
                <CustomRangePicker/>
            )
        }
    }
]

const CustomProTable = () => {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleClick = () => {
        setIsDarkMode((previousValue) => !previousValue);
    }


    return(
        <ConfigProvider locale={koKR} theme={{
            algorithm : isDarkMode ? darkAlgorithm : defaultAlgorithm
            }}>
            <Card style={{width:"max-content"}}>
                <Button onClick={handleClick}>
                    Change theme to {isDarkMode ? "Light":"Dark"}
                </Button>
            </Card>
            <ProTable
            columns={columns}
            dataSource={dataSource}
            rowKey={"key"}
            />
        </ConfigProvider>
    )
}

export default CustomProTable;