import React, { useRef, useState } from "react";
import dayjs from 'dayjs';
import isBetween from "dayjs/plugin/isBetween";

import db from '../../data/db.json';
import CustomRangePicker from './CustomRangePicker';

import { ProTable } from '@ant-design/pro-components';
import { DatePicker } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Input, Button, Space } from "antd";

const { RangePicker } = DatePicker;
dayjs.extend(isBetween);


const timeChange = (time) =>{
    let newTime = dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss');
    return newTime
}


const dataSource = db.map((v,i) => {
        let data = {};
        data['key'] = i;
        data['name'] = v?.Name;
        data['userId'] = v?.ID;
        data['userClassName'] = v?.UserClass_Name;
        data['status'] = v.Status;
        data['IPAddress'] = typeof v.EasyAccessAddresses === "undefined" ? '' : v?.EasyAccessAddresses[0].IPAddress;
        data['ou'] = v.OU;
        data['title'] = v.Title;
        data['email'] = v.Mail;
        data['timeclass'] = typeof v.TimeClass === "undefined" ? '' : v?.TimeClass.Name;
        data['easyAccessLastAccessTimestamp'] = v.EasyAccessLastAccessTimestamp === 0 ? '' : timeChange(v?.EasyAccessLastAccessTimestamp);
        data['passwordLastChangedTimestamp'] = v.PasswordLastChangedTimestamp === 0 ? '' : timeChange(v.PasswordLastChangedTimestamp);

        return data
    }
)





const CustomProTable = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const inputColumnSearch = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters)
                            handleSearch(selectedKeys, confirm, dataIndex)
                            clearFilters && handleReset(clearFilters)
                        }}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
            text
            ),
    });


    const timeColumnSearch = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <RangePicker 
                    style={{ marginBottom: 8, display: 'block' }} 
                    value={selectedKeys[0]} 
                    onChange={e => setSelectedKeys(e ? [e] : [])} 
                    onPressEnter={() => { 
                        confirm()
                        setSearchText(selectedKeys[0]) 
                        setSearchedColumn(dataIndex)
                    }} 
                />
                <Space>
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters)
                            handleSearch(selectedKeys, confirm, dataIndex)
                            clearFilters && handleReset(clearFilters)
                        }}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => 
            record[dataIndex] ? dayjs(record[dataIndex]).isBetween(value[0], value[1], 'day', '[]') : "",
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns=[
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
            formItemProps:{
                labelCol:{
                    span:24,
                },
                wrapperCol:{
                    span:24
                }
            },
            ...inputColumnSearch('name'),
        },
        {
            title: '사용자 아이디',
            dataIndex: 'userId',
            key: 'userId',
            formItemProps:{
                labelCol:{
                    span:24,
                },
                wrapperCol:{
                    span:24
                }
            },
            ...inputColumnSearch('userId'),
        },
        {
            title: '사용자 폴더',
            dataIndex: 'userClassName',
            key: 'userClassName',
            formItemProps:{
                labelCol:{
                    span:24,
                },
                wrapperCol:{
                    span:24
                }
            },
            ...inputColumnSearch('userClassName'),
        },
        {
            title: '상태',
            dataIndex: 'status',
            key: 'status',
            initialValue : 'all',
            valueEnum:{
                true : {text:'정상', status: 'Success'},
                false : {text:'잠김', status: 'Error'}
            },
            formItemProps:{
                labelCol:{
                    span:24,
                },
                wrapperCol:{
                    span:24
                }
            }
        },
        {
            title: '접속 로그인 주소',
            dataIndex: 'IPAddress',
            key: 'IPAddress',
            formItemProps:{
                labelCol:{
                    span:24,
                },
                wrapperCol:{
                    span:24
                }
            },
            ...inputColumnSearch('IPAddress'),
        },
        {
            title: '조직',
            dataIndex: 'ou',
            key: 'ou',
            formItemProps:{
                labelCol:{
                    span:24,
                },
                wrapperCol:{
                    span:24
                }
            },
            ...inputColumnSearch('ou'),
        },
        {
            title: '직함',
            dataIndex: 'title',
            key: 'title',
            formItemProps:{
                labelCol:{
                    span:24,
                },
                wrapperCol:{
                    span:24
                }
            },
            ...inputColumnSearch('title'),
        },
        {
            title: '이메일',
            dataIndex: 'email',
            key: 'email',
            formItemProps:{
                labelCol:{
                    span:24,
                },
                wrapperCol:{
                    span:24
                }
            },
            ...inputColumnSearch('email'),
        },
        {
            title: '시간 유형',
            dataIndex: 'timeclass',
            key: 'timeclass',
            formItemProps:{
                labelCol:{
                    span:24,
                },
                wrapperCol:{
                    span:24
                }
            },
            ...inputColumnSearch('timeclass'),
        },
        {
            title: '접속기 로그인 성공 시간',
            dataIndex: 'easyAccessLastAccessTimestamp',
            key: 'easyAccessLastAccessTimestamp',
            formItemProps:{
                labelCol:{
                    span:24,
                },
                wrapperCol:{
                    span:24,
                    offset:0
                }
            },
            renderFormItem:() => {
                return(
                    <CustomRangePicker/>
                )
            },
            ...timeColumnSearch('easyAccessLastAccessTimestamp')
            
        },
        {
            title: '비밀번호 변경 시간',
            dataIndex: 'passwordLastChangedTimestamp',
            key: 'passwordLastChangedTimestamp',
            renderFormItem:() => {
                return(
                    <CustomRangePicker/>
                )
            },
            formItemProps:{
                labelCol:{
                    span:24,
                },
                wrapperCol:{
                    span:24
                }
            },
            ...timeColumnSearch('passwordLastChangedTimestamp')
        }
    ]






    return(
        <ProTable
        size="small"
        columns={columns}
        dataSource={dataSource}
        rowKey={"key"}
        />
    )
}

export default CustomProTable;