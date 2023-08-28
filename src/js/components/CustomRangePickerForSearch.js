import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from "dayjs";
const { RangePicker } = DatePicker;





const CustomRangePickerForSearch = (props) => {
    const [date,setDate] = useState(null);
    // const [start,setStart] = useState(false);
    // const [end,setEnd] = useState(false);
    const [mode, setMode] = useState([date,date]);
    const [notDateMode, setNotDateMode] = useState(false);
    const [first,setFirst] = useState(true);


  // input태그의 변화를 감지해서 ok누르면 적용되려고
  // 다른데서 setDate하는데 왜 필요한가?
  // >> 일반적으로 ok 눌러서 적용하려면 필요함
    const onCalendarChange = (dates,b) => {
        if (dates === null){
            setDate(null)
        } else{
            setDate([dates[0],dates[1]])
        }
    };

    const disabledRangeDate = (current) => {
        // 날짜 금지
        return current && current < dayjs("1969-12-31").endOf('day');
    };

  // 모드가 바뀌는 걸 감지하는 함수
  // 모드가 start or end에서 date가 아닌 경우 
  // setNotDateMode state를 true로 변경하여 onFocus 함수 실행하도록
    const onPanelChange = (_, newMode) => {
        if (newMode === null){
            return;
        }else{
            setMode(newMode)
            const chkIsDate = (el) => el !== 'date';
            if (newMode.some(chkIsDate)){
                setNotDateMode(true)
            }
        }
    }

  // Focus가 바뀌면 실행
    const onFocus = (a) => {
        // 이 부분은 mode 초기화를 위해서
        if (notDateMode){
            setMode(['date','date'])
        }else if(first){    // 첫 시작이라면 > 이걸 사용하는 이유는 이렇게 안하면 클릭이 안됨
            setFirst(false)
            setMode(['date','date'])
        }
    }
    return (
        <RangePicker
            style={{ marginBottom: 8, display: 'block',width:"21em",height:"100%" }} 
            allowClear={true}
            size='small'
            // renderExtraFooter={footer}

            // 날짜와 시간 금지
            disabledDate={disabledRangeDate}

            // 값은 date state로 직접 지정
            value={props.selectedKeys[0]}
            
            // 값이 바뀌면
            onChange={(e) => {
                if(props.selectedKeys.length === 0){
                    setDate([null,null])
                }else{
                    setDate([props.selectedKeys[0][0],props.selectedKeys[0][1]])
                }
                props.setSelectedKeys(e ? [e] : [])
            }}
            // 모드 mode state로 직접 지정
            mode={mode}
            // 모드 변경 감지
            onPanelChange={onPanelChange}
            // focus 위치 감지 (focus란 클릭 시 밑줄)
            onFocus={onFocus}
        
        />
    );
};

export default CustomRangePickerForSearch;