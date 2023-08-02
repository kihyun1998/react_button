import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";
const { RangePicker } = DatePicker;



const CustomRangePicker = () => {
  const [date,setDate] = useState(null);
  const [start,setStart] = useState(false);
  const [end,setEnd] = useState(false);
  const [mode, setMode] = useState([date,date]);
  const [notDateMode, setNotDateMode] = useState(false);
  const [first,setFirst] = useState(true);

  const range = (start, end) => {
    let array = [];
    for (let i = start; i < end; ++i) {
      array.push(i);
    }
    return array;
  };


  const onButtonClick = () => {
    const now = dayjs();

    if (start){       // 왼쪽
      if (date == null){
        setDate( [now, null] )
      } else if (date[1] == null){
        setDate( [now, null] )
      } else if (date[0] == null){
        setDate( [now,date[1]])  
      } else {
        setDate( [now,date[1]])
      }
    }else if (end){   // 오른쪽
      if (date == null){
        setDate( [null, now] )
      } else if (date[0] == null){
        setDate( [null, now] )
      } else {
        setDate( [date[0], now])
      }
    }
    setMode(['date','date'])
  };

  const saveDate = (dates) => {
    if (dates == null){
      setDate(null)
    } else{
      setDate([dates[0],dates[1]])
    }
  };

  const footer = () => { 
    return (
      <div onClick={onButtonClick} className='btn-time'>
        현재 시간
      </div>
    );
  };

  const disabledRangeDate = (current) => {
    // 날짜 금지
    return current && current < dayjs("1969-12-31").endOf('day');
  };

  const disabledRangeTime = ( selDate , type) => {
    // type 선택
    if (type === 'start'){
      setStart(true)
      setEnd(false)
    } else if(type === 'end'){
      setStart(false)
      setEnd(true)
    }

    // 시간 금지
    if (selDate <= dayjs("1970-01-01").endOf('day')){
      return {
        disabledHours: () => range(0,9)
      }
    }
  };

  const modeChange = (_, newMode) => {
    if (newMode == null){
      return;
    }else{
      setMode(newMode)
      console.log(newMode)
      const chkIsDate = (el) => el !== 'date';
      if (newMode.some(chkIsDate)){
        setNotDateMode(true)
      }
    }
  }

  const returnMode = () => {
    if (notDateMode){
      setMode(['date','date'])
    }else if(first){
      setFirst(false)
      setMode(['date','date'])
    }
  }

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        allowClear={true}
        size='small'
        renderExtraFooter={footer}

        disabledDate={disabledRangeDate}
        disabledTime={disabledRangeTime}
        showTime={{
          hideDisabledOptions:true,
        }}

        value={date}
        onCalendarChange={saveDate}

        mode={mode}
        onPanelChange={modeChange}
        onFocus={returnMode}
      />
    </Space>
  );
};

export default CustomRangePicker;